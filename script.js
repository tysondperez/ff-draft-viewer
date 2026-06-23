// const LEAGUE_YEAR = 2025;
// const LEAGUE_ID = 10721;

async function fetchDraft(){
    try {
        const res = await fetch("/api/draft");
        const data = await res.json();

        console.log(data.meta);
        console.log(data.picks);
    }
    catch (error) {
        console.error(error);
    }
}

fetchDraft();
//setInterval(fetchDraft, 5000);