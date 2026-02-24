import { Link } from "react-router-dom";
import {ArrowRight, BookOpen, ClipboardList, Users, Shield, FlaskConical} from "lucide-react";

const features = [
    {
        icon: BookOpen,
        title: "Vitamin Profiles",
        description: "In-depth pages for every major vitamin: benefits, deficiency signs, food sources, dosing, and toxicity.",
        color: "bg-blue-50 text-blue-600",
        link: "/home",
    },
    {
        icon: FlaskConical,
        title: "Mineral Profiles",
        description: "Explore essential minerals: roles in vitamin activation, absorption, deficiency signs, food sources, and recommended intake.",
        color: "bg-teal-50 text-teal-600",
        link: "/minerals",
    },
    {
        icon: ClipboardList,
        title: "Symptom Checker",
        description: "Select your symptoms and get a personalized risk assessment for possible vitamin deficiencies.",
        color: "bg-green-50 text-green-600",
        link: "/diagnosis",
    },
    {
        icon: Shield,
        title: "Evidence-Based",
        description: "All information sourced from WHO, NIH, Mayo Clinic, and peer-reviewed clinical research.",
        color: "bg-purple-50 text-purple-600",
        link: "/references",
    },
    {
        icon: Users,
        title: "Health Insights",
        description: "Read in-depth articles and expert guidance written in clear, accessible language for everyone.",
        color: "bg-orange-50 text-orange-600",
        link: "/blog",
    },
];

const vitaminsPreview = [
    { name: "Vitamin A", emoji: "🥕", color: "bg-orange-100" },
    { name: "Vitamin B12", emoji: "🩸", color: "bg-red-100" },
    { name: "Vitamin C", emoji: "🍊", color: "bg-yellow-100" },
    { name: "Vitamin D", emoji: "☀️", color: "bg-amber-100" },
    { name: "Vitamin E", emoji: "🌻", color: "bg-teal-100" },
    { name: "Vitamin K", emoji: "🥦", color: "bg-green-100" },
];

export default function Landing() {
    return (
        <div className="pt-16">
            {/* Hero */}
            <section className="min-h-screen bg-gradient-to-br from-deep via-[#0f3460] to-[#16213e] relative overflow-hidden flex items-center">
                {/* Decorative circles */}
                <div className="absolute top-20 right-10 w-96 h-96 bg-leaf/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>


                            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
                                Your Guide to
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-cyan-300">
                  Vitamins &
                </span>
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">
                  Minerals
                </span>
                            </h1>

                            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-lg">
                                Evidence-based, easy-to-understand health education about vitamins, deficiency symptoms, and how to optimize your nutrition — safely and scientifically.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    to="/home"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-leaf to-green-400 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    Explore Vitamins
                                    <ArrowRight size={20} />
                                </Link>
                                <Link
                                    to="/diagnosis"
                                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-200"
                                >
                                    Check My Symptoms
                                    <ClipboardList size={20} />
                                </Link>
                            </div>
                        </div>

                        {/* Floating vitamin cards */}
                        <div className="hidden lg:grid grid-cols-2 gap-4">
                            {vitaminsPreview.map((v, i) => (
                                <div
                                    key={v.name}
                                    className={`${v.color} rounded-2xl p-6 flex flex-col items-center gap-2 backdrop-blur-sm animate-float`}
                                    style={{ animationDelay: `${i * 0.2}s` }}
                                >
                                    <span className="text-4xl">{v.emoji}</span>
                                    <span className="font-semibold text-gray-700 text-sm">{v.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Wave divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 80L1440 80L1440 30C1200 80 900 0 720 30C540 60 240 0 0 30L0 80Z" fill="#FFF8F0" />
                    </svg>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="font-display text-4xl font-bold text-deep mb-4">
                            Everything You Need to Know
                        </h2>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                            Designed for students, patients, and curious minds — VitaGuide makes nutritional science accessible to everyone.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((f) => (
                            <Link
                                key={f.title}
                                to={f.link}
                                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all border border-gray-100 cursor-pointer"
                            >
                                <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <f.icon size={22} />
                                </div>
                                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-leaf transition-colors">{f.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                                <div className="mt-4 flex items-center gap-1 text-leaf text-xs font-semibold group-hover:gap-2 transition-all opacity-0 group-hover:opacity-100">
                                    Learn more <ArrowRight size={14} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>


            {/* CTA */}
            {/* SDG 3 Banner */}
            <div className="mt-16 bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200 rounded-2xl p-8 text-center">
                <h3 className="font-display text-2xl font-bold text-deep mb-2">
                    🌍 Aligned with SDG 3 – Good Health and Well-being
                </h3>
                <p className="text-gray-700 max-w-2xl mx-auto text-sm leading-relaxed">
                    VitaGuide promotes nutritional awareness and prevents micronutrient-related health issues by explaining how minerals are essential co-factors in vitamin absorption and metabolism. Understanding mineral-vitamin interactions helps prevent malnutrition, supports optimal health outcomes, and empowers individuals to make evidence-based nutritional choices.
                </p>
            </div>
            {/* Disclaimer Banner */}
            <section className="py-10 bg-amber-50 border-y border-amber-200">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <p className="text-amber-800 text-sm leading-relaxed">
                        <strong>⚠️ Medical Disclaimer:</strong> The information on this website is for educational purposes only and does not constitute medical advice. It is not a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider before making any changes to your diet or supplement regimen.
                    </p>
                </div>
            </section>
            <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="font-display text-4xl font-bold text-deep mb-4">
                        Vitamins & Minerals: A Complete Picture
                    </h2>
                    <p className="text-gray-600 text-lg mb-8">
                        Learn not just about vitamins, but how minerals enable their function. Understand the complete micronutrient ecosystem.
                    </p>
                    <Link
                        to="/minerals"
                        className="inline-flex items-center gap-2 bg-leaf text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Explore Minerals
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>


            <section className="py-20 bg-gradient-to-br from-leaf to-primary">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="font-display text-4xl font-bold text-white mb-4">
                        Think You Might Be Deficient?
                    </h2>
                    <p className="text-green-100 text-lg mb-8">
                        Take our interactive symptom quiz — it only takes 2 minutes and gives you a personalized vitamin deficiency risk assessment.
                    </p>
                    <Link
                        to="/diagnosis"
                        className="inline-flex items-center gap-2 bg-white text-leaf px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Start Symptom Checker
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}