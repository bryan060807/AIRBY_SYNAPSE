const admin = require('firebase-admin');
const fs = require('fs');

admin.initializeApp();
const db = admin.firestore();

// Set "Today" as March 2, 2026
const today = new Date('2026-03-02');

async function seedAIBRY() {
  const fileContent = fs.readFileSync('aibry_discography.csv', 'utf8');
  const lines = fileContent.split('\n');

  console.log("Starting upload with Unified Status (Released/Unreleased)...");

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',');
    if (!row[0] || row[0].trim() === "" || row[0] === "Track Title") continue;

    // Determine status based on the release date column
    // For albums it's column 1, for singles it's column 2
    let dateString = (i < 14) ? row[1] : row[2];
    let releaseDate = new Date(dateString);
    let statusLabel = releaseDate <= today ? "Released" : "Unreleased";

    if (i < 14) {
      // Albums
      await db.collection('discography_projects').add({
        title: row[0],
        release_date: row[1],
        genre: row[2],
        highlights: row[3],
        status: statusLabel, 
        ai_ready: true
      });
      console.log(`Album: ${row[0]} -> [${statusLabel}]`);
    } else {
      // Singles
      await db.collection('discography_singles').add({
        title: row[0],
        category: row[1],
        release_date: row[2],
        genre: row[3],
        status: statusLabel,
        ai_ready: true
      });
      console.log(`Single: ${row[0]} -> [${statusLabel}]`);
    }
  }
  console.log("Success: All releases now labeled with consistent status.");
}

seedAIBRY().catch(console.error);