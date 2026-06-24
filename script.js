// const LEAGUE_YEAR = 2025;
// const LEAGUE_ID = 10721;

let initialized = false;

let meta = null;
let picks = [];

let franchiseMap = new Map();
let franchiseToBox = new Map();

async function init(){
    const franchiseData = await fetch("franchise-list.json").then(r => r.json());
    franchiseMap = new Map(franchiseData.franchise.map(f => [f.id, f]));
    
    await fetchDraft();
    const draftOrder = buildDraftOrder(picks.slice(0, 16));
    franchiseToBox = new Map();
    draftOrder.forEach((franchiseId, i) => {
        const boxIndex = i + 1;
        const ul = document.getElementById(`roster${boxIndex}`);

        const franchise = franchiseMap.get(franchiseId);

        const box = ul.closest(".box");
        if (box && franchise) {
            box.querySelector("h2").textContent = franchise.name;
        }

        franchiseToBox.set(franchiseId, ul);
    });
    
    initialized = true;
    loadDraft();
    setInterval(fetchDraft, 5000);
}

function buildDraftOrder(first16Picks) {
    const order = [];

    first16Picks.forEach((pick) => {
        if (!order.includes(pick.franchiseId)) {
            order.push(pick.franchiseId);
        }
    });
    return order;
}

function loadDraft() {
    
    if (!initialized && franchiseToBox.size === 0) return;
    for (const ul of franchiseToBox.values()) {
        ul.innerHTML = "";
    }

    for (const pick of picks) {
        const ul = franchiseToBox.get(pick.franchiseId);

        if (!ul || pick.playerName === "Unknown Player") continue;

        const li = document.createElement("li");

        const franchise = franchiseMap.get(pick.franchiseId);
        //const teamName = franchise ? franchise.name : pick.franchise;

        const position = (pick.position || "").toUpperCase();
        switch (position) {
            case "QB":
                li.classList.add("qb");
                break;

            case "RB":
                li.classList.add("rb");
                break;

            case "WR":
                li.classList.add("wr");
                break;

            case "TE":
                li.classList.add("te");
                break;

            case "DEF":
            case "DST":
                li.classList.add("def");
                break;

            case "K":
                li.classList.add("k");
                break;
        }

        li.textContent = `${pick.playerName} (${pick.position || ""})`;

        ul.appendChild(li);
    }
}

async function fetchDraft(){
    try {
        const res = await fetch("/api/draft");
        const data = await res.json();

        meta = data.meta;
        picks = data.picks;
    }
    catch (error) {
        console.error(error);
    }
    if (initialized){
        loadDraft();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    init();
});