
// !GLOBALE

objectOpgehaaldvanLocalstorage = {}

//! INPUT ELEMENTEN

const hexcolour = document.getElementById("colourpicker"); // 
const stylepicker = document.getElementById("styles");

let randomNumForSelectIndex = Math.floor(Math.random() * 6);
console.log(randomNumForSelectIndex);

stylepicker.selectedIndex = randomNumForSelectIndex;
stylepicker.dispatchEvent(new Event("change"));

const nameInputEl = document.getElementById("usernameinput")
const kleurenschemainputnaamEl = document.getElementById("kleurensetnaam")

//!DISPLAY ELEMENTEN

const displayp = document.getElementById("displayhex");
const toonGebruikersDataParagraafEL = document.getElementById("toongebruikersdata");

let introTekstVoorGebruikerParagraafEl = document.getElementById("introtekstvoorgebruiker")



// introTekstVoorGebruikerParagraafEl.innerHTML += `<p class="deel1vanusertekst"> <br> <strong>Welkom terug,
//     <br>
//     Je hebt  in je kleuren wallet: </strong>
//     <br><br><hr></p> `




let divElC1 = document.getElementById("colour1");
let divElC2 = document.getElementById("colour2");
let divElC3 = document.getElementById("colour3");
let divElC4 = document.getElementById("colour4");
let divElC5 = document.getElementById("colour5");

//* HIER SLA IK ALLE DIVS VOOR KLEUR SCHEMA IN OP, dit toont kleuren, maar slaat ze ook op....
let myArrayofDivColourDisplay = Array.from(document.getElementsByClassName("hexdisplaywindow"))

//* HIER SLA IK ALLE SMALL DIVS VOOR KLEUR SCHEMA IN OP, dit toont kleuren, maar slaat ze ook op....
let arrayofDivColourDisplaySmall = Array.from(document.getElementsByClassName("hexdisplaywindowsmall"))

// !AL MIJN KNOPPEN

const btnSlaKleurOpBestaandeGebruiker = document.getElementById("slaitemsop2")
const btnReset = document.getElementById("btnreset")

const btnEl = document.getElementById("startbutton");

const btnHaalDataOp = document.getElementById("btnhaaldataop");

const dropdownGebruikersEl = document.getElementById("gebruikers")
const btnSlaItemsOp = document.getElementById("slaitemsop");

const copybutton = document.getElementById("copykleuren");


copybutton.disabled = true;

//! --------------- WINDOW LOADED METHODES ------------------------------- //
//!---------------  WINDOW LOADED METHODE------------------------------- //

const randomhexnummer = Math.floor(Math.random() * 0x100000);
console.log(`Voor stringmethode ${randomhexnummer} `)
let randomhexnummerstring = randomhexnummer.toString(16).padStart(6, "0");
console.log(`na methode ${randomhexnummerstring} `)

hexcolour.value = `#${randomhexnummerstring} `

//! --------------- HIER ZIJN MIJN EVENTLISTENERS ------------------------------- //
//!--------------- HIER ZIJN MIJN EVENTLISTENERS ------------------------------- //

copybutton.addEventListener("click", function () {
    //^ Kopieeer de hex schema voor de gebruiker

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

    toonGebruikersDataParagraafEL.innerHTML = ""

    renderGebruikersLijst();
});


//! --------------- RENDER FUNCTIES DIE IK DIRECT OPROEP!! ----------///

renderGebruikersLijst();


//! --------------- HIER ZIJN MIJN FUNCTIES------------------- //
//!--------------- HIER ZIJN MIJN FUNCTIES------------------- //


function fetchAndDisplayColourSchemeFromApi() { //! DIT IS MIJN FETCH METHODE 
    //! IK HAAL DE DATA OP VAN DE API WANNEER GEBRUIKER KLEUR KIEST, EN IK TOON HET IN DOM

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

                let counter = i + 1

                setTimeout(function () {

                    myArrayofDivColourDisplay[i].style.backgroundColor = data.colors[i].hex.value;
                }, 500 * counter)

                hexdisplaytextfragment = ` |${data.colors[i].hex.value} `
                hexdisplaytextfull += `${hexdisplaytextfragment}`

            }

            // console.log(`Items in de array die maak als test en de data van api in plaats ${arrayofcolours.length}`)
            // console.log(`Display text die ik maak van strings ${hexdisplaytextfull}`)
            // console.log(`Kleur van de picked getrimd : ${hexcolourvaluepicked}`)

            displayp.textContent = `${hexdisplaytextfull} |`;
            copybutton.disabled = false;

        })

};


