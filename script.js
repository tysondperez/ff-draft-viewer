const LEAGUE_YEAR = 2025;
const LEAGUE_ID = 10721;

function updateRosters(){
    fetch("http://www46.myfantasyleague.com/fflnetdynamic"+LEAGUE_YEAR+"/"+LEAGUE_ID+"_LEAGUE_draft_results.xml")
    .then(response => response.text())
    .then(xmlText => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        console.log(xmlDoc);
    })
    .catch(error => console.error("Error fetching XML:", error));
}

updateRosters();
//setInterval(updateRosters, 5000);