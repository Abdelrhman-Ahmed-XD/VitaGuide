import { useParams, Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, CheckCircle, Users, Pill, Phone, BookOpen } from "lucide-react";
import { getVitaminById } from "../data/vitamins";

const Section = ({ icon: Icon, title, children, className = "" }) => (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
            <Icon size={20} className="text-leaf" />
            <h3 className="font-display text-xl font-bold text-deep">{title}</h3>
        </div>
        {children}
    </div>
);

export default function VitaminPage() {
    const { id } = useParams();
    const vitamin = getVitaminById(id);

    if (!vitamin) {
        return (
            <div className="pt-24 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-2xl text-gray-400 mb-4">Vitamin not found</p>
                    <Link to="/home" className="text-leaf hover:underline">← Back to Vitamins</Link>
                </div>
            </div>
        );
    }

    // Extract YouTube video ID from vitamin tagline or use a placeholder
    const getYoutubeId = () => {
        // You can customize this by adding youtube_id to vitamin data
        const youtubeIds = {
            "vitamin-a": "https://youtu.be/lkAnmSj9KuM?si=cQ4Sht8i4Y-GZbLu",
            "vitamin-b1": "qXyUNIDcWEA",
            "vitamin-b12": "0oVK6fLlp1g",
            "vitamin-c": "E2iCnZ3LJBQ",
            "vitamin-d": "3VhRYzJcqI8",
            "vitamin-e": "VUvJIdWfFfI",
            "vitamin-k": "FaM8CVTNNX4",
            "vitamin-b6": "K-ixPT1-E9g",
            "folate": "Y8NjkiPLl1E",
            "vitamin-b2": "o8fJRfCE17E",
            "vitamin-b3": "PwqMTIvANRw",
        };
        return youtubeIds[id] || "dQw4w9WgXcQ";
    };

    return (
        <div className="pt-16 min-h-screen bg-cream">
            {/* Hero Banner */}
            <div className={`bg-gradient-to-br ${vitamin.gradient} py-16 px-4`}>
                <div className="max-w-4xl mx-auto">
                    <Link
                        to="/home"
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
                    >
                        <ArrowLeft size={16} /> Back to Vitamins
                    </Link>
                    <div className="flex items-start gap-6">
                        <span className="text-6xl sm:text-7xl">{vitamin.emoji}</span>
                        <div>
                            <h1 className="font-display text-4xl sm:text-5xl font-black text-white mb-2">{vitamin.name}</h1>
                            <p className="text-white/80 text-lg mb-4">{vitamin.tagline}</p>
                            <div className="flex flex-wrap gap-2">
                                {vitamin.relatedMinerals.map((m) => (
                                    <span key={m} className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/30">
                    🔬 {m}
                  </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
                {/* RDA Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {[
                        { label: "Daily Requirement", value: vitamin.rda.split(" for")[0], icon: "📊" },
                        { label: "Upper Safe Limit", value: vitamin.upperLimit, icon: "⚠️" },
                        { label: "Type", value: vitamin.name.includes("D") || vitamin.name.includes("A") || vitamin.name.includes("E") || vitamin.name.includes("K") ? "Fat-soluble" : "Water-soluble", icon: "💧" },
                        { label: "At-Risk Groups", value: `${vitamin.atRiskGroups.length} groups`, icon: "👥" },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-sm border border-gray-100">
                            <div className="text-2xl mb-1">{stat.icon}</div>
                            <div className="font-bold text-gray-800 text-xs sm:text-sm leading-tight">{stat.value}</div>
                            <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* About This Vitamin */}
                <Section icon={BookOpen} title="About This Vitamin">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                            <h4 className="font-semibold text-blue-900 mb-2 text-sm">💡 What It Does</h4>
                            <p className="text-blue-800 text-sm leading-relaxed">{vitamin.benefits[0]}</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                            <h4 className="font-semibold text-green-900 mb-2 text-sm">🔬 Type</h4>
                            <p className="text-green-800 text-sm">
                                {vitamin.name.includes("D") || vitamin.name.includes("A") || vitamin.name.includes("E") || vitamin.name.includes("K")
                                    ? "Fat-soluble: Stored in body fat, requires dietary fat for absorption"
                                    : "Water-soluble: Not stored in body, requires daily intake"}
                            </p>
                        </div>
                    </div>
                </Section>

                {/* Benefits */}
                <Section icon={CheckCircle} title="Health Benefits">
                    <ul className="space-y-2">
                        {vitamin.benefits.map((b, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm">
                                <span className="text-green-500 mt-0.5 text-lg flex-shrink-0">✓</span>
                                {b}
                            </li>
                        ))}
                    </ul>
                </Section>



                {/* Two Column Layout for Symptoms & Toxicity */}
                <div className="grid sm:grid-cols-2 gap-6">
                    {/* Deficiency Symptoms */}
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle size={20} className="text-amber-600" />
                            <h3 className="font-display text-lg font-bold text-amber-800">Deficiency Symptoms</h3>
                        </div>
                        <ul className="space-y-2">
                            {vitamin.deficiencySymptoms.map((s, idx) => (
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
                            <h3 className="font-display text-lg font-bold text-red-800">Toxicity / Excess Signs</h3>
                        </div>
                        <ul className="space-y-2">
                            {vitamin.toxicitySigns.map((s, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-red-900 text-sm">
                                    <span className="text-red-400 flex-shrink-0 mt-0.5">•</span>
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


                {/* YouTube Video */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    <div className="relative w-full bg-black" style={{ paddingBottom: "56.25%" }}>
                        <iframe
                            title={`Everything about ${vitamin.name}`}
                            className="absolute top-0 left-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${getYoutubeId()}?autoplay=1&mute=1`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    <div className="p-4 bg-gray-50">
                        <p className="text-xs text-gray-500">Video: Everything you need to know about {vitamin.name}</p>
                    </div>
                </div>


                {/* Food Sources */}
                <Section icon={CheckCircle} title="🍽️ Best Food Sources">
                    <div className="grid sm:grid-cols-2 gap-3">
                        {vitamin.sources.map((s, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between bg-green-50 rounded-xl p-3 border border-green-100 hover:bg-green-100 transition-colors group cursor-pointer"
                            >
                                <span className="font-medium text-gray-700 text-sm">{s.food}</span>
                                <span className="text-gray-500 text-xs bg-white px-3 py-1.5 rounded-lg border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {s.amount}
                </span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-3 italic">💡 Hover over food names to see exact amounts</p>
                </Section>

                {/* At Risk Groups */}
                <Section icon={Users} title="Who Is at Risk?">
                    <div className="flex flex-wrap gap-2">
                        {vitamin.atRiskGroups.map((g, idx) => (
                            <span key={idx} className="bg-blue-50 text-blue-700 text-sm px-3 py-1.5 rounded-lg border border-blue-200">
                👤 {g}
              </span>
                        ))}
                    </div>
                </Section>

                {/* Supplement Guidance */}
                <Section icon={Pill} title="Supplement Guidance">
                    <p className="text-gray-700 leading-relaxed text-sm">{vitamin.supplementGuidance}</p>
                </Section>

                {/* When to See Doctor */}
                <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-3">
                        <Phone size={20} />
                        <h3 className="font-display text-xl font-bold">When to See a Doctor</h3>
                    </div>
                    <p className="text-blue-100 leading-relaxed text-sm">{vitamin.whenToSeeDoctor}</p>
                </div>

                {/* Related Minerals */}
                {vitamin.relatedMinerals.length > 0 && (
                    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                        <h3 className="font-display text-xl font-bold text-purple-800 mb-3">🔬 Supporting Minerals</h3>
                        <ul className="space-y-2">
                            {vitamin.relatedMinerals.map((m, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-purple-900 text-sm">
                                    <span className="text-purple-500 flex-shrink-0 mt-0.5">⚗️</span>
                                    {m}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* References */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                    <h3 className="font-display text-xl font-bold text-gray-700 mb-3">📚 Key References</h3>
                    <ul className="space-y-1">
                        {vitamin.references.map((r, idx) => (
                            <li key={idx} className="text-gray-500 text-sm flex items-start gap-2">
                                <span className="flex-shrink-0 mt-0.5">•</span>
                                {r}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Disclaimer */}
                <div className="bg-amber-50 border border-amber-300 rounded-xl p-4">
                    <p className="text-amber-800 text-xs leading-relaxed">
                        <strong>⚠️ Disclaimer:</strong> The information on this page is for educational purposes only. It does not constitute medical advice and should not replace consultation with a licensed healthcare professional or pharmacist. Always consult your doctor before starting any supplement.
                    </p>
                </div>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
                    <Link to="/home" className="inline-flex items-center justify-center sm:justify-start gap-2 text-leaf hover:underline font-medium text-sm">
                        <ArrowLeft size={16} /> All Vitamins
                    </Link>
                    <Link to="/diagnosis" className="inline-flex items-center justify-center gap-2 bg-leaf text-white px-5 py-2.5 rounded-xl font-medium hover:bg-green-600 transition-colors text-sm">
                        Check My Symptoms →
                    </Link>
                </div>
            </div>
        </div>
    );
}