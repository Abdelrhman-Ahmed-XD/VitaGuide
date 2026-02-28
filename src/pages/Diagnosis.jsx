import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { symptoms, symptomDeficiencyMap, vitaminPageIds } from "../data/symptoms";
import { AlertTriangle, CheckCircle, RefreshCw, ArrowRight, TrendingUp, BarChart2, PieChart as PieIcon } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { saveSymptomCheckResult, getAnalyticsData } from "../utils/firebase";

// ─── Static data ─────────────────────────────────────────────────────────────
const categories = [...new Set(symptoms.map((s) => s.category))];

const weightDescriptions = {
    10: { label: "Hallmark Sign (Pathognomonic)", color: "bg-red-200 border-red-400",      textColor: "text-red-900"     },
    9:  { label: "Very Strong Indicator",         color: "bg-red-100 border-red-300",      textColor: "text-red-800"     },
    8:  { label: "Strong Indicator",              color: "bg-orange-100 border-orange-300", textColor: "text-orange-800" },
    7:  { label: "Strong Indicator",              color: "bg-orange-100 border-orange-300", textColor: "text-orange-800" },
    6:  { label: "Moderate Indicator",            color: "bg-yellow-100 border-yellow-300", textColor: "text-yellow-800" },
    5:  { label: "Moderate Indicator",            color: "bg-yellow-100 border-yellow-300", textColor: "text-yellow-800" },
    4:  { label: "Weak Indicator",                color: "bg-blue-100 border-blue-300",    textColor: "text-blue-800"    },
    3:  { label: "Weak/Shared Indicator",         color: "bg-blue-50 border-blue-200",     textColor: "text-blue-700"    },
};

const vitaminColorMap = {
    "Vitamin A":      "#FF6B35",
    "Vitamin B1":     "#F4A261",
    "Vitamin B2":     "#FBBF24",
    "Vitamin B3":     "#EF4444",
    "Vitamin B5":     "#8B7355",
    "Vitamin B6":     "#8B5CF6",
    "Vitamin B7":     "#D946A6",
    "Vitamin B12":    "#E63946",
    "Vitamin C":      "#F77F00",
    "Vitamin D":      "#E8B800",
    "Vitamin E":      "#70C1B3",
    "Folate (B9)":    "#06B6D4",
    "Vitamin K":      "#2D9A4B",
    "Zinc (mineral)": "#64748B",
};
const getColor = (name) => vitaminColorMap[name] || "#2D9A4B";

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useCountUp(target, duration, active) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!active) { setVal(0); return; }
        let start = null;
        const tick = (ts) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [target, duration, active]);
    return val;
}

function useInView(ref) {
    const [seen, setSeen] = useState(false);
    useEffect(() => {
        if (!ref.current) return;
        const io = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
            { threshold: 0.12 }
        );
        io.observe(ref.current);
        return () => io.disconnect();
    }, [ref]);
    return seen;
}

