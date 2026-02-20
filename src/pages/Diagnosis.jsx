import { useState } from "react";
import { Link } from "react-router-dom";
import { symptoms, symptomDeficiencyMap, vitaminPageIds } from "../data/symptoms";
import { AlertTriangle, CheckCircle, RefreshCw, ArrowRight } from "lucide-react";

const categories = [...new Set(symptoms.map((s) => s.category))];

export default function Diagnosis() {
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);
  const [step, setStep] = useState("quiz"); // "quiz" | "result"

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const analyze = () => {
    if (selected.length === 0) return;

    // Tally scores for each deficiency
    const scores = {};
    selected.forEach((symptomId) => {
      const map = symptomDeficiencyMap[symptomId] || {};
      Object.entries(map).forEach(([deficiency, weight]) => {
        scores[deficiency] = (scores[deficiency] || 0) + weight;
      });
    });

    // Sort by score
    const sorted = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .filter(([, score]) => score >= 5) // minimum threshold
      .slice(0, 5); // top 5

    setResult(sorted);
    setStep("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => {
    setSelected([]);
    setResult(null);
    setStep("quiz");
  };

  const getRiskLevel = (score, maxScore) => {
    const pct = score / maxScore;
    if (pct >= 0.7) return { label: "High Risk", color: "text-red-600 bg-red-50 border-red-200" };
    if (pct >= 0.4) return { label: "Moderate Risk", color: "text-amber-600 bg-amber-50 border-amber-200" };
    return { label: "Low Risk", color: "text-blue-600 bg-blue-50 border-blue-200" };
  };

  return (
    <div className="pt-20 min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-deep py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-5xl font-black text-white mb-4">
            Symptom Checker
          </h1>
          <p className="text-blue-200 text-lg">
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
                <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-leaf rounded-full"></span>
                  {category}
                </h3>
                <div className="grid sm:grid-cols-2 gap-2">
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
                          {symptom.label}
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
            {result.length === 0 ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <CheckCircle size={40} className="text-green-500 mx-auto mb-3" />
                <h3 className="font-display text-2xl font-bold text-green-800 mb-2">
                  No Significant Risk Detected
                </h3>
                <p className="text-green-700 text-sm">
                  Based on your selected symptoms, no strong pattern of vitamin deficiency was identified. This does not mean you are deficient-free — consult your doctor for lab tests if you have concerns.
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
                        The following results are based on symptom patterns and are not a medical diagnosis. These findings suggest potential deficiency risks that warrant further investigation through laboratory testing by a healthcare provider.
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="font-display text-2xl font-bold text-deep mb-4">
                  Your Risk Assessment
                </h2>

                {(() => {
                  const maxScore = result[0][1];
                  return result.map(([deficiency, score]) => {
                    const risk = getRiskLevel(score, maxScore);
                    const vitaminId = vitaminPageIds[deficiency];
                    return (
                      <div key={deficiency} className={`border rounded-2xl p-5 mb-4 ${risk.color}`}>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-lg">{deficiency}</h3>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${risk.color}`}>
                              {risk.label}
                            </span>
                          </div>
                          {vitaminId && (
                            <Link
                              to={`/vitamin/${vitaminId}`}
                              className="text-xs bg-white border border-current rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors font-medium flex items-center gap-1"
                            >
                              Learn more <ArrowRight size={12} />
                            </Link>
                          )}
                        </div>
                        {/* Score bar */}
                        <div className="w-full bg-white/60 rounded-full h-2">
                          <div
                            className="bg-current h-2 rounded-full transition-all duration-700"
                            style={{ width: `${(score / maxScore) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  });
                })()}

                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mt-6">
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
