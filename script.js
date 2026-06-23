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

    console.log(picks.slice(0, 16));
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

    loadDraft();
    initialized = true;
    //setInterval(fetchDraft, 5000);
}

function buildDraftOrder(first16Picks) {
    const order = [];

    first16Picks.forEach((pick) => {
        if (!order.includes(pick.franchiseId)) {
            order.push(pick.franchiseId);
            console.log("pushed a franchise");
            console.log(pick.franchiseId);
        } else {
            console.log("didn't push a franchise");
            console.log(pick.franchiseId);
        }
    });

    console.log(order);
    return order;
}

function loadDraft(){

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

init();
