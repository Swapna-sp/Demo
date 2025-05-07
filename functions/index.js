const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();
const db = admin.firestore();

const VALID_API_KEY = "abc123secretkey789";
const PACKAGE_API_KEY = "dmcwebsite2025farefirst";

exports.submitLead = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const apiKey = req.headers["x-api-key"];
    if (apiKey !== VALID_API_KEY) {
      return res.status(401).json({ message: "Invalid API key" });
    }

    try {
      const { type, search, travelDate, pax, rooms, email } = req.body;

      await db.collection("travelSearches").add({
        type,
        search,
        travelDate,
        pax,
        children,
        rooms,
        email,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      return res.status(200).json({ message: "Data submitted successfully" });
    } catch (error) {
      console.error("Error saving lead:", error);
      return res.status(500).json({ message: "Server error" });
    }
  });
});





exports.getTravelPackages = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
      const apiKey = req.headers["x-api-key"];
      if (apiKey !== PACKAGE_API_KEY) {
        return res.status(401).json({ message: "Invalid API key" });
      }
  
      try {
        const snapshot = await admin.firestore().collection("packages").get();
        const packages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return res.status(200).json(packages);
      } catch (error) {
        console.error("Error fetching packages:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    });
  });