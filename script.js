const LEAGUE_YEAR = 2025;
const LEAGUE_ID = 10721;

async function fetchDraft(){
    console.log("hello00");
    try {
        const response = await fetch("/api/draft");

        console.log("returned");
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const xmlText = await response.text();

        console.log(xmlText);

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(
            xmlText,
            "application/xml"
        );

        const picks = xmlDoc.getElementsByTagName("draftPick");

        console.log(`Found ${picks.length} picks`);
    }
    catch (error) {
        console.error(error);
    }
}

fetchDraft();
//setInterval(fetchDraft, 5000);