let rgbcolour = document.getElementById("colourpicker")

console.log(rgbcolour.value);



fetch("")
    .then(response => response.json())
    .then(data => console.log(data))