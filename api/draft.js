import playerData from "../player-list.json" with { type: "json" };

const LEAGUE_YEAR = 2025;
const LEAGUE_ID = 10721;
const HOST = "www46";
// const LEAGUE_YEAR = 2026;
// const LEAGUE_ID = 33197;
// const HOST = "www45";

const playerMap = new Map(
    playerData.players.player.map(p => [p.id, p])
);

function extractDraftPicks(xml) {
    const pickRegex = /<draftPick\s+([^>]+?)\/>/g;

    const picks = [];
    let match;

    while ((match = pickRegex.exec(xml)) !== null) {
        const attrString = match[1];

        // parse attributes inside tag
        const attrs = {};
        const attrRegex = /(\w+)="(.*?)"/g;

        let attrMatch;
        while ((attrMatch = attrRegex.exec(attrString)) !== null) {
            attrs[attrMatch[1]] = attrMatch[2];
        }

        picks.push(attrs);
    }

    return picks;
}

function parseBool(val) {
    return val === "1";
}

export default async function handler(req, res) {
    try {
        const url =
            "https://"+HOST+".myfantasyleague.com/fflnetdynamic"+LEAGUE_YEAR+"/"+LEAGUE_ID+"_LEAGUE_draft_results.xml"

        const response = await fetch(url);

        if (!response.ok) {
            return res.status(response.status).json({
                error: `MFL error ${response.status}`
            });
        }

        const xmlText = await response.text();

        const timestampMatch = xmlText.match(/timestamp="(\d+)"/);

        const meta = {
            timestamp: timestampMatch ? Number(timestampMatch[1]) : null,
            paused: /paused="1"/.test(xmlText),
            resumed: /resumed="1"/.test(xmlText),
            over: /over="1"/.test(xmlText),
            stopped: /stopped="1"/.test(xmlText)
        };

        const rawPicks = extractDraftPicks(xmlText);

        const picks = rawPicks.map(pick => {
            const playerId = pick.player;

            const player = playerMap.get(playerId);

            return {
                round: Number(pick.round),
                pick: Number(pick.pick),
                playerId,
                playerName: player?.name || "Unknown Player",
                position: player?.position || null,
                nflTeam: player?.team || null,
                franchiseId: pick.franchise || null,
                timestamp: pick.timestamp ? Number(pick.timestamp) : null,
                comments: pick.comments || ""
            };
        });

        res.status(200).json({
            meta,
            picks
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: err.message
        });
    }
}