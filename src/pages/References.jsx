import { ExternalLink } from "lucide-react";
import { references } from "../data/references";

export default function References() {
  return (
    <div className="pt-20 min-h-screen bg-cream">
      <div className="bg-gradient-to-br from-deep to-[#1a3a5c] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-5xl font-black text-white mb-4">
            Scientific References
          </h1>
          <p className="text-gray-300 text-lg">
            All content on VitaGuide is based on evidence from the most trusted clinical and public health organizations in the world.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        {references.map((category) => (
          <div key={category.category}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-leaf to-primary rounded-full" />
              <h2 className="font-display text-2xl font-bold text-deep">{category.category}</h2>
            </div>

            <div className="space-y-3">
              {category.items.map((item) => (
                <a
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-leaf hover:shadow-md transition-all duration-200"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800 text-sm group-hover:text-leaf transition-colors">
                        {item.title}
                      </h3>
                      <ExternalLink size={12} className="text-gray-400 flex-shrink-0" />
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="font-bold text-blue-800 mb-2">📌 Note on Currency</h3>
          <p className="text-blue-700 text-sm leading-relaxed">
            Nutritional science is constantly evolving. We recommend checking the original sources directly for the most up-to-date guidelines. This project reflects best evidence available as of 2025. All references were verified by pharmacy faculty students under academic supervision.
          </p>
        </div>
      </div>
    </div>
  );
}