function SlaGegevensOpInLocaleStorage() {  //!DIT SLAAT DE GEBRUIKERS GEGEVENS OP EN KLEURENSCHEMA OP IN EEN JSON OBJECT IN DE LOCALE STORAGE DATABASE

    let MyStorageobject =
    {
        usernamestring: "", //<  1 = eerste veld van mijn object 
        arrayOfAllColourSchemesNames: [], // 2 =  tweede veld van mijn object(Een array van alle namen van kleurenschemas)

        colourSchemeInHexArray: [], //3 = derde veld van mijn object (Dit is een array met 6 hex kleurcodes)
        arrayOfAllColourSchemes: [], // 4 = Vierde veld van mijn object (Dit is een array van mijn hex codes arrays)

        TijdVanOpslag: [] // 5  Vijfde veld van mijn object (de opgeslagen tijd)
    }

    if (nameInputEl.value === "") {
        alert("Vul a.u.b eerst je naam in.");
    }
    else if (kleurenschemainputnaamEl.value === "") {
        alert("Vul a.u.b eerst je naam voor je kleuren schema in.");
    }
    else {

        MyStorageobject.usernamestring = nameInputEl.value; //Veld 1
        MyStorageobject.arrayOfAllColourSchemesNames.push(kleurenschemainputnaamEl.value) // Veld 2

        for (let i = 0; i < myArrayofDivColourDisplay.length; i++) {
            MyStorageobject.colourSchemeInHexArray.push(myArrayofDivColourDisplay[i].style.backgroundColor)
        }

        MyStorageobject.arrayOfAllColourSchemes.push(MyStorageobject.colourSchemeInHexArray);
        MyStorageobject.TijdVanOpslag.push(Date.now());

        let arrayposition = MyStorageobject.arrayOfAllColourSchemesNames.length - 1;

        console.log(`Lengte van de array met kleuren opgehaald van mijn div collectie : ${MyStorageobject.colourSchemeInHexArray.length}`)

        console.log(`Hey ${MyStorageobject.usernamestring} !
    \n Je sloeg de kleuren schema op met de naam: ${MyStorageobject.arrayOfAllColourSchemesNames[arrayposition]}.
            \n  Je hebt nu ${MyStorageobject.arrayOfAllColourSchemes.length} in je smash kleuren wallet.
    \n Het schema bevat de volgende kleuren: \n  ${MyStorageobject.arrayOfAllColourSchemes[arrayposition]}

    \n Gebruiker en kleuren schema aangemaakt op ${MyStorageobject.TijdVanOpslag}
            `)


        let storagekey = `${MyStorageobject.usernamestring}'s-wallet`
        localStorage.setItem(storagekey, JSON.stringify(MyStorageobject));
        console.log(storagekey);
        console.log(localStorage.length);

        renderGebruikersLijst();
    }

};




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

        myObject.colourSchemeInHexArray = 0;
        myObject.colourSchemeInHexArray = [];

        for (let i = 0; i < myArrayofDivColourDisplay.length; i++) {
            myObject.colourSchemeInHexArray.push(myArrayofDivColourDisplay[i].style.backgroundColor)
        }

        myObject.arrayOfAllColourSchemes.push(myObject.colourSchemeInHexArray);
        myObject.TijdVanOpslag.push(Date.now());

        myObject.arrayOfAllColourSchemesNames.push(kleurenschemainputnaamEl.value)


        localStorage.setItem(key, JSON.stringify(myObject));
        haalMijnDataOpEnToonHetaanDeGebruiker();

    }


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

