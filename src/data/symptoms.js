export const symptoms = [
    // Eyes & Vision
    { id: "night_blindness", label: "Night blindness / poor vision in dim light", category: "Eyes & Vision" },
    { id: "dry_eyes", label: "Dry or irritated eyes", category: "Eyes & Vision" },
    { id: "blurry_vision", label: "Blurry or deteriorating vision", category: "Eyes & Vision" },
    { id: "light_sensitivity", label: "Light sensitivity or burning eyes", category: "Eyes & Vision" },

    // Energy & Mood
    { id: "fatigue", label: "Fatigue and persistent tiredness", category: "Energy & Mood" },
    { id: "weakness", label: "Muscle weakness", category: "Energy & Mood" },
    { id: "depression", label: "Depression or low mood", category: "Energy & Mood" },
    { id: "memory_problems", label: "Memory problems or brain fog", category: "Energy & Mood" },
    { id: "irritability", label: "Irritability or mood swings", category: "Energy & Mood" },
    { id: "poor_concentration", label: "Poor concentration or difficulty focusing", category: "Energy & Mood" },
    { id: "loss_of_appetite", label: "Loss of appetite or nausea", category: "Energy & Mood" },

    // Nerves & Movement
    { id: "tingling_hands", label: "Tingling or numbness in hands or feet", category: "Nerves" },
    { id: "balance_issues", label: "Balance problems or difficulty walking", category: "Nerves" },
    { id: "muscle_cramps", label: "Muscle cramps or spasms", category: "Nerves" },
    { id: "burning_sensation", label: "Burning sensations in limbs", category: "Nerves" },
    { id: "seizures", label: "Seizures (especially in infants)", category: "Nerves" },

    // Skin & Mouth
    { id: "bleeding_gums", label: "Bleeding or swollen gums", category: "Skin & Mouth" },
    { id: "mouth_sores", label: "Mouth sores or cracked lips (corners of mouth)", category: "Skin & Mouth" },
    { id: "swollen_tongue", label: "Swollen or inflamed tongue (glossitis)", category: "Skin & Mouth" },
    { id: "skin_rash", label: "Skin rash or rough darkened skin (sun-exposed areas)", category: "Skin & Mouth" },
    { id: "dry_peeling_skin", label: "Dry, peeling or scaly skin", category: "Skin & Mouth" },
    { id: "easy_bruising", label: "Easy bruising", category: "Skin & Mouth" },
    { id: "hair_loss", label: "Hair loss or brittle hair", category: "Skin & Mouth" },
    { id: "petechiae", label: "Petechiae (tiny red spots on skin)", category: "Skin & Mouth" },

    // Bones & Joints
    { id: "bone_pain", label: "Bone pain or tenderness", category: "Bones & Joints" },
    { id: "joint_pain", label: "Joint pain or stiffness", category: "Bones & Joints" },
    { id: "frequent_fractures", label: "Frequent fractures or weak bones", category: "Bones & Joints" },

    // Immune & Healing
    { id: "frequent_infections", label: "Frequent infections or slow recovery", category: "Immune" },
    { id: "poor_wound_healing", label: "Poor or slow wound healing", category: "Immune" },

    // Blood & Circulatory
    { id: "anemia", label: "Anemia (pale skin, shortness of breath, weakness)", category: "Blood" },
    { id: "heavy_bleeding", label: "Excessive bleeding (cuts, menstrual, internal)", category: "Blood" },
    { id: "heart_palpitations", label: "Heart palpitations", category: "Blood" },
    { id: "shortness_of_breath", label: "Shortness of breath", category: "Blood" },

    // Digestive
    { id: "digestive_issues", label: "Digestive problems or diarrhea", category: "Digestive" },
    { id: "constipation", label: "Constipation", category: "Digestive" },
];

