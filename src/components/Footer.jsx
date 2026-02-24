import { Link } from "react-router-dom";
import { Leaf, Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-deep text-gray-300 pt-12 pb-6 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Logo & University Section */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            {/* University Logo - Replace 'your-university-logo.png' with actual logo path */}
                            <img
                                src="/images/university-logo.png"
                                alt="University Logo"
                                className="w-10 h-10 object-contain"
                                onError={(e) => {
                                    e.target.style.display = "none";
                                }}
                            />
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-leaf to-primary rounded-lg flex items-center justify-center">
                                        <Leaf size={16} className="text-white" />
                                    </div>
                                    <span className="font-display font-bold text-xl text-white">
                    Vita<span className="text-green-400">Guide</span>
                  </span>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Evidence-based vitamin and mineral education for everyone. Bridging the gap between science and public health.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-3">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            {[
                                { to: "/home", label: "Vitamins Library" },
                                { to: "/Minerals", label: "Minerals Library" },
                                { to: "/diagnosis", label: "Symptom Checker" },
                                { to: "/blog", label: "Health Blog" },
                                { to: "/references", label: "Scientific References" },
                                { to: "/about", label: "About This Project" },
                            ].map((link) => (
                                <li key={link.to}>
                                    <Link to={link.to} className="hover:text-green-400 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold text-white mb-3">Resources</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="https://www.who.int" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                                    WHO Guidelines
                                </a>
                            </li>
                            <li>
                                <a href="https://ods.od.nih.gov" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                                    NIH Supplements
                                </a>
                            </li>
                            <li>
                                <a href="https://www.mayoclinic.org" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                                    Mayo Clinic
                                </a>
                            </li>
                            <li>
                                <a href="https://pubmed.ncbi.nlm.nih.gov" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                                    PubMed Research
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Disclaimer */}
                    <div>
                        <h4 className="font-semibold text-white mb-3">⚠️ Medical Disclaimer</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            This website is for educational purposes only. The information provided does not constitute medical advice and should not replace consultation with a qualified healthcare professional. Always consult your doctor or pharmacist before starting any supplement regimen.
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-gray-500">
                        © 2026 VitaGuide — MTI Pharmacy Faculty
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                        Made with <Heart size={12} className="text-red-400 fill-red-400" /> for public health education
                    </p>
                </div>
            </div>
        </footer>
    );
}