function haalMijnDataOpEnToonHetaanDeGebruiker() { //! DIT HAALT DE DATA DAT IS OPGESLAGEN IN DE LOCAL STORAGE OP EN TOONT HET AAN DE GEBRUIKER

    //CODE DIE WE NODIG HEBBEN DATA OP TE HALEN UIT LOCALE STORAGE

    let mykey = dropdownGebruikersEl.value;
    console.log(mykey);
    let mynewObject = JSON.parse(localStorage.getItem(mykey));
    console.log(mynewObject)

    objectOpgehaaldvanLocalstorage = mynewObject;



    // HIER SET ALLES OP 

    let myArrayofHTMLcollections = []
    let myArrayofDivVoorElkeKleur = []

    myArrayofHTMLcollections.length = 0
    myArrayofDivVoorElkeKleur.length = 0

    // LEEGMAKEN VAN VORIGE GEBRUIKER



    toonGebruikersDataParagraafEL.innerHTML = ""

    //* HIER MAAM IK HET BEGIN BERICHT VOOR DE GEBRUIKER...

    toonGebruikersDataParagraafEL.innerHTML += `<p class="deel1vanusertekst"> <br> <strong>Welkom terug, ${mynewObject.usernamestring}!
    <br>
    Je hebt ${mynewObject.arrayOfAllColourSchemesNames.length} in je kleuren wallet: </strong>
    <br><br><hr></p>
    `

    //* EERST MAKEN WIJ EEN COLLECTIE VAN DIVS VOOR DE KLEUR BOLLETJES

    for (let i = 0; i < mynewObject.arrayOfAllColourSchemes.length; i++) {

        let divItemEl = document.createElement("div")
        divItemEl.classList.add("divItemEl")
        divItemEl.id = `${mynewObject.arrayOfAllColourSchemesNames[i]}`
        console.log(divItemEl.id)
        toonGebruikersDataParagraafEL.appendChild(divItemEl)
        divItemEl.append(document.createElement("br" + "br"))

        if (i === 0) {
            divItemEl.innerHTML += `&#9734 Dit je je favoriete item &#9734 <br> &#9734 &#9734 &#9734 &#9734 &#9734  <br>`
        }

        divItemEl.innerHTML +=
            `
         

                
         <br> <b> <strong> Kleur ${i + 1} :  ${mynewObject.arrayOfAllColourSchemesNames[i]} -  </strong> </b> <br><br>

        

                 <button class="verplaatsitemUp" id="${mynewObject.arrayOfAllColourSchemesNames[i]}U"> <b><strong>PLAATS ITEM OMHOOG&#8679</strong></b> </button>
            <button class="verplaatsitemDown" id="${mynewObject.arrayOfAllColourSchemesNames[i]}D"> <b><strong>PLAATS ITEM OMLAAG &#8681</strong></b> </button>

                     <div class="hexdisplaywindowsmall${i}" id="colour1small"></div>
                    <div class="hexdisplaywindowsmall${i}" id="colour2small"></div>
                    <div class="hexdisplaywindowsmall${i}" id="colour3small"></div>
                    <div class="hexdisplaywindowsmall${i}" id="colour4small"></div>
                    <div class="hexdisplaywindowsmall${i}" id="colour5small"></div>
                      <div class="hexdisplaywindowsmall${i}" id="colour6small"></div>
                    <br>
                    <br>
                    `
        let htmlcollection = Array.from(document.getElementsByClassName("hexdisplaywindowsmall" + i))

        myArrayofHTMLcollections.push(htmlcollection)

        //* VOOR ELKE DIVJE DIE WE HEBBEN GEMAAKT GAAN WE NU EEN KLEUR GEVEN DIE IN EEN ARRAY ZIT

        for (let innerIndex = 0; innerIndex < htmlcollection.length; innerIndex++) {

            // let counter = innerIndex + 1
            // // setTimeout(function () {
            myArrayofHTMLcollections[i][innerIndex].style.backgroundColor = mynewObject.arrayOfAllColourSchemes[i][innerIndex]
            // }, 700 * counter)
        }
        divItemEl.innerHTML += ` 

            ${mynewObject.arrayOfAllColourSchemes[i].join("<br> ")} \n \n <br><br><hr>

            Aangemaakt op: ${new Date(mynewObject.TijdVanOpslag[i]).toLocaleString("nl-BE", { timeZone: "Europe/Brussels" })}
<br>
<br>
            `
        let OpgeslagenKleurenDivs = Array.from(document.getElementsByClassName("divItemElement"))

    }
}




toonGebruikersDataParagraafEL.addEventListener("click", function (e) {

    // let selecteditem = document.querySelector('input[type = "radio"]:checked').id

    let selecteditemWhole = e.target.id;
    console.log(selecteditemWhole)

    if (selecteditemWhole.endsWith("D")) {
        console.log(selecteditemWhole + "  D girl!!!")
        ItemOmlaagPlaatsen(selecteditemWhole)

    }
    else if (selecteditemWhole.endsWith("U")) {
        console.log(selecteditemWhole + "  U girl!!")
        ItemOmhoogPlaatsen(selecteditemWhole)
    }
    else {

    }

})



