import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { symptoms, symptomDeficiencyMap, vitaminPageIds } from "../data/symptoms";
import { AlertTriangle, CheckCircle, RefreshCw, ArrowRight } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { saveSymptomCheckResult, getAnalyticsData, getSymptomLabel } from "../utils/firebase";

const categories = [...new Set(symptoms.map((s) => s.category))];

const weightDescriptions = {
    10: { label: "Hallmark Sign", color: "bg-red-100 border-red-300", textColor: "text-red-800" },
    9: { label: "Very Strong Indicator", color: "bg-red-50 border-red-200", textColor: "text-red-700" },
    8: { label: "Strong Indicator", color: "bg-orange-50 border-orange-200", textColor: "text-orange-700" },
    7: { label: "Strong Indicator", color: "bg-orange-50 border-orange-200", textColor: "text-orange-700" },
    6: { label: "Moderate Indicator", color: "bg-amber-50 border-amber-200", textColor: "text-amber-700" },
    5: { label: "Moderate Indicator", color: "bg-amber-50 border-amber-200", textColor: "text-amber-700" },
    4: { label: "Weak Indicator", color: "bg-blue-50 border-blue-200", textColor: "text-blue-700" },
    3: { label: "Weak Indicator", color: "bg-blue-50 border-blue-200", textColor: "text-blue-700" },
};

const COLORS = ["#2D9A4B", "#1B6CA8", "#F4A261", "#FF6B35", "#EF4444", "#8B5CF6"];

