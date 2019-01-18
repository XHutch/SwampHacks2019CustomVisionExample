//set up info needed for API calls
let apiURL = "put_your_custom_vision_url_here";
let apiKey = "put_your_key_here";

//get references to HTML elements
let emoji = document.querySelector("#emoji");
let btn = document.querySelector(".btn");

//helper to update UI
//consider changing emojis to better reflect your model
function updateEmoji(tagName) {
    console.log(tagName);
    if (tagName === "fish") {
        emoji.textContent = "🐟";
    } else if (tagName === "stick_figure") {
        emoji.textContent = "🤺";
    } else if (tagName === "flower") {
        emoji.textContent = "🌺";
    } else {
        emoji.textContent = "🤷‍♀";
    }
}

//create & execute post request to call API 
async function getClassification(blob) {
    console.log();
    const response = await fetch( apiURL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/octet-stream',
        'Prediction-Key': apiKey,
        },
        body: blob
    });
    const data = await response.json();

    //update UI to show classication to user
    updateEmoji(data.predictions[0].tagName);
    
    return data;
}

//where the magic happens!
function analyzeDrawing() {

    //the canvas (cvs) is set up and referenced in the canvas.js file before we use it here
    cvs.toBlob( function(blob) {
        console.log(blob);
        let data = getClassification(blob);
    });
}

//connect magic to button
btn.addEventListener("click", analyzeDrawing);
