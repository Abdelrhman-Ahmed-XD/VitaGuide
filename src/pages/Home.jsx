import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { vitamins } from "../data/vitamins";

export default function Home() {
  const [search, setSearch] = useState("");

  const filtered = vitamins.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.tagline.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-20 min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-to-br from-deep to-[#0f3460] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-5xl font-black text-white mb-4">
            Vitamins Library
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Explore all essential vitamins — their benefits, deficiency signs, food sources, and safe supplementation.
          </p>
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search vitamins..."
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
            <p className="text-gray-500 text-lg">No vitamins found for "{search}"</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((vitamin) => (
              <Link
                key={vitamin.id}
                to={`/vitamin/${vitamin.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                {/* Card Header with gradient */}
                <div className={`bg-gradient-to-br ${vitamin.gradient} p-8 flex items-center justify-between`}>
                  <div>
                    <span className="text-4xl block mb-2">{vitamin.emoji}</span>
                    <h3 className="font-display text-2xl font-bold text-white">{vitamin.name}</h3>
                    <p className="text-white/80 text-sm mt-1">{vitamin.tagline}</p>
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
                    {vitamin.benefits.slice(0, 3).map((b) => (
                      <li key={b} className="text-sm text-gray-600 flex gap-2">
                        <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400">RDA: {vitamin.rda.split("/")[0]}</span>
                    <span className="text-xs font-medium text-leaf group-hover:underline">
                      Read more →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Minerals note */}
        <div className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-8 text-center">
          <h3 className="font-display text-2xl font-bold text-deep mb-2">
            🔬 Essential Minerals Section
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
            Minerals like <strong>Magnesium</strong>, <strong>Zinc</strong>, <strong>Calcium</strong>, <strong>Iron</strong>, <strong>Selenium</strong>, and <strong>Iodine</strong> play critical roles in vitamin absorption and metabolism. Each vitamin page includes the minerals that directly support its function.
          </p>
        </div>
      </div>
    </div>
  );
}
