import { useParams, Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, CheckCircle, Users, Pill, Phone, BookOpen } from "lucide-react";
import { getMineralById } from "../data/minerals";

const Section = ({ icon: Icon, title, children, className = "" }) => (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
            <Icon size={20} className="text-leaf" />
            <h3 className="font-display text-xl font-bold text-deep">{title}</h3>
        </div>
        {children}
    </div>
);

export default function MineralPage() {
    const { id } = useParams();
    const mineral = getMineralById(id);

    if (!mineral) {
        return (
            <div className="pt-24 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-2xl text-gray-400 mb-4">Mineral not found</p>
                    <Link to="/minerals" className="text-leaf hover:underline">← Back to Minerals</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-16 min-h-screen bg-cream">
            {/* Hero Banner */}
            <div className={`bg-gradient-to-br ${mineral.gradient} py-16 px-4`}>
                <div className="max-w-4xl mx-auto">
                    <Link
                        to="/minerals"
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
                    >
                        <ArrowLeft size={16} /> Back to Minerals
                    </Link>
                    <div className="flex items-start gap-6">
                        <span className="text-6xl sm:text-7xl">{mineral.emoji}</span>
                        <div>
                            <h1 className="font-display text-4xl sm:text-5xl font-black text-white mb-2">{mineral.name}</h1>
                            <p className="text-white/80 text-lg">{mineral.tagline}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    {[
                        { label: "Daily Need", value: mineral.rda.split(" for")[0], icon: "📊" },
                        { label: "Upper Limit", value: mineral.upperLimit, icon: "⚠️" },
                        { label: "Key Role", value: "Cofactor", icon: "⚙️" },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-sm border border-gray-100">
                            <div className="text-2xl mb-1">{stat.icon}</div>
                            <div className="font-bold text-gray-800 text-xs sm:text-sm leading-tight">{stat.value}</div>
                            <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* About This Mineral */}
                <Section icon={BookOpen} title="About This Mineral">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                            <h4 className="font-semibold text-blue-900 mb-2 text-sm">💡 What It Does</h4>
                            <p className="text-blue-800 text-sm leading-relaxed">{mineral.benefits[0]}</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                            <h4 className="font-semibold text-green-900 mb-2 text-sm">🤝 Works With Vitamins</h4>
                            <p className="text-green-800 text-sm">
                                {mineral.vitaminSynergy[0]}
                            </p>
                        </div>
                    </div>
                </Section>

                {/* Benefits */}
                <Section icon={CheckCircle} title="Health Benefits">
                    <ul className="space-y-2">
                        {mineral.benefits.map((b, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm">
                                <span className="text-green-500 mt-0.5 text-lg flex-shrink-0">✓</span>
                                {b}
                            </li>
                        ))}
                    </ul>
                </Section>

                {/* Vitamin Synergy */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <h3 className="font-display text-lg font-bold text-blue-800 mb-3">🤝 How It Works With Vitamins</h3>
                    <ul className="space-y-2">
                        {mineral.vitaminSynergy.map((synergy, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-blue-900 text-sm">
                                <span className="text-blue-600 flex-shrink-0 mt-0.5 font-bold">→</span>
                                {synergy}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Two Column Layout for Symptoms & Toxicity */}
                <div className="grid sm:grid-cols-2 gap-6">
                    {/* Deficiency Symptoms */}
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle size={20} className="text-amber-600" />
                            <h3 className="font-display text-lg font-bold text-amber-800">Deficiency Symptoms</h3>
                        </div>
                        <ul className="space-y-2">
                            {mineral.deficiencySymptoms.map((s, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-amber-900 text-sm">
                                    <span className="text-amber-500 flex-shrink-0 mt-0.5">•</span>
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Toxicity Signs */}
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle size={20} className="text-red-600" />
                            <h3 className="font-display text-lg font-bold text-red-800">Excess / Toxicity Signs</h3>
                        </div>
                        <ul className="space-y-2">
                            {mineral.toxicitySigns.map((s, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-red-900 text-sm">
                                    <span className="text-red-400 flex-shrink-0 mt-0.5">•</span>
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Food Sources */}
                <Section icon={CheckCircle} title="🍽️ Best Food Sources">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {mineral.sources.map((s, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-green-50 rounded-xl p-3 border border-green-100 hover:bg-green-100 transition-colors group cursor-pointer"
                            >
                                <span className="font-medium text-gray-700 text-sm mb-2 sm:mb-0 break-words flex-1">{s.food}</span>
                                <span className="text-gray-500 text-xs bg-white px-3 py-1.5 rounded-lg border w-full sm:w-auto text-center sm:text-right opacity-0 sm:opacity-0 group-hover:opacity-100 transition-opacity whitespace-normal sm:whitespace-nowrap flex-shrink-0">
                                    {s.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-3 italic block sm:hidden">👇 Tap on foods to see amounts</p>
                    <p className="text-xs text-gray-500 mt-3 italic hidden sm:block">💡 Hover over foods to see amounts</p>
                </Section>

                {/* RDA & Limits */}
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                        <h3 className="font-bold text-green-900 mb-2">📋 Recommended Daily Amount</h3>
                        <p className="text-green-800 text-sm leading-relaxed">{mineral.rda}</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                        <h3 className="font-bold text-yellow-900 mb-2">⚠️ Safe Upper Limit</h3>
                        <p className="text-yellow-800 text-sm leading-relaxed">{mineral.upperLimit}</p>
                    </div>
                </div>

                {/* At Risk Groups */}
                <Section icon={Users} title="Who Is at Risk?">
                    <div className="flex flex-wrap gap-2">
                        {mineral.atRiskGroups.map((g, idx) => (
                            <span key={idx} className="bg-blue-50 text-blue-700 text-sm px-3 py-1.5 rounded-lg border border-blue-200">
                                👤 {g}
                            </span>
                        ))}
                    </div>
                </Section>

                {/* Supplement Guidance */}
                <Section icon={Pill} title="Supplementation Guidance">
                    <p className="text-gray-700 leading-relaxed text-sm">{mineral.supplementGuidance}</p>
                </Section>

                {/* Nutrition Tips */}
                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                    <h3 className="font-display text-lg font-bold text-purple-800 mb-3">💡 Nutrition Tips</h3>
                    <p className="text-purple-800 text-sm leading-relaxed">{mineral.nutritionTips}</p>
                </div>

                {/* When to See Doctor */}
                <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-3">
                        <Phone size={20} />
                        <h3 className="font-display text-xl font-bold">When to See a Doctor</h3>
                    </div>
                    <p className="text-blue-100 leading-relaxed text-sm">{mineral.whenToSeeDoctor}</p>
                </div>

                {/* References */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                    <h3 className="font-display text-xl font-bold text-gray-700 mb-3">📚 Key References</h3>
                    <ul className="space-y-1">
                        {mineral.references.map((r, idx) => (
                            <li key={idx} className="text-gray-500 text-sm flex items-start gap-2">
                                <span className="flex-shrink-0 mt-0.5">•</span>
                                {r}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* SDG Alignment */}
                <div className="bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200 rounded-2xl p-6">
                    <h3 className="font-bold text-cyan-900 mb-2">🌍 SDG 3 – Good Health & Well-being</h3>
                    <p className="text-cyan-800 text-sm leading-relaxed">
                        Understanding {mineral.name.toLowerCase()} absorption and its role in vitamin metabolism contributes to preventing micronutrient-related health issues, reducing malnutrition, and promoting optimal nutritional status across all populations.
                    </p>
                </div>

                {/* Disclaimer */}
                <div className="bg-amber-50 border border-amber-300 rounded-xl p-4">
                    <p className="text-amber-800 text-xs leading-relaxed">
                        <strong>⚠️ Disclaimer:</strong> The information on this page is for educational purposes only. It does not constitute medical advice and should not replace consultation with a licensed healthcare professional. Always consult your doctor before starting any mineral supplement, especially if you have kidney disease or take medications that affect mineral metabolism.
                    </p>
                </div>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
                    <Link to="/minerals" className="inline-flex items-center justify-center sm:justify-start gap-2 text-leaf hover:underline font-medium text-sm">
                        <ArrowLeft size={16} /> All Minerals
                    </Link>
                    <Link to="/home" className="inline-flex items-center justify-center gap-2 bg-leaf text-white px-5 py-2.5 rounded-xl font-medium hover:bg-green-600 transition-colors text-sm">
                        Back to Vitamins →
                    </Link>
                </div>
            </div>
        </div>
    );
}