// Weights: 10=hallmark/pathognomonic | 7-9=strong | 4-6=moderate | 1-3=weak/shared
// Based on WHO, NIH, Mayo Clinic, and PDF/doc clinical data
export const symptomDeficiencyMap = {

    // Eyes & Vision
    night_blindness:      { "Vitamin A": 10, "Zinc (mineral)": 4 },
    dry_eyes:             { "Vitamin A": 8 },
    blurry_vision:        { "Vitamin A": 5, "Vitamin B12": 3, "Vitamin E": 3 },
    light_sensitivity:    { "Vitamin B2": 9, "Vitamin A": 3 },

    // Energy & Mood
    fatigue:              { "Vitamin B12": 8, "Folate (B9)": 7, "Vitamin D": 7, "Vitamin B1": 6, "Vitamin B2": 5, "Vitamin B6": 5, "Vitamin C": 4 },
    weakness:             { "Vitamin D": 8, "Vitamin B1": 7, "Vitamin B12": 6, "Vitamin E": 5, "Vitamin C": 4 },
    depression:           { "Vitamin D": 8, "Vitamin B12": 7, "Vitamin B6": 6, "Folate (B9)": 6 },
    memory_problems:      { "Vitamin B12": 9, "Vitamin B1": 6, "Vitamin D": 5, "Folate (B9)": 4 },
    irritability:         { "Vitamin B3": 6, "Vitamin B6": 5, "Folate (B9)": 5, "Vitamin B1": 4, "Vitamin C": 3 },
    poor_concentration:   { "Vitamin B1": 8, "Vitamin B12": 6, "Folate (B9)": 5, "Vitamin D": 4 },
    loss_of_appetite:     { "Vitamin B1": 7, "Vitamin B12": 4, "Vitamin C": 4 },

    // Nerves & Movement
    tingling_hands:       { "Vitamin B12": 10, "Vitamin B6": 7, "Vitamin B1": 6, "Vitamin E": 4 },
    balance_issues:       { "Vitamin B12": 9, "Vitamin B1": 6, "Vitamin B6": 5 },
    muscle_cramps:        { "Vitamin D": 6 },
    burning_sensation:    { "Vitamin B6": 8, "Vitamin B12": 6, "Vitamin B1": 5 },
    seizures:             { "Vitamin B6": 9, "Vitamin B1": 5 },

    // Skin & Mouth
    bleeding_gums:        { "Vitamin C": 10, "Vitamin K": 6 },
    mouth_sores:          { "Vitamin B2": 9, "Vitamin B3": 7, "Folate (B9)": 6, "Vitamin B12": 5, "Vitamin B6": 5 },
    swollen_tongue:       { "Vitamin B12": 8, "Vitamin B3": 7, "Folate (B9)": 6, "Vitamin B2": 6, "Vitamin B6": 5 },
    skin_rash:            { "Vitamin B3": 10, "Vitamin B2": 7, "Vitamin A": 5, "Vitamin B6": 5 },
    dry_peeling_skin:     { "Vitamin A": 8, "Vitamin B2": 5, "Vitamin B3": 4 },
    easy_bruising:        { "Vitamin C": 9, "Vitamin K": 9 },
    hair_loss:            { "Vitamin D": 5, "Vitamin A": 4 },
    petechiae:            { "Vitamin C": 9, "Vitamin K": 6 },

    // Bones & Joints
    bone_pain:            { "Vitamin D": 10, "Vitamin A": 4 },
    joint_pain:           { "Vitamin D": 7, "Vitamin C": 5 },
    frequent_fractures:   { "Vitamin D": 9, "Vitamin K": 7 },

    // Immune & Healing
    frequent_infections:  { "Vitamin C": 9, "Vitamin A": 8, "Vitamin D": 7 },
    poor_wound_healing:   { "Vitamin C": 10, "Vitamin A": 8, "Vitamin K": 4 },

    // Blood & Circulatory
    anemia:               { "Vitamin B12": 9, "Folate (B9)": 9, "Vitamin B6": 6, "Vitamin C": 4 },
    heavy_bleeding:       { "Vitamin K": 10 },
    heart_palpitations:   { "Vitamin B1": 8, "Vitamin B12": 5 },
    shortness_of_breath:  { "Vitamin B12": 7, "Folate (B9)": 7, "Vitamin C": 5 },

    // Digestive
    digestive_issues:     { "Vitamin B3": 6, "Vitamin C": 3, "Vitamin B1": 3 },
    constipation:         { "Vitamin D": 3 },
};

export const vitaminPageIds = {
    "Vitamin A": "vitamin-a",
    "Vitamin B1": "vitamin-b1",
    "Vitamin B2": "vitamin-b2",
    "Vitamin B3": "vitamin-b3",
    "Vitamin B6": "vitamin-b6",
    "Vitamin B12": "vitamin-b12",
    "Folate (B9)": "folate",
    "Vitamin C": "vitamin-c",
    "Vitamin D": "vitamin-d",
    "Vitamin E": "vitamin-e",
    "Vitamin K": "vitamin-k",
};