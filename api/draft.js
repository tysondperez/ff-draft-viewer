const LEAGUE_YEAR = 2025;
const LEAGUE_ID = 10721;
const HOST = "www46";

export default async function handler(req, res) {
    console.log("hello");
    try {
        const mflUrl =
            "https://"+HOST+".myfantasyleague.com/fflnetdynamic"+LEAGUE_YEAR+"/"+LEAGUE_ID+"_LEAGUE_draft_results.xml"

        const response = await fetch(mflUrl);

        if (!response.ok) {
            throw new Error(`MFL returned ${response.status}`);
        }

        const xml = await response.text();

        res.setHeader("Content-Type", "application/xml");
        res.status(200).send(xml);
    }
    catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
}