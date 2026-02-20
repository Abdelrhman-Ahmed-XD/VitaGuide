import { GraduationCap, Target, Heart, Users } from "lucide-react";

const teamMembers = [
  { name: "Radwa Ahmed Fathy", role: "Research Lead — Vitamins A, D" },
  { name: "Reem Sayed Abdelsatar", role: "Research Lead — B Vitamins" },
  { name: "Rahma Mostafa Abohashim", role: "Research Lead — Vitamins C, E, K" },
  { name: "Omar Mohamed Ammar", role: "Content Writing & Editing" },
  { name: "Omar Khaled Ali Eleraky", role: "Content Writing & Editing" },
  { name: "Sara Saeed Ali Shalaan", role: "Questionnaire Logic & Symptom Data" },
  { name: "Omnia Medhat Rashad Rasd ", role: "Questionnaire Logic & Symptom Data" },
  { name: "Rawan Ayman Mohamed ", role: "Website Design & Frontend" },
  { name: "Rawda Mohamed Sadiq ", role: "Website Development" },
  { name: "Rofida Noumiry Mohamed ", role: "Project Coordination & References" },
];

const aims = [
  {
    icon: Target,
    title: "Primary Aim",
    description: "Educate the public about vitamins, mineral deficiencies, and how to address them safely through diet and supplementation.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Heart,
    title: "Patient Safety",
    description: "Emphasize when to seek medical advice and the dangers of self-diagnosing or self-prescribing high-dose supplements.",
    color: "from-red-400 to-pink-500",
  },
  {
    icon: Users,
    title: "Accessible Science",
    description: "Bridge the gap between clinical knowledge held by healthcare professionals and the general public's understanding of their nutritional health.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: GraduationCap,
    title: "Academic Excellence",
    description: "Apply pharmacy education principles in a practical, community-facing digital health project backed by peer-reviewed evidence.",
    color: "from-purple-400 to-violet-500",
  },
];

export default function About() {
  return (
    <div className="pt-20 min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-gradient-to-br from-leaf to-primary py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-5xl font-black text-white mb-4">
            About VitaGuide
          </h1>
          <p className="text-green-100 text-lg">
            A graduation project by pharmacy students dedicated to improving nutritional literacy and public health.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Project Overview */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="font-display text-3xl font-bold text-deep mb-4">The Project</h2>
          <div className="prose text-gray-600 leading-relaxed space-y-4 text-sm">
            <p>
              VitaGuide is a public-friendly, evidence-based educational website created as a graduation project by pharmacy faculty students. Our goal is to help everyday people understand vitamins — why they matter, how deficiencies happen, and how to address them safely.
            </p>
            <p>
              Each vitamin page provides structured, evidence-based information: key health benefits, deficiency symptoms, dietary sources, recommended daily intake (RDA), supplement guidance, toxicity risks, and when to seek medical advice. All content is sourced from trusted clinical authorities including the WHO, NIH, Mayo Clinic, and peer-reviewed literature.
            </p>
            <p>
              A unique feature of VitaGuide is the interactive symptom checker — users select their symptoms and receive a risk-based assessment of potential vitamin deficiencies, with guidance on whether to improve their diet, seek laboratory testing, or consult a healthcare provider. No diagnostic claims are made.
            </p>
          </div>
        </div>

        {/* Project Aims */}
        <div>
          <h2 className="font-display text-3xl font-bold text-deep mb-6">Our Aims</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {aims.map((aim) => (
              <div key={aim.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${aim.color} flex items-center justify-center mb-4`}>
                  <aim.icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{aim.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{aim.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="font-display text-3xl font-bold text-deep mb-6">The Team</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {teamMembers.map((member, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-leaf to-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{member.name}</p>
                  <p className="text-gray-400 text-xs">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Supervisors / Faculty */}
        <div className="bg-gradient-to-br from-deep to-[#1a3a5c] rounded-2xl p-8 text-white">
          <h2 className="font-display text-2xl font-bold mb-3">Academic Supervision</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            This project was developed under the academic supervision of the Faculty of Pharmacy, [Your University Name], as part of the [Year] graduation requirements.
          </p>
          <div className="space-y-2">
            <div className="bg-white/10 rounded-xl p-3">
              <p className="font-medium text-sm">Supervisor: Prof. / Dr. [Noha Fawzy]</p>
              <p className="text-gray-400 text-xs">Department of [ Pharmacology & Toxicology]</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-6">
          <h3 className="font-bold text-amber-800 mb-2">⚠️ Full Medical Disclaimer</h3>
          <p className="text-amber-700 text-sm leading-relaxed">
            The content on VitaGuide is produced for educational and informational purposes only. It is based on evidence from reputable scientific and clinical sources, but it does not constitute medical advice, diagnosis, or treatment recommendations. VitaGuide is not a substitute for professional medical consultation. Always consult a qualified physician, pharmacist, or registered dietitian before making any changes to your diet, supplement use, or medical management. The creators of this website accept no liability for decisions made based on information provided here.
          </p>
        </div>
      </div>
    </div>
  );
}
