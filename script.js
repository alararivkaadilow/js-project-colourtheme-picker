
// INPUT ELEMENTEN


const hexcolour = document.getElementById("colourpicker");
const stylepicker = document.getElementById("styles");


const nameInputEl = document.getElementById("usernameinput")
const kleurenschemainputnaamEl = document.getElementById("kleurensetnaam")

//DISPLAY ELEMENTEN

const displayp = document.getElementById("displayhex");
const toonGebruikersDataParagraafEL = document.getElementById("toongebruikersdata");


//AL MIJN KNOPPEN

const btnSlaKleurOpBestaandeGebruiker = document.getElementById("slaitemsop2")
const btnReset = document.getElementById("btnreset")

const btnEl = document.getElementById("startbutton");

const btnHaalDataOp = document.getElementById("btnhaaldataop");

const dropdownGebruikersEl = document.getElementById("gebruikers")
const btnSlaItemsOp = document.getElementById("slaitemsop");

const copybutton = document.getElementById("copykleuren");
copybutton.disabled = true;

let divElC1 = document.getElementById("colour1");
let divElC2 = document.getElementById("colour2");
let divElC3 = document.getElementById("colour3");
let divElC4 = document.getElementById("colour4");
let divElC5 = document.getElementById("colour5");

let myArrayofDivColourDisplay = Array.from(document.getElementsByClassName("hexdisplaywindow")) // HIER SLA IK ALLE DIVS VOOR KLEUR SCHEMA IN OP, dit toont kleuren, maar slaat ze ook op....

renderGebruikersLijst();

// --------------- HIER ZIJN MIJN EVENTLISTENERS ------------------------------- //
// --------------- HIER ZIJN MIJN EVENTLISTENERS ------------------------------- //



copybutton.addEventListener("click", function () {
    // Copy the text inside the text field
    navigator.clipboard.writeText(displayp.textContent);
    // Alert the copied text
    alert("Copied the text: " + displayp.textContent);
});

btnEl.addEventListener("click", fetchAndDisplayColourSchemeFromApi);
btnSlaItemsOp.addEventListener("click", SlaGegevensOpInLocaleStorage);
btnHaalDataOp.addEventListener("click", haalMijnDataOpEnToonHetaanDeGebruiker);

btnSlaKleurOpBestaandeGebruiker.addEventListener("click", slaKleurenOpVoorBestaandeGebruiker)

btnReset.addEventListener("click", function () {

    console.log(localStorage.length);
    localStorage.clear();
    console.log(localStorage.length);

    renderGebruikersLijst();
});


// --------------- HIER ZIJN MIJN FUNCTIES------------------- //
// --------------- HIER ZIJN MIJN FUNCTIES------------------- //


function slaKleurenOpVoorBestaandeGebruiker() {

    let key = dropdownGebruikersEl.value //haalt de key op(dit is de gebruikernaams)
    let myObject = JSON.parse(localStorage.getItem(key)); //nu heb ik het object

    if (displayp.textContent === "") {
        alert("Kus eerst een set kleuren!");
    }
    else if (kleurenschemainputnaamEl.value === "") {
        alert("Vul eerst een kleuren schema naam in");
    }
    else {


        myObject.colourschemeinhexarray.clear
        matchMedia.colourschemeinhexarray
        myObject.arrayofallschemeinhex.push(displayp.textContent);
        myObject.arrayofallcolourschemesnames.push(kleurenschemainputnaamEl.value)
    }

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

function haalMijnDataOpEnToonHetaanDeGebruiker() { // DIT HAALT DE DATA DAT IS OPGESLAGEN IN DE LOCAL STORAGE OP EN TOONT HET AAN DE GEBRUIKER

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



function SlaGegevensOpInLocaleStorage() {  // DIT SLAAT DE GEBRUIKERS GEGEVENS OP EN KLEURENSCHEMA OP IN EEN JSON OBJECT IN DE LOCALE STORAGE DATABASE

    let MyStorageobject =
    {
        usernamestring: "",

        colourSchemeNameString: "", // Naam dat de gebruiker geeft aan  de kleuren schema
        arrayOfAllColourSchemesNames: [], // Een array van alle namen van kleurenschemas

        colourSchemeInHexArray: [], //Dit is een array met 9 hex codes
        arrayOfAllColourSchemes: [], // Dit is een array van arrays 

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
        MyStorageobject.colourSchemeNameString = kleurenschemainputnaamEl.value;

        MyStorageobject.colourSchemeInHexArray

        MyStorageobject.arrayOfAllColourSchemes.push(MyStorageobject.colourSchemeInHexArray);

        MyStorageobject.arrayOfAllColourSchemes.push(MyStorageobject.colourschemeinhexstring)


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

function fetchAndDisplayColourSchemeFromApi() { // DIT IS MIJN FETCH METHODE HIER HAAL IK DE DATA OP VAN DE API< WANNEER GEBRUIKER KLEUR KIEST

    let stylepickerEl = stylepicker.value;
    let hexcolourvalue = hexcolour.value;
    let hexcolourvaluepicked = hexcolourvalue.slice(1);

    let hexdisplaytextfragment = ''
    let hexdisplaytextfull = ''

    let arrayofcolours = fetch(`https://www.thecolorapi.com/scheme?hex=${hexcolourvaluepicked}&mode=${stylepickerEl}&format=json&count=6`)
        .then(response => response.json())
        .then(data => {

            console.log(`Items in de kleuren array van de api ${data.colors.length}`)
            console.log(`Items in mijn div collectie ${myArrayofDivColourDisplay.length}`)

            let arrayofcolorstemp = []

            for (let i = 0; i < data.colors.length; i++) {

                myArrayofDivColourDisplay[i].style.backgroundColor = data.colors[i].hex.value;
                hexdisplaytextfragment = `|${data.colors[i].hex.value} `
                hexdisplaytextfull += hexdisplaytextfragment

            }
            console.log(`Items in de array die maak als test en de data van api in plaats ${arrayofcolours.length}`)
            console.log(`Display text die ik maak van strings ${hexdisplaytextfull}`)
            console.log(`Kleur van de picked getrimd : ${hexcolourvaluepicked}`)
            displayp.textContent = hexdisplaytextfull;
            copybutton.disabled = false;


            // let c1 = data.colors[0].hex.value;
            // let c2 = data.colors[1].hex.value;
            // let c3 = data.colors[2].hex.value;
            // let c4 = data.colors[3].hex.value;
            // let c5 = data.colors[4].hex.value;

            // divElC1.style.backgroundColor = c1;
            // divElC2.style.backgroundColor = c2;
            // divElC3.style.backgroundColor = c3;
            // divElC4.style.backgroundColor = c4;
            // divElC5.style.backgroundColor = c5;
            // console.log(c1);

            // let hexdisplaytext = `${c1} || ${c2} || ${c3}  || ${c4} || ${c5}` // toont de kleuren in hex codes in text 
            // displayp.textContent = hexdisplaytext;
            // copybutton.disabled = false;

        })


};