// ─── Animated ranked bar row ──────────────────────────────────────────────────
function BarRow({ item, idx, maxCount, highlighted, onToggle, animate }) {
    const color  = getColor(item.name);
    const barW   = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
    const count  = useCountUp(item.count,      850, animate);
    const pct    = useCountUp(item.percentage, 850, animate);
    const active = highlighted === item.name;

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => onToggle(item.name)}
            onKeyDown={(e) => e.key === "Enter" && onToggle(item.name)}
            className="rounded-xl border outline-none focus-visible:ring-2 focus-visible:ring-offset-1 select-none"
            style={{
                backgroundColor: active ? color + "22" : color + "0d",
                borderColor:     active ? color + "88" : color + "30",
                boxShadow:       active ? `0 4px 20px ${color}28` : "none",
                transform:       active ? "scale(1.016)" : "scale(1)",
                opacity:         animate ? 1 : 0,
                cursor:          "pointer",
                transition:      `transform 0.22s ease, box-shadow 0.22s ease, opacity 0.4s ease ${idx * 55}ms`,
            }}
        >
            {/* Row body */}
            <div className="flex items-center gap-3 p-3">
                {/* Rank badge */}
                <span
                    className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg text-white text-xs font-bold shadow-sm"
                    style={{ backgroundColor: color }}
                >
                    {idx + 1}
                </span>

                {/* Label + animated bar */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-semibold text-sm truncate" style={{ color }}>
                            {item.name}
                        </span>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                            <span className="font-bold text-sm tabular-nums" style={{ color }}>{pct}%</span>
                            <span className="text-gray-400 text-xs tabular-nums">({count})</span>
                        </div>
                    </div>
                    <div className="w-full bg-black/[0.06] rounded-full h-2 overflow-hidden">
                        <div
                            className="h-2 rounded-full"
                            style={{
                                width:           animate ? `${barW}%` : "0%",
                                backgroundColor: color,
                                transition:      `width 1.1s cubic-bezier(0.16,1,0.3,1) ${idx * 55 + 160}ms`,
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Expand panel — slides open on click */}
            <div
                style={{
                    maxHeight:  active ? 56 : 0,
                    overflow:   "hidden",
                    transition: "max-height 0.3s ease",
                }}
            >
                <div className="px-3 pb-3 flex items-center gap-2 text-xs" style={{ color }}>
                    <TrendingUp size={12} />
                    Found in <strong>{count}</strong> check{count !== 1 ? "s" : ""} &mdash; <strong>{pct}%</strong> of all reports
                </div>
            </div>
        </div>
    );
}

// ─── Donut tooltip ────────────────────────────────────────────────────────────
const DonutTip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const { name, value, payload: p } = payload[0];
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-3 py-2 text-sm pointer-events-none">
            <p className="font-bold" style={{ color: getColor(name) }}>{name}</p>
            <p className="text-gray-500">{value} checks · {p.percentage}%</p>
        </div>
    );
};