function ItemOmlaagPlaatsen(selecteditem) {

    let searchkey = selecteditem.slice(0, -1)

    if (objectOpgehaaldvanLocalstorage.arrayOfAllColourSchemesNames.includes(searchkey)) {

        console.log(`Key: ${searchkey}, was succesfully retreived. Methode om omlaag te plaatsen wordt geexcuteerd `)
        let indexnummer = objectOpgehaaldvanLocalstorage.arrayOfAllColourSchemesNames.indexOf(searchkey)
        console.log("Index of " + searchkey + " = " + indexnummer)


        if (indexnummer + 1 === objectOpgehaaldvanLocalstorage.arrayOfAllColourSchemes.length) {
            alert("Deze item kan niet lager worden geplaatst")
        }
        else {

            [objectOpgehaaldvanLocalstorage.arrayOfAllColourSchemesNames[indexnummer + 1],
            objectOpgehaaldvanLocalstorage.arrayOfAllColourSchemesNames[indexnummer]] =
                [objectOpgehaaldvanLocalstorage.arrayOfAllColourSchemesNames[indexnummer],
                objectOpgehaaldvanLocalstorage.arrayOfAllColourSchemesNames[indexnummer + 1]];

            [objectOpgehaaldvanLocalstorage.arrayOfAllColourSchemes[indexnummer + 1],
            objectOpgehaaldvanLocalstorage.arrayOfAllColourSchemes[indexnummer]] =
                [objectOpgehaaldvanLocalstorage.arrayOfAllColourSchemes[indexnummer],
                objectOpgehaaldvanLocalstorage.arrayOfAllColourSchemes[indexnummer + 1]];

            [objectOpgehaaldvanLocalstorage.TijdVanOpslag[indexnummer + 1],
            objectOpgehaaldvanLocalstorage.TijdVanOpslag[indexnummer]] =
                [objectOpgehaaldvanLocalstorage.TijdVanOpslag[indexnummer],
                objectOpgehaaldvanLocalstorage.TijdVanOpslag[indexnummer + 1]];

            let key = dropdownGebruikersEl.value //haalt de key op(dit is de gebruikernaams)
            localStorage.setItem(key, JSON.stringify(objectOpgehaaldvanLocalstorage));
            haalMijnDataOpEnToonHetaanDeGebruiker();
            console.log("Item is succesvol omlaag geplaatst")
        }
    }

}


function ItemOmhoogPlaatsen(selecteditem) {

    let searchkey = selecteditem.slice(0, -1)

    console.log(searchkey)

    if (objectOpgehaaldvanLocalstorage.arrayOfAllColourSchemesNames.includes(searchkey)) {

        console.log(`Key: ${searchkey}, was succesfully retreived. Methode om omhoog te plaatsen wordt geexcuteerd  `)
        let indexnummer = objectOpgehaaldvanLocalstorage.arrayOfAllColourSchemesNames.indexOf(searchkey)
        console.log("Index of " + searchkey + " = " + indexnummer)



        if (indexnummer > 0) {

            [objectOpgehaaldvanLocalstorage.arrayOfAllColourSchemesNames[indexnummer - 1],
            objectOpgehaaldvanLocalstorage.arrayOfAllColourSchemesNames[indexnummer]] =
                [objectOpgehaaldvanLocalstorage.arrayOfAllColourSchemesNames[indexnummer],
                objectOpgehaaldvanLocalstorage.arrayOfAllColourSchemesNames[indexnummer - 1]];

            [objectOpgehaaldvanLocalstorage.arrayOfAllColourSchemes[indexnummer - 1],
            objectOpgehaaldvanLocalstorage.arrayOfAllColourSchemes[indexnummer]] =
                [objectOpgehaaldvanLocalstorage.arrayOfAllColourSchemes[indexnummer],
                objectOpgehaaldvanLocalstorage.arrayOfAllColourSchemes[indexnummer - 1]];

            [objectOpgehaaldvanLocalstorage.TijdVanOpslag[indexnummer - 1],
            objectOpgehaaldvanLocalstorage.TijdVanOpslag[indexnummer]] =
                [objectOpgehaaldvanLocalstorage.TijdVanOpslag[indexnummer],
                objectOpgehaaldvanLocalstorage.TijdVanOpslag[indexnummer - 1]];

            let key = dropdownGebruikersEl.value //haalt de key op(dit is de gebruikernaams)
            localStorage.setItem(key, JSON.stringify(objectOpgehaaldvanLocalstorage));
            haalMijnDataOpEnToonHetaanDeGebruiker();

            console.log("Item is succesvol omlaag geplaatst")

        }
        else {
            alert("Dit item kan niet hoger geplaats worden")
        }
    }

}

