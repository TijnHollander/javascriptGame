const settings = JSON.parse(localStorage.getItem("clickerGameSettings")) || {
    coins: 0,
    cps: 0,
    units: {
        kip: 0,
        kat: 0
    },
    multiplier: 1.1,
};

// HTML-elementen ophalen
const coinCounter = document.getElementById("counter");
const coinImage = document.getElementById("Coins");
const unit1Button = document.getElementById("unit1");
const unit2Button = document.getElementById("unit2");
const purchaseList = document.getElementById("purchaseList");

// Array van units (kan makkelijk worden uitgebreid)
const units = {
    kip: { price: 50, cps: 3 },
    kat: { price: 100, cps: 6 }
};

// UI updaten
function updateUI() {
    coinCounter.textContent = `Coins: ${settings.coins}`;

    // Knoppen activeren/deactiveren
    unit1Button.disabled = settings.coins < units.kip.price;
    unit2Button.disabled = settings.coins < units.kat.price;

    // Aankopen tonen
    purchaseList.innerHTML = "";
    if (settings.units.kip > 0) {
        purchaseList.innerHTML += `<li>Kippen: ${settings.units.kip} (⏫ ${units.kip.price.toFixed(0)} Coins)</li>`;
    }
    if (settings.units.kat > 0) {
        purchaseList.innerHTML += `<li>Katten: ${settings.units.kat} (⏫ ${units.kat.price.toFixed(0)} Coins)</li>`;
    }

    // Opslaan in localStorage
    localStorage.setItem("clickerGameSettings", JSON.stringify(settings));
}

// Op munt klikken
coinImage.addEventListener("click", () => {
    settings.coins += 1;
    updateUI();
});

// Kip kopen
unit1Button.addEventListener("click", () => {
    if (settings.coins >= units.kip.price) {
        settings.coins -= units.kip.price;
        settings.units.kip += 1;
        settings.cps += units.kip.cps;

        // Prijs x1.1 verhogen en afronden
        units.kip.price = Math.ceil(units.kip.price * 1.1);

        updateUI();
    }
});

// Kat kopen
unit2Button.addEventListener("click", () => {
    if (settings.coins >= units.kat.price) {
        settings.coins -= units.kat.price;
        settings.units.kat += 1;
        settings.cps += units.kat.cps;

        //fix multiplier
        units.kat.price * settings.multiplier
        console.log("test", settings.multiplier)


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
