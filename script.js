
const hexcolour = document.getElementById("colourpicker");
const stylepicker = document.getElementById("styles");
const btnEl = document.getElementById("startbutton");
const displayp = document.getElementById("displayhex")
const copybutton = document.getElementById("copykleuren")
copybutton.disabled = true;

let divElC1 = document.getElementById("colour1");
let divElC2 = document.getElementById("colour2");
let divElC3 = document.getElementById("colour3");
let divElC4 = document.getElementById("colour4");
let divElC5 = document.getElementById("colour5");



copybutton.addEventListener("click", function () {

    // Copy the text inside the text field
    navigator.clipboard.writeText(displayp.textContent);
    // Alert the copied text
    alert("Copied the text: " + displayp.textContent);
});

btnEl.addEventListener("click", function () {

    let stylepickerEl = stylepicker.value;
    let hexcolourvalue = hexcolour.value;
    let hexcolourvaluepicked = hexcolourvalue.slice(1);


    let arrayofcolours = fetch(`https://www.thecolorapi.com/scheme?hex=${hexcolourvaluepicked}&mode=${stylepickerEl}&format=json&count=6`)
        .then(response => response.json())
        .then(data => {

            console.log(
                data.colors[0].hex.value,
                data.colors[1].hex.value,
                data.colors[2].hex.value,
                data.colors[3].hex.value,
                data.colors[4].hex.value);

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

});









