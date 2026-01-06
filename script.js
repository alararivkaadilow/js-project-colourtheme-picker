
const hexcolour = document.getElementById("colourpicker");
const stylepicker = document.getElementById("styles");
const btnEl = document.getElementById("startbutton");
const displayp = document.getElementById("displayhex");
const copybutton = document.getElementById("copykleuren");
copybutton.disabled = true;

const btnSlaKleurOpBestaandeGebruiker = document.getElementById("slaitemsop2")

const btnReset = document.getElementById("btnreset")

const dropdownGebruikersEl = document.getElementById("gebruikers")
const toonGebruikersDataParagraafEL = document.getElementById("toongebruikersdata");
const btnHaalDataOp = document.getElementById("btnhaaldataop");
const nameInputEl = document.getElementById("usernameinput")
const kleurenschemainputnaamEl = document.getElementById("kleurensetnaam")
const btnSlaItemsOp = document.getElementById("slaitemsop");

let divElC1 = document.getElementById("colour1");
let divElC2 = document.getElementById("colour2");
let divElC3 = document.getElementById("colour3");
let divElC4 = document.getElementById("colour4");
let divElC5 = document.getElementById("colour5");


renderGebruikersLijst();

copybutton.addEventListener("click", function () {

    // Copy the text inside the text field
    navigator.clipboard.writeText(displayp.textContent);
    // Alert the copied text
    alert("Copied the text: " + displayp.textContent);
});

btnEl.addEventListener("click", fetchAndDisplayColourScheme);
btnSlaItemsOp.addEventListener("click", SlaGegevensOp);
btnHaalDataOp.addEventListener("click", haalMijnDataOpEnToonHetaanDeGebruiker);

btnSlaKleurOpBestaandeGebruiker.addEventListener("click", slaKleurenOpVoorBestaandeGebruiker)


btnReset.addEventListener("click", function () {

    console.log(localStorage.length);
    localStorage.clear();
    console.log(localStorage.length);

    renderGebruikersLijst();
});

function slaKleurenOpVoorBestaandeGebruiker() {

    let key = dropdownGebruikersEl.value
    let myObject = JSON.parse(localStorage.getItem(key));

    if (displayp.textContent === "") {
        alert("Kus eerst een set kleuren!");
    }
    else if (kleurenschemainputnaamEl.value === "") {
        alert("Vul eerst een kleuren schema naam in");
    }
    else {

        myObject.arrayofallschemeinhex.push(displayp.textContent);
        myObject.arrayofallcolourschemesnames.push(kleurenschemainputnaamEl.value)
    }

    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(myObject));

    haalMijnDataOpEnToonHetaanDeGebruiker();

}
function renderGebruikersLijst() {

    if (localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++) {

            let key = localStorage.key(i);
            let myObject = JSON.parse(localStorage.getItem(key))

            dropdownGebruikersEl.innerHTML += `<option value="${myObject.usernamestring}'s-wallet">${myObject.usernamestring}'s-wallet</option> `
            console.log(`${myObject.usernamestring}'s-wallet`)
        }
    }

}

function haalMijnDataOpEnToonHetaanDeGebruiker() {

    let setarrayofcolours = ""
    let mykey = dropdownGebruikersEl.value;
    console.log(mykey);
    let mynewObject = JSON.parse(localStorage.getItem(mykey));
    console.log(mynewObject)

    for (let i = 0; i < mynewObject.arrayofallschemeinhex.length; i++) {

        setarrayofcolours += `${i + 1} <br> Kleuren schema met de naam ${mynewObject.arrayofallcolourschemesnames[i]}:
            <br> ${mynewObject.arrayofallschemeinhex[i]} \n <br><br>`
    }

    toonGebruikersDataParagraafEL.innerHTML = `Welkom terug, ${mynewObject.usernamestring}!
    <br>
    Je hebt ${mynewObject.arrayofallschemeinhex.length} in je kleuren wallet: <br>
    <br> ${setarrayofcolours} `

}



function SlaGegevensOp() {

    let MyStorageobject =
    {
        usernamestring: "",

        colourschemenamestring: "",
        arrayofallcolourschemesnames: [],

        colourschemeinhexstring: "",
        arrayofallschemeinhex: [],

        TijdVanOpslag: Date.now()
    }

    if (nameInputEl.value === "") {
        alert("Vul a.u.b eerst je naam in.");
    }
    else if (kleurenschemainputnaamEl.value === "") {
        alert("Vul a.u.b eerst je naam voor je kleuren schema in.");
    }
    else {

        let arrayposition = 0;

        MyStorageobject.usernamestring = nameInputEl.value;
        MyStorageobject.colourschemenamestring = kleurenschemainputnaamEl.value;
        MyStorageobject.colourschemeinhexstring = displayp.textContent;
        MyStorageobject.arrayofallschemeinhex.push(MyStorageobject.colourschemeinhexstring)
        MyStorageobject.arrayofallcolourschemesnames.push(MyStorageobject.colourschemenamestring);

        console.log(`Hey ${MyStorageobject.usernamestring} !
    \n Je sloeg de kleuren schema op met de naam: ${MyStorageobject.colourschemenamestring}.
    \n Het schema bevat de volgende kleuren: \n  ${MyStorageobject.colourschemeinhexstring}
    \n  Je hebt nu ${MyStorageobject.arrayofallschemeinhex.length} in je smash kleuren wallet.
    \n Gebruiker en kleuren schema aangemaakt op ${MyStorageobject.TijdVanOpslag}
            `)

        let storagekey = `${MyStorageobject.usernamestring}'s-wallet`
        localStorage.setItem(storagekey, JSON.stringify(MyStorageobject));
        console.log(storagekey);
        console.log(localStorage.length);

        renderGebruikersLijst();
    }

};

function fetchAndDisplayColourScheme() {

    let stylepickerEl = stylepicker.value;
    let hexcolourvalue = hexcolour.value;
    let hexcolourvaluepicked = hexcolourvalue.slice(1);

    let arrayofcolours = fetch(`https://www.thecolorapi.com/scheme?hex=${hexcolourvaluepicked}&mode=${stylepickerEl}&format=json&count=6`)
        .then(response => response.json())
        .then(data => {

            let c1 = data.colors[0].hex.value;
            console.log(typeof c1)
            let c2 = data.colors[1].hex.value;
            let c3 = data.colors[2].hex.value;
            let c4 = data.colors[3].hex.value;
            let c5 = data.colors[4].hex.value;

            divElC1.style.backgroundColor = c1;
            divElC2.style.backgroundColor = c2;
            divElC3.style.backgroundColor = c3;
            divElC4.style.backgroundColor = c4;
            divElC5.style.backgroundColor = c5;
            console.log(c1);

            let displayEl = `${c1} || ${c2} || ${c3}  || ${c4} || ${c5}`
            displayp.textContent = displayEl;
            copybutton.disabled = false;

        })
};








