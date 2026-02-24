import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { minerals } from "../data/minerals";

export default function Minerals() {
    const [search, setSearch] = useState("");


    const filtered = minerals.filter(
        (m) =>
            m.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            m.tagline.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );

    return (
        <div className="pt-20 min-h-screen bg-cream">
            {/* Header */}
            <div className="bg-gradient-to-br from-deep to-[#0f3460] py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="font-display text-5xl font-black text-white mb-4">
                        Essential Minerals Library
                    </h1>
                    <p className="text-gray-300 text-lg mb-8">
                        Explore how minerals support vitamin absorption, metabolism, and optimal health. Each mineral's role in the vitamin-mineral ecosystem explained.
                    </p>
                    {/* Search */}
                    <div className="relative max-w-md mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search minerals..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-green-400 transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {filtered.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No minerals found for "{search}"</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((mineral) => (
                            <Link
                                key={mineral.id}
                                to={`/mineral/${mineral.id}`}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                            >
                                {/* Card Header with gradient */}
                                <div className={`bg-gradient-to-br ${mineral.gradient} p-8 flex items-center justify-between`}>
                                    <div>
                                        <span className="text-4xl block mb-2">{mineral.emoji}</span>
                                        <h3 className="font-display text-2xl font-bold text-white">{mineral.name}</h3>
                                        <p className="text-white/80 text-sm mt-1">{mineral.tagline}</p>
                                    </div>
                                    <ArrowRight
                                        size={24}
                                        className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all"
                                    />
                                </div>

                                {/* Card Body */}
                                <div className="p-6">
                                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Key Benefits</h4>
                                    <ul className="space-y-1.5">
                                        {mineral.benefits.slice(0, 3).map((b) => (
                                            <li key={b} className="text-sm text-gray-600 flex gap-2">
                                                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                                                {b}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <span className="text-xs text-gray-400">RDA: {mineral.rda.split(" ")[0]}</span>
                                        <span className="text-xs font-medium text-leaf group-hover:underline">
                                            Read more →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* SDG 3 Banner */}
                <div className="mt-16 bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200 rounded-2xl p-8 text-center">
                    <h3 className="font-display text-2xl font-bold text-deep mb-2">
                        🌍 Aligned with SDG 3 – Good Health and Well-being
                    </h3>
                    <p className="text-gray-700 max-w-2xl mx-auto text-sm leading-relaxed">
                        VitaGuide promotes nutritional awareness and prevents micronutrient-related health issues by explaining how minerals are essential co-factors in vitamin absorption and metabolism. Understanding mineral-vitamin interactions helps prevent malnutrition, supports optimal health outcomes, and empowers individuals to make evidence-based nutritional choices.
                    </p>
                </div>

                {/* Connection to Vitamins */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
                    <h3 className="font-display text-2xl font-bold text-deep mb-3">
                        🔗 Vitamins & Minerals Work Together
                    </h3>
                    <p className="text-gray-700 max-w-3xl mx-auto text-sm leading-relaxed mb-6">
                        Minerals act as cofactors and coenzymes essential for vitamin activation, transport, and function. For example, magnesium is required to activate Vitamin D in the kidneys, zinc is needed to synthesize retinol-binding protein for Vitamin A transport, and calcium absorption directly depends on Vitamin D status. The vitamin-mineral partnership is inseparable for nutritional health.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/home"
                            className="inline-flex items-center justify-center gap-2 bg-leaf text-white px-6 py-3 rounded-xl font-medium hover:bg-green-600 transition-colors"
                        >
                            Explore Vitamins ←
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}