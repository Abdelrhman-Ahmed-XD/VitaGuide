// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, increment, updateDoc, doc, serverTimestamp } from "firebase/firestore";

// Replace with your Firebase config from Firebase Console
// Using import.meta.env for Vite compatibility
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKey",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "vitagude.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "vitagude-demo",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "vitagude-demo.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abc123",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Generate unique session ID (stored in sessionStorage)
export function getSessionId() {
    let sessionId = sessionStorage.getItem("vitaguide_session_id");
    if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem("vitaguide_session_id", sessionId);
    }
    return sessionId;
}

// Track website visit (once per session)
export async function trackWebsiteVisit() {
    try {
        const sessionId = getSessionId();
        const hasTracked = sessionStorage.getItem("vitaguide_visit_tracked");

        if (hasTracked) return; // Only track once per session

        await addDoc(collection(db, "website_visits"), {
            sessionId: sessionId,
            timestamp: serverTimestamp(),
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            screenResolution: `${window.innerWidth}x${window.innerHeight}`,
            isMobile: /Mobile|Android|iPhone/.test(navigator.userAgent),
        });

        sessionStorage.setItem("vitaguide_visit_tracked", "true");
        console.log("✅ Website visit tracked");
    } catch (error) {
        console.error("❌ Error tracking visit:", error);
    }
}

// Save symptom checker results
export async function saveSymptomCheckResult(data) {
    try {
        const sessionId = getSessionId();

        // Convert nested arrays to objects for Firestore compatibility
        // [["Vitamin D", 45], ["B12", 32]] → [{name: "Vitamin D", score: 45}, ...]
        const resultsAsObjects = (data.results || []).map(([name, score]) => ({
            name,
            score,
        }));

        const docRef = await addDoc(collection(db, "symptom_checks"), {
            sessionId: sessionId,
            symptoms_selected: data.symptoms || [],
            results: resultsAsObjects, // Convert to objects
            symptom_count: data.symptoms?.length || 0,
            top_deficiency: resultsAsObjects[0]?.name || null,
            top_deficiency_score: resultsAsObjects[0]?.score || 0,
            timestamp: serverTimestamp(),
            device_type: /Mobile|Android|iPhone/.test(navigator.userAgent) ? "mobile" : "desktop",
            page_duration: data.pageDuration || 0, // seconds
        });

        console.log("✅ Symptom check saved:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("❌ Error saving symptom check:", error);
    }
}

// Get analytics data for dashboard
export async function getAnalyticsData() {
    try {
        // Get website visits
        const visitsSnapshot = await getDocs(collection(db, "website_visits"));
        const totalVisits = visitsSnapshot.size;

        // Get symptom checks
        const checksSnapshot = await getDocs(collection(db, "symptom_checks"));
        const totalChecks = checksSnapshot.size;

        // Process deficiency data
        const deficiencyCounts = {};
        const symptomCounts = {};
        const topDeficiencies = [];

        checksSnapshot.forEach(doc => {
            const data = doc.data();

            // Count deficiencies from results (now objects instead of nested arrays)
            data.results?.forEach((result) => {
                const deficiency = result.name || result[0]; // Handle both formats
                const score = result.score || result[1];

                if (!deficiencyCounts[deficiency]) {
                    deficiencyCounts[deficiency] = { count: 0, totalScore: 0 };
                }
                deficiencyCounts[deficiency].count += 1;
                deficiencyCounts[deficiency].totalScore += score;
            });

            // Count symptoms selected
            data.symptoms_selected?.forEach(symptom => {
                symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
            });
        });

        // Convert to sorted array with percentages
        const deficiencyArray = Object.entries(deficiencyCounts)
            .map(([name, data]) => ({
                name,
                count: data.count,
                percentage: totalChecks > 0 ? Math.round((data.count / totalChecks) * 100) : 0,
                avgScore: totalChecks > 0 ? Math.round(data.totalScore / data.count) : 0,
            }))
            .sort((a, b) => b.count - a.count);

        // Get top symptom
        const topSymptom = Object.entries(symptomCounts)
            .sort((a, b) => b[1] - a[1])[0];

        return {
            totalVisits,
            totalChecks,
            checkPercentage: totalVisits > 0 ? Math.round((totalChecks / totalVisits) * 100) : 0,
            topDeficiency: deficiencyArray[0] || null,
            topSymptom: topSymptom ? {
                symptom: topSymptom[0],
                count: topSymptom[1],
            } : null,
            deficiencies: deficiencyArray,
            allSymptoms: symptomCounts,
        };
    } catch (error) {
        console.error("❌ Error fetching analytics:", error);
        return {
            totalVisits: 0,
            totalChecks: 0,
            checkPercentage: 0,
            topDeficiency: null,
            topSymptom: null,
            deficiencies: [],
            allSymptoms: {},
        };
    }
}

// Get symptom name from ID
export function getSymptomLabel(symptomId) {
    const symptomMap = {
        night_blindness: "Night Blindness",
        dry_eyes: "Dry Eyes",
        blurry_vision: "Blurry Vision",
        light_sensitivity: "Light Sensitivity",
        fatigue: "Fatigue",
        weakness: "Muscle Weakness",
        depression: "Depression",
        memory_problems: "Memory Problems",
        irritability: "Irritability",
        poor_concentration: "Poor Concentration",
        loss_of_appetite: "Loss of Appetite",
        tingling_hands: "Tingling in Hands",
        balance_issues: "Balance Issues",
        muscle_cramps: "Muscle Cramps",
        burning_sensation: "Burning Sensation",
        seizures: "Seizures",
        bleeding_gums: "Bleeding Gums",
        mouth_sores: "Mouth Sores",
        swollen_tongue: "Swollen Tongue",
        skin_rash: "Skin Rash",
        dry_peeling_skin: "Dry Peeling Skin",
        easy_bruising: "Easy Bruising",
        hair_loss: "Hair Loss",
        petechiae: "Petechiae",
        bone_pain: "Bone Pain",
        joint_pain: "Joint Pain",
        frequent_fractures: "Frequent Fractures",
        frequent_infections: "Frequent Infections",
        poor_wound_healing: "Poor Wound Healing",
        anemia: "Anemia",
        heavy_bleeding: "Heavy Bleeding",
        heart_palpitations: "Heart Palpitations",
        shortness_of_breath: "Shortness of Breath",
        digestive_issues: "Digestive Issues",
        constipation: "Constipation",
    };

    return symptomMap[symptomId] || symptomId.replace(/_/g, " ");
}