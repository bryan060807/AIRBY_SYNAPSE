const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin (Uses your logged-in credentials in Studio)
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

// This function processes your specific AIBRY spreadsheet layout
async function seedAIBRY() {
  const fileContent = fs.readFileSync('aibry_discography.csv', 'utf8');
  const lines = fileContent.split('\n');

  console.log("Starting upload to Signal Core...");

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',');
    if (!row[0] || row[0].trim() === "" || row[0] === "Track Title") continue;

    // Logic: If it's the first section (Albums), put in 'projects'
    // If it's the second section (Singles), put in 'singles'
    if (i < 14) {
      await db.collection('discography_projects').add({
        title: row[0],
        release_date: row[1],
        genre: row[2],
        highlights: row[3],
        status: row[4],
        ai_ready: true
      });
      console.log(`Added Album: ${row[0]}`);
    } else {
      await db.collection('discography_singles').add({
        title: row[0],
        category: row[1],
        release_date: row[2],
        genre: row[3],
        ai_ready: true
      });
      console.log(`Added Single: ${row[0]}`);
    }
  }
  console.log("Success: AIBRY Discography is live in Firestore.");
}

seedAIBRY().catch(console.error);