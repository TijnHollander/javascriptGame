const settings = JSON.parse(localStorage.getItem("clickerGameSettings")) || {
    coins: 0,
    cps: 0,  // Coins per second
    units: {
        kip: 0,
        kat: 0
    }
};

// HTML-elementen ophalen
const coinCounter = document.getElementById("counter");
const coinImage = document.getElementById("Coins");
const unit1Button = document.getElementById("unit1");
const unit2Button = document.getElementById("unit2");
const purchaseList = document.getElementById("purchaseList");

// Prijzen en opbrengsten van eenheden
const units = {
    kip: { price: 50, cps: 3 },
    kat: { price: 100, cps: 6 }
};

// Update UI met huidige waarden
function updateUI() {
    coinCounter.textContent = `Coins: ${settings.coins}`;
    
    // Winkelknoppen tonen/verbergen
    unit1Button.classList.toggle("hidden", settings.coins < units.kip.price);
    unit2Button.classList.toggle("hidden", settings.coins < units.kat.price);
    
    // Aangekochte items bijwerken
    purchaseList.innerHTML = "";
    if (settings.units.kip > 0) {
        purchaseList.innerHTML += `<li>Kippen: ${settings.units.kip}</li>`;
    }
    if (settings.units.kat > 0) {
        purchaseList.innerHTML += `<li>Katten: ${settings.units.kat}</li>`;
    }

    // Opslaan naar localStorage
    localStorage.setItem("clickerGameSettings", JSON.stringify(settings));
}

// Event: Klikken op de munt
coinImage.addEventListener("click", () => {
    settings.coins += 1;
    updateUI();
});

// Event: Unit 1 (Kip) kopen
unit1Button.addEventListener("click", () => {
    if (settings.coins >= units.kip.price) {
        settings.coins -= units.kip.price;
        settings.units.kip += 1;
        settings.cps += units.kip.cps;
        updateUI();
    }
});

// Event: Unit 2 (Kat) kopen
unit2Button.addEventListener("click", () => {
    if (settings.coins >= units.kat.price) {
        settings.coins -= units.kat.price;
        settings.units.kat += 1;
        settings.cps += units.kat.cps;
        updateUI();
    }
});

// Automatische inkomsten per seconde
setInterval(() => {
    settings.coins += settings.cps;
    updateUI();
}, 1000);

// Start UI bij laden
updateUI();
