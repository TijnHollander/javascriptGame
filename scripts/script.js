let coins = 0;
let coinsPerSecond = 0;
const upgrades = [
    { id: "unit1", cost: 100, rate: 3, name: "Kip", count: 0 },
    { id: "unit2", cost: 1000, rate: 6, name: "Kat", count: 0 },
    { id: "unit3", cost: 3000, rate: 9, name: "Hond", count: 0 },
    { id: "unit4", cost: 10000, rate: 15, name: "Varken", count: 0 },
    { id: "unit5", cost: 100000, rate: 20, name: "Geit", count: 0 },
    { id: "unit6", cost: 1000000, rate: 50, name: "Schaap", count: 0 },
    { id: "unit7", cost: 6000000, rate: 120, name: "Paard", count: 0 },
    { id: "unit8", cost: 300000000, rate: 200, name: "Koe", count: 0 }
];
// Je kan coins "incheaten" door coins = 100000 te doen de 10 duizend kun je vervangen voor eigen aantal hoef je niet veel te klikken.
const counter = document.getElementById("counter");
const coinImg = document.getElementById("Coins");
const purchaseList = document.getElementById("purchaseList");

// Geluid toevoegen voeg bron toe stack etc.... 
const clickSound = new Audio("../images/clicks.mp3"); // Zorg ervoor dat dit bestand bestaat in je projectmap
// Geluid toevoegen on:click
coinImg.addEventListener("click", () => {
    coins = Math.floor(coins + 1);
    clickSound.currentTime = 0; // Reset geluid voor snelle herhaalde klikken
    clickSound.play();
    updateConttent();
});

function updateConttent() {
    counter.textContent = `Coins: ${Math.floor(coins)}`;
    upgrades.forEach(upgrade => {
        const button = document.getElementById(upgrade.id);
        button.textContent = `${upgrade.name} (Kosten: ${Math.floor(upgrade.cost)}) (+${upgrade.rate}/sec)`;
        button.disabled = coins < upgrade.cost;
    });
    updatePurchaseList();
}

function buyUpgrade(upgrade) {
    if (coins >= upgrade.cost) {
        coins = Math.floor(coins - upgrade.cost);
        coinsPerSecond += upgrade.rate;
        upgrade.cost *= 1.3; // NOTE VOOR SELF: Verhoog de prijs met 30% maakt game wat moeilijker misschien nog teveel?
        upgrade.count += 1;
        updateConttent();
    }
}

function updatePurchaseList() {
    purchaseList.innerHTML = "";
    upgrades.forEach(upgrade => {
        if (upgrade.count > 0) {
            const li = document.createElement("li");
            li.textContent = `${upgrade.count}x ${upgrade.name} (+${upgrade.count * upgrade.rate}/sec)`;
            purchaseList.appendChild(li);
        }
    });
}

upgrades.forEach(upgrade => {
    const button = document.getElementById(upgrade.id);
    button.addEventListener("click", () => buyUpgrade(upgrade));
    button.disabled = true;
    button.textContent = `${upgrade.name} (Kosten: ${Math.floor(upgrade.cost)}) (+${upgrade.rate}/sec)`;
});

setInterval(() => {
    coins = Math.floor(coins + coinsPerSecond);
    updateConttent();
}, 1000);

updateConttent();