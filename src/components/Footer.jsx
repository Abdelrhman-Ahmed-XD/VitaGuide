import { Link } from "react-router-dom";
import { Leaf, Heart } from "lucide-react";

// Professional LinkedIn SVG Icon
const LinkedInIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-3.5 h-3.5"
    >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
);

export default function Footer() {
    return (
        <footer className="bg-deep text-gray-300 pt-12 pb-6 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Logo & University Section */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
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

                    <div className="flex items-center gap-4">
                        {/* Developer Credit - Now on the left side of the "Made with" section */}
                        <a
                            href="https://www.linkedin.com/in/abdelrhman-ahmed-fathy2004"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors group"
                        >
                            <span className="text-[#0077B5] group-hover:scale-110 transition-transform">
                                <LinkedInIcon />
                            </span>
                            <span>Developed by <span className="font-medium">Abdelrhman Ahmed</span></span>
                        </a>

                        {/* Divider Line */}
                        <div className="h-3 w-[1px] bg-gray-700 hidden sm:block"></div>

                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            Made with <Heart size={12} className="text-red-400 fill-red-400" /> for public health education
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}