export default function Diagnosis() {
    const [selected, setSelected] = useState([]);
    const [result, setResult] = useState(null);
    const [step, setStep] = useState("quiz");
    const [globalStats, setGlobalStats] = useState(null);
    const [pageStartTime] = useState(Date.now());

    useEffect(() => {
        fetchGlobalStats();
    }, []);

    const fetchGlobalStats = async () => {
        const stats = await getAnalyticsData();
        setGlobalStats(stats);
    };

    const toggle = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        );
    };

    const analyze = async () => {
        if (selected.length === 0) return;

        const scores = {};
        const details = {};

        selected.forEach((symptomId) => {
            const map = symptomDeficiencyMap[symptomId] || {};
            Object.entries(map).forEach(([deficiency, weight]) => {
                scores[deficiency] = (scores[deficiency] || 0) + weight;
                if (!details[deficiency]) {
                    details[deficiency] = [];
                }
                details[deficiency].push({
                    symptom: symptoms.find(s => s.id === symptomId)?.label,
                    weight: weight,
                });
            });
        });

        const sorted = Object.entries(scores)
            .sort((a, b) => b[1] - a[1])
            .filter(([, score]) => score >= 3);

        const resultsData = {
            symptoms: selected,
            results: sorted, // [["Vitamin D", 45], ["Vitamin B12", 32], ...]
            pageDuration: Math.floor((Date.now() - pageStartTime) / 1000),
        };

        // Save to Firebase
        await saveSymptomCheckResult(resultsData);

        // Refresh global stats
        await fetchGlobalStats();

        setResult({ sorted, details, totalSymptoms: selected.length });
        setStep("result");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const reset = () => {
        setSelected([]);
        setResult(null);
        setStep("quiz");
    };

    const getRiskLevel = (score, maxScore) => {
        const pct = (score / maxScore) * 100;
        if (pct >= 70) return { label: "High Risk", color: "text-red-600 bg-red-50 border-red-200", percentage: Math.round(pct) };
        if (pct >= 40) return { label: "Moderate Risk", color: "text-amber-600 bg-amber-50 border-amber-200", percentage: Math.round(pct) };
        return { label: "Low Risk", color: "text-blue-600 bg-blue-50 border-blue-200", percentage: Math.round(pct) };
    };

    return (
        <div className="pt-20 min-h-screen bg-cream">
            {/* Header */}
            <div className="bg-gradient-to-br from-primary to-deep py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="font-display text-4xl sm:text-5xl font-black text-white mb-4">
                        Symptom Checker
                    </h1>
                    <p className="text-blue-200 text-base sm:text-lg">
                        Select all symptoms you're experiencing and we'll assess your risk for possible vitamin deficiencies.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs px-4 py-2 rounded-full border border-white/20">
                        ⚠️ This is not a medical diagnosis. Always consult a healthcare professional.
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
                {step === "quiz" && (
                    <>
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-gray-500 text-sm">
                                {selected.length} symptom{selected.length !== 1 ? "s" : ""} selected
                            </p>
                            {selected.length > 0 && (
                                <button onClick={() => setSelected([])} className="text-gray-400 hover:text-gray-600 text-xs underline">
                                    Clear all
                                </button>
                            )}
                        </div>

                        {categories.map((category) => (
                            <div key={category} className="mb-8">
                                <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2 text-sm sm:text-base">
                                    <span className="w-2 h-2 bg-leaf rounded-full"></span>
                                    {category}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {symptoms
                                        .filter((s) => s.category === category)
                                        .map((symptom) => {
                                            const isSelected = selected.includes(symptom.id);
                                            return (
                                                <button
                                                    key={symptom.id}
                                                    onClick={() => toggle(symptom.id)}
                                                    className={`text-left p-3 rounded-xl border text-sm transition-all duration-200 flex items-center gap-3 ${
                                                        isSelected
                                                            ? "bg-leaf/10 border-leaf text-green-800 shadow-sm"
                                                            : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                                                    }`}
                                                >
                                                    <div className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                                                        isSelected ? "bg-leaf border-leaf" : "border-gray-300"
                                                    }`}>
                                                        {isSelected && <CheckCircle size={12} className="text-white" />}
                                                    </div>
                                                    <span className="text-xs sm:text-sm">{symptom.label}</span>
                                                </button>
                                            );
                                        })}
                                </div>
                            </div>
                        ))}

                        <div className="sticky bottom-4 mt-8">
                            <button
                                onClick={analyze}
                                disabled={selected.length === 0}
                                className="w-full bg-gradient-to-r from-leaf to-green-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                Analyze My Symptoms
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </>
                )}

                {step === "result" && result && (
                    <div>
                        {result.sorted.length === 0 ? (
                            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                                <CheckCircle size={40} className="text-green-500 mx-auto mb-3" />
                                <h3 className="font-display text-2xl font-bold text-green-800 mb-2">
                                    No Significant Risk Detected
                                </h3>
                                <p className="text-green-700 text-sm">
                                    Based on your selected symptoms, no strong pattern of vitamin deficiency was identified. This does not mean you are deficiency-free — consult your doctor for lab tests if you have concerns.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-amber-800 font-semibold text-sm mb-1">Educational Assessment Only</p>
                                            <p className="text-amber-700 text-xs leading-relaxed">
                                                The following results are based on symptom patterns weighted by clinical significance and are not a medical diagnosis. These findings suggest potential deficiency risks that warrant further investigation through laboratory testing by a healthcare provider.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Global Stats Section */}
                                {globalStats && (
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4">
                                            <p className="text-gray-600 text-xs mb-1">💊 Top Deficiency Found</p>
                                            <p className="font-bold text-orange-900 text-sm">{globalStats.topDeficiency?.name || "—"}</p>
                                            <p className="text-orange-600 text-xs mt-1">{globalStats.topDeficiency?.percentage}% of users</p>
                                        </div>

                                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                                            <p className="text-gray-600 text-xs mb-1">🔍 Most Popular Symptom</p>
                                            <p className="font-bold text-purple-900 text-sm line-clamp-1">
                                                {globalStats.topSymptom?.symptom?.replace(/_/g, " ") || "—"}
                                            </p>
                                            <p className="text-purple-600 text-xs mt-1">{globalStats.topSymptom?.count} reports</p>
                                        </div>

                                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
                                            <p className="text-gray-600 text-xs mb-1">📊 Total Checks</p>
                                            <p className="font-bold text-blue-900 text-sm">{globalStats.totalChecks.toLocaleString()}</p>
                                            <p className="text-blue-600 text-xs mt-1">Community wide</p>
                                        </div>

                                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                                            <p className="text-gray-600 text-xs mb-1">👥 Participation Rate</p>
                                            <p className="font-bold text-green-900 text-sm">{globalStats.checkPercentage}%</p>
                                            <p className="text-green-600 text-xs mt-1">Of website visitors</p>
                                        </div>
                                    </div>
                                )}

                                <h2 className="font-display text-2xl font-bold text-deep mb-4">
                                    Your Risk Assessment
                                </h2>

                                {(() => {
                                    const maxScore = result.sorted[0][1];
                                    return result.sorted.map(([deficiency, score], index) => {
                                        const risk = getRiskLevel(score, maxScore);
                                        const vitaminId = vitaminPageIds[deficiency];
                                        const deficiencyDetails = result.details[deficiency] || [];

                                        return (
                                            <div key={deficiency} className={`border rounded-2xl p-5 mb-4 ${risk.color}`}>
                                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                                                    <div>
                                                        <h3 className="font-bold text-lg">{deficiency}</h3>
                                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${risk.color} mt-1 inline-block`}>
                              {risk.label} • {risk.percentage}%
                            </span>
                                                    </div>
                                                    {vitaminId && (
                                                        <Link
                                                            to={`/vitamin/${vitaminId}`}
                                                            className="text-xs bg-white border border-current rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors font-medium flex items-center gap-1 whitespace-nowrap"
                                                        >
                                                            Learn more <ArrowRight size={12} />
                                                        </Link>
                                                    )}
                                                </div>

                                                {/* Score bar */}
                                                <div className="w-full bg-white/60 rounded-full h-2.5 mb-3">
                                                    <div
                                                        className="bg-current h-2.5 rounded-full transition-all duration-700"
                                                        style={{ width: `${(score / maxScore) * 100}%` }}
                                                    />
                                                </div>

                                                {/* Score details */}
                                                <div className="text-xs opacity-75 mb-2">
                                                    <strong>Score: {score}</strong> from {deficiencyDetails.length} matching symptom{deficiencyDetails.length !== 1 ? 's' : ''}
                                                </div>

                                                {/* Contributing symptoms */}
                                                <details className="cursor-pointer">
                                                    <summary className="text-xs font-medium opacity-75 hover:opacity-100 transition-opacity">
                                                        Show contributing symptoms ({deficiencyDetails.length})
                                                    </summary>
                                                    <div className="mt-2 space-y-1 text-xs opacity-75">
                                                        {deficiencyDetails
                                                            .sort((a, b) => b.weight - a.weight)
                                                            .map((detail, idx) => {
                                                                const desc = weightDescriptions[detail.weight];
                                                                return (
                                                                    <div key={idx} className="flex items-start gap-2">
                                    <span className="font-semibold text-current flex-shrink-0 mt-0.5">
                                      +{detail.weight}
                                    </span>
                                                                        <div>
                                                                            <p className="font-medium">{detail.symptom}</p>
                                                                            <p className="text-xs opacity-75">({desc?.label})</p>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                    </div>
                                                </details>
                                            </div>
                                        );
                                    });
                                })()}

                                {/* Charts Section */}
                                {globalStats && globalStats.deficiencies.length > 0 && (
                                    <>
                                        <div className="mt-8 mb-6">
                                            <h3 className="font-display text-2xl font-bold text-deep mb-4">
                                                📊 Top 5 Deficiencies Found
                                            </h3>
                                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                                <ResponsiveContainer width="100%" height={300}>
                                                    <BarChart data={globalStats.deficiencies.slice(0, 5)}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                                        <XAxis
                                                            dataKey="name"
                                                            tick={{ fontSize: 12 }}
                                                            angle={-45}
                                                            textAnchor="end"
                                                            height={80}
                                                        />
                                                        <YAxis tick={{ fontSize: 12 }} />
                                                        <Tooltip
                                                            contentStyle={{
                                                                backgroundColor: "#fff",
                                                                border: "1px solid #ddd",
                                                                borderRadius: "8px"
                                                            }}
                                                            formatter={(value) => `${value} people`}
                                                        />
                                                        <Bar dataKey="count" fill="#2D9A4B" radius={[8, 8, 0, 0]} />
                                                    </BarChart>
                                                </ResponsiveContainer>

                                                {/* Top 5 List */}
                                                <div className="mt-6 space-y-2">
                                                    {globalStats.deficiencies.slice(0, 5).map((item, idx) => (
                                                        <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                            <div className="flex items-center gap-3">
                                                                <span className="font-bold text-leaf w-6 text-center">{idx + 1}.</span>
                                                                <span className="font-semibold text-gray-800">{item.name}</span>
                                                            </div>
                                                            <div className="text-right">
                                                                <span className="font-bold text-gray-900">{item.percentage}%</span>
                                                                <span className="text-gray-500 text-sm ml-2">({item.count})</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Pie Chart */}
                                        <div className="mt-6">
                                            <h3 className="font-display text-xl font-bold text-deep mb-4">
                                                🥧 Deficiency Distribution
                                            </h3>
                                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                                <ResponsiveContainer width="100%" height={300}>
                                                    <PieChart>
                                                        <Pie
                                                            data={globalStats.deficiencies.slice(0, 6)}
                                                            cx="50%"
                                                            cy="50%"
                                                            labelLine={false}
                                                            label={({ name, percentage }) => `${name} (${percentage}%)`}
                                                            outerRadius={80}
                                                            fill="#8884d8"
                                                            dataKey="count"
                                                        >
                                                            {globalStats.deficiencies.slice(0, 6).map((entry, index) => (
                                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                            ))}
                                                        </Pie>
                                                        <Tooltip formatter={(value) => `${value} checks`} />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Weight Scale Reference */}
                                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mt-6 mb-6">
                                    <h4 className="font-bold text-gray-800 mb-3 text-sm">📊 How We Calculate Risk</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                                        {[
                                            { weight: 10, label: "Hallmark" },
                                            { weight: 7, label: "Strong" },
                                            { weight: 5, label: "Moderate" },
                                            { weight: 3, label: "Weak" },
                                        ].map((item) => (
                                            <div key={item.weight} className={`p-2 rounded-lg border ${weightDescriptions[item.weight].color}`}>
                                                <div className={`font-bold ${weightDescriptions[item.weight].textColor}`}>+{item.weight}</div>
                                                <div className="text-gray-600 text-xs">{item.label} Sign</div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-3">
                                        Each symptom is weighted based on how strongly it indicates a specific deficiency. Higher scores suggest greater risk, but lab testing is required for confirmation.
                                    </p>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                                    <h4 className="font-bold text-blue-800 mb-2">Recommended Next Steps</h4>
                                    <ul className="space-y-1.5 text-blue-700 text-sm">
                                        <li>• Schedule an appointment with your doctor or pharmacist</li>
                                        <li>• Request blood tests for the vitamins flagged above</li>
                                        <li>• Review your dietary intake for deficient nutrients</li>
                                        <li>• Do NOT self-prescribe high-dose supplements without testing</li>
                                    </ul>
                                </div>
                            </>
                        )}

                        <button
                            onClick={reset}
                            className="mt-6 w-full flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-3 text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            <RefreshCw size={16} />
                            Start Over
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}