// ─── Charts section ───────────────────────────────────────────────────────────
function DeficiencyCharts({ deficiencies, totalChecks }) {
    const [highlighted, setHighlighted] = useState(null);
    const [activeSlice, setActiveSlice] = useState(null);
    const [view, setView]               = useState("bars");
    const ref                           = useRef(null);
    const animate                       = useInView(ref);
    const maxCount                      = deficiencies[0]?.count || 1;

    const toggleRow   = (name) => setHighlighted((h) => (h === name ? null : name));
    const toggleSlice = (name) => setActiveSlice((a) => (a === name ? null : name));

    return (
        <div ref={ref} className="mt-8 mb-6">

            {/* Title + tab switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <h3 className="font-display text-2xl font-bold text-deep">
                    📊 All Deficiencies Found
                </h3>
                <div className="flex gap-1 bg-gray-100 rounded-xl p-1 self-start sm:self-auto">
                    <button
                        onClick={() => setView("bars")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            view === "bars" ? "bg-white shadow text-deep" : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        <BarChart2 size={14} /> Ranking
                    </button>
                    <button
                        onClick={() => setView("donut")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            view === "donut" ? "bg-white shadow text-deep" : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        <PieIcon size={14} /> Distribution
                    </button>
                </div>
            </div>

            {/* Hint */}
            <p className="text-xs text-gray-400 mb-3">
                💡 Tap any row{view === "donut" ? " or slice" : ""} to expand details
            </p>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                {/* ═══ RANKING VIEW ═══ */}
                {view === "bars" && (
                    <div className="p-4 sm:p-6 space-y-2">
                        {deficiencies.map((item, idx) => (
                            <BarRow
                                key={item.name}
                                item={item}
                                idx={idx}
                                maxCount={maxCount}
                                highlighted={highlighted}
                                onToggle={toggleRow}
                                animate={animate}
                            />
                        ))}
                        <div
                            className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs text-gray-400"
                            style={{ opacity: animate ? 1 : 0, transition: "opacity 0.6s ease 0.9s" }}
                        >
                            <span>
                                Based on <strong className="text-gray-600">{totalChecks.toLocaleString()}</strong> community checks
                            </span>
                            <span>{deficiencies.length} deficiency types tracked</span>
                        </div>
                    </div>
                )}

                {/* ═══ DONUT VIEW ═══ */}
                {view === "donut" && (
                    <div className="p-4 sm:p-6">

                        {/* Chart */}
                        <div className="relative">
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={deficiencies}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius="50%"
                                        outerRadius="76%"
                                        paddingAngle={2}
                                        dataKey="count"
                                        startAngle={90}
                                        endAngle={-270}
                                        onClick={(d) => toggleSlice(d.name)}
                                        style={{ cursor: "pointer" }}
                                        isAnimationActive={true}
                                        animationBegin={0}
                                        animationDuration={900}
                                    >
                                        {deficiencies.map((entry) => {
                                            const color  = getColor(entry.name);
                                            const isActive = activeSlice === entry.name;
                                            return (
                                                <Cell
                                                    key={entry.name}
                                                    fill={color}
                                                    opacity={activeSlice && !isActive ? 0.3 : 1}
                                                    stroke={isActive ? "#fff" : "transparent"}
                                                    strokeWidth={isActive ? 3 : 0}
                                                    style={{ transition: "opacity 0.25s, stroke-width 0.25s" }}
                                                />
                                            );
                                        })}
                                    </Pie>
                                    <Tooltip content={<DonutTip />} />
                                </PieChart>
                            </ResponsiveContainer>

                            {/* Center dynamic label */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                {activeSlice ? (
                                    <>
                                        <span
                                            className="text-2xl font-black tabular-nums"
                                            style={{ color: getColor(activeSlice) }}
                                        >
                                            {deficiencies.find(d => d.name === activeSlice)?.percentage}%
                                        </span>
                                        <span className="text-xs text-gray-500 text-center leading-tight mt-0.5 max-w-[80px]">
                                            {activeSlice}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-2xl font-black text-deep tabular-nums">
                                            {totalChecks.toLocaleString()}
                                        </span>
                                        <span className="text-xs text-gray-400 mt-0.5">total checks</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Interactive legend grid */}
                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {deficiencies.map((item) => {
                                const color    = getColor(item.name);
                                const isActive = activeSlice === item.name;
                                return (
                                    <button
                                        key={item.name}
                                        onClick={() => toggleSlice(item.name)}
                                        className="flex items-center gap-2 p-2 rounded-lg text-left text-xs transition-all"
                                        style={{
                                            backgroundColor: isActive ? color + "18" : "transparent",
                                            border:          `1px solid ${isActive ? color + "60" : "transparent"}`,
                                            opacity:         activeSlice && !isActive ? 0.45 : 1,
                                        }}
                                    >
                                        <span
                                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: color }}
                                        />
                                        <span className="truncate font-medium text-gray-700">{item.name}</span>
                                        <span className="ml-auto font-bold tabular-nums flex-shrink-0" style={{ color }}>
                                            {item.percentage}%
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <p className="text-xs text-gray-400 text-center mt-3">
                            Tap any slice or legend item to highlight
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

// ═════════════════════════════════════════════════════════════════════════════
// Main Diagnosis page
// ═════════════════════════════════════════════════════════════════════════════
export default function Diagnosis() {
    const [selected, setSelected]       = useState([]);
    const [result, setResult]           = useState(null);
    const [step, setStep]               = useState("quiz");
    const [globalStats, setGlobalStats] = useState(null);
    const [pageStartTime]               = useState(Date.now());

    useEffect(() => { fetchGlobalStats(); }, []);

    const fetchGlobalStats = async () => {
        const stats = await getAnalyticsData();
        setGlobalStats(stats);
    };

    const toggle = (id) =>
        setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

    const analyze = async () => {
        if (!selected.length) return;
        const scores  = {};
        const details = {};
        selected.forEach((sid) => {
            const map = symptomDeficiencyMap[sid] || {};
            Object.entries(map).forEach(([def, w]) => {
                scores[def] = (scores[def] || 0) + w;
                if (!details[def]) details[def] = [];
                details[def].push({ symptom: symptoms.find(s => s.id === sid)?.label, weight: w });
            });
        });
        const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]).filter(([, s]) => s >= 3);
        await saveSymptomCheckResult({ symptoms: selected, results: sorted, pageDuration: Math.floor((Date.now() - pageStartTime) / 1000) });
        await fetchGlobalStats();
        setResult({ sorted, details, totalSymptoms: selected.length });
        setStep("result");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const reset = () => { setSelected([]); setResult(null); setStep("quiz"); };

    const getRiskLevel = (score, maxScore) => {
        const pct = (score / maxScore) * 100;
        if (pct >= 60) return { label: "High Risk",     bgClass: "bg-red-50 border-red-200",       textClass: "text-red-900",    badgeBg: "bg-white/30 border-red-300",    linkClass: "bg-white text-red-700 border-red-300",    barColor: pct >= 80 ? "#DC2626" : "#EF4444", percentage: Math.round(pct) };
        if (pct >= 40) return { label: "Moderate Risk", bgClass: "bg-yellow-50 border-yellow-200", textClass: "text-yellow-900", badgeBg: "bg-white/30 border-yellow-300", linkClass: "bg-white text-yellow-700 border-yellow-300", barColor: "#EAB308",                      percentage: Math.round(pct) };
        if (pct >= 25) return { label: "Low Risk",      bgClass: "bg-yellow-50 border-yellow-200", textClass: "text-yellow-900", badgeBg: "bg-white/30 border-yellow-300", linkClass: "bg-white text-yellow-700 border-yellow-300", barColor: "#FBBF24",                      percentage: Math.round(pct) };
        return             { label: "Low Risk",         bgClass: "bg-blue-50 border-blue-200",     textClass: "text-blue-900",   badgeBg: "bg-white/20 border-blue-300",   linkClass: "bg-white text-blue-700 border-blue-300",   barColor: "#3B82F6",                      percentage: Math.round(pct) };
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

                {/* ─── QUIZ ──────────────────────────────────────────── */}
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
                                    <span className="w-2 h-2 bg-leaf rounded-full" />
                                    {category}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {symptoms.filter(s => s.category === category).map((symptom) => {
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
                                disabled={!selected.length}
                                className="w-full bg-gradient-to-r from-leaf to-green-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                Analyze My Symptoms
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </>
                )}

                {/* ─── RESULT ────────────────────────────────────────── */}
                {step === "result" && result && (
                    <div>
                        {result.sorted.length === 0 ? (
                            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                                <CheckCircle size={40} className="text-green-500 mx-auto mb-3" />
                                <h3 className="font-display text-2xl font-bold text-green-800 mb-2">No Significant Risk Detected</h3>
                                <p className="text-green-700 text-sm">
                                    Based on your selected symptoms, no strong pattern of vitamin deficiency was identified. Consult your doctor for lab tests if you have concerns.
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* Disclaimer */}
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

                                {/* Global stats */}
                                {globalStats && (
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                                        {[
                                            { label: "💊 Top Deficiency", main: globalStats.topDeficiency?.name || "—", sub: `${globalStats.topDeficiency?.percentage}% of users`, bg: "from-orange-50 to-amber-50 border-orange-200", txt: "text-orange-900", sub2: "text-orange-600" },
                                            { label: "🔍 Top Symptom",    main: globalStats.topSymptom?.symptom?.replace(/_/g," ") || "—", sub: `${globalStats.topSymptom?.count} reports`, bg: "from-purple-50 to-pink-50 border-purple-200", txt: "text-purple-900", sub2: "text-purple-600" },
                                            { label: "📊 Total Checks",   main: globalStats.totalChecks.toLocaleString(), sub: "Community wide", bg: "from-blue-50 to-cyan-50 border-blue-200", txt: "text-blue-900", sub2: "text-blue-600" },
                                            { label: "👥 Participation",  main: `${globalStats.checkPercentage}%`, sub: "Of website visitors", bg: "from-green-50 to-emerald-50 border-green-200", txt: "text-green-900", sub2: "text-green-600" },
                                        ].map((s) => (
                                            <div key={s.label} className={`bg-gradient-to-br ${s.bg} border rounded-xl p-4`}>
                                                <p className="text-gray-600 text-xs mb-1">{s.label}</p>
                                                <p className={`font-bold text-sm leading-snug line-clamp-1 ${s.txt}`}>{s.main}</p>
                                                <p className={`text-xs mt-1 ${s.sub2}`}>{s.sub}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Risk cards */}
                                <h2 className="font-display text-2xl font-bold text-deep mb-4">Your Risk Assessment</h2>
                                {(() => {
                                    const maxScore = result.sorted[0][1];
                                    return result.sorted.map(([deficiency, score]) => {
                                        const risk    = getRiskLevel(score, maxScore);
                                        const vid     = vitaminPageIds[deficiency];
                                        const dets    = result.details[deficiency] || [];
                                        return (
                                            <div key={deficiency} className={`border rounded-2xl p-5 mb-4 ${risk.bgClass}`}>
                                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                                                    <div>
                                                        <h3 className={`font-bold text-lg ${risk.textClass}`}>{deficiency}</h3>
                                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border mt-1 inline-block ${risk.badgeBg}`}>
                                                            {risk.label} · {risk.percentage}%
                                                        </span>
                                                    </div>
                                                    {vid && (
                                                        <Link to={`/vitamin/${vid}`} className={`text-xs border rounded-lg px-3 py-1.5 hover:opacity-80 transition-colors font-medium flex items-center gap-1 whitespace-nowrap ${risk.linkClass}`}>
                                                            Learn more <ArrowRight size={12} />
                                                        </Link>
                                                    )}
                                                </div>
                                                <div className="w-full bg-white/60 rounded-full h-2.5 mb-3">
                                                    <div className="h-2.5 rounded-full transition-all duration-700" style={{ width: `${(score / maxScore) * 100}%`, backgroundColor: risk.barColor }} />
                                                </div>
                                                <div className={`text-xs mb-2 ${risk.textClass} opacity-90`}>
                                                    <strong>Score: {score}</strong> from {dets.length} matching symptom{dets.length !== 1 ? "s" : ""}
                                                </div>
                                                <details className="cursor-pointer">
                                                    <summary className={`text-xs font-medium ${risk.textClass} opacity-90 hover:opacity-100 transition-opacity`}>
                                                        Show contributing symptoms ({dets.length})
                                                    </summary>
                                                    <div className={`mt-2 space-y-1 text-xs ${risk.textClass} opacity-90`}>
                                                        {dets.sort((a, b) => b.weight - a.weight).map((d, i) => (
                                                            <div key={i} className="flex items-start gap-2">
                                                                <span className={`font-semibold flex-shrink-0 ${risk.textClass}`}>+{d.weight}</span>
                                                                <div>
                                                                    <p className={`font-medium ${risk.textClass}`}>{d.symptom}</p>
                                                                    <p className={`text-xs opacity-75 ${risk.textClass}`}>({weightDescriptions[d.weight]?.label})</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </details>
                                            </div>
                                        );
                                    });
                                })()}

                                {/* ── Animated charts ── */}
                                {globalStats?.deficiencies?.length > 0 && (
                                    <DeficiencyCharts
                                        deficiencies={globalStats.deficiencies}
                                        totalChecks={globalStats.totalChecks}
                                    />
                                )}

                                {/* How we calculate */}
                                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mt-6 mb-6">
                                    <h4 className="font-bold text-gray-800 mb-3 text-sm">📊 How We Calculate Risk</h4>
                                    <p className="text-gray-700 text-sm mb-3 leading-relaxed">Each symptom is weighted based on how strongly it indicates a specific vitamin deficiency:</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                                        {[{ weight:10,label:"Hallmark (10pts)"},{weight:7,label:"Strong (7-9pts)"},{weight:5,label:"Moderate (5-6pts)"},{weight:3,label:"Weak (3-4pts)"}].map(item => (
                                            <div key={item.weight} className={`p-2 rounded-lg border ${weightDescriptions[item.weight].color}`}>
                                                <div className={`font-bold ${weightDescriptions[item.weight].textColor}`}>{item.label}</div>
                                                <div className="text-gray-600 text-xs mt-1">Indicator</div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-3 leading-relaxed">Your risk level is calculated by adding up all symptom weights for each vitamin. Laboratory testing by a healthcare provider is required for confirmation.</p>
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
                            <RefreshCw size={16} /> Start Over
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}