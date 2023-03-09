// Made 3-8-23 Wednesday
// Client side of site

// Score Multiplier
var multiplier = 1;
var points = 0

// Shop Cost
var multiplier_cost = 50
var ending_cost = 500

// The Different Hearts
const diffHearts = ["❤️", "❤", "🧡", "💛", "💚", "💙", "💜", "🤎", "🖤", "🤍", "❣", "💕", "💞", "💓", "💗", "💖", "💘", "💝"]

// When the mouse is over the heart it changes 
function change() {
    // Gets the heart element
    var heart = document.getElementById("heart")

    // Gets the width and length of the player's Screen
    var w = window.innerWidth;
    var h = window.innerHeight;

    // Gets a random number
    var x = getRandomNumber(220, w-220)
    var y = getRandomNumber(220, h-220)

    // Sets the Image/Heart to a random Location
    heart.style.position = "absolute";
    heart.style.top = y+"px"
    heart.style.left = x+"px"
    heart.innerHTML = getRandomText()

    // Updates the Player Points Display
    updatePlayerPoints("add")
}


// Gets a random heart
function getRandomText() {
    var textNum = Math.round(getRandomNumber(0, diffHearts.length-1))
    return diffHearts[textNum]
}

// This handles the password entered at the start
function submit() {
    var text = document.getElementById("password")

    // If password is ella
    if (text.value.toLowerCase() == "ella") {
        document.getElementById("entry").style.display = "none"
        document.getElementById("game").style.display = "block"
    } else {
        text.value = ""
        text.placeholder = "Wrong Password"
    }
}

// Shop Items Below

// Makes the shop button clickable
var shopBtn = document.getElementById("shopbtn")
var gameBtn = document.getElementById("shop_to_game")
var multBtn = document.getElementById("buy_multiplier")
var endBtn = document.getElementById("buy_end_game")

// Sets the Shop Button Text
multBtn.innerHTML = "Buy 2x Points<br><b>Cost "+multiplier_cost+" Points</b>"
endBtn.innerHTML = "End The Game<br><b>Cost "+ending_cost+" Points</b>"

shopBtn.addEventListener("click", function() {
    // Shows the shop and hides the game
    document.getElementById("game").style.display = "none"
    document.getElementById("shop").style.display = "block"
    updatePlayerPoints()

    // Sets the background to grey
    document.body.style.background = "grey"
})

// Goes back to the game from the shop
gameBtn.addEventListener("click", function() {
    // Shows the shop and hides the game
    document.getElementById("game").style.display = "block"
    document.getElementById("shop").style.display = "none"
    

    // Sets the background to white
    document.body.style.background = "white"
})

// Makes shop items usuable

// multiplier Button
multBtn.addEventListener("click", function() {
    // This checks if the player can buy a multiplier
    if (points - multiplier_cost*multiplier >= 0) {
        points -= multiplier_cost*multiplier
        multiplier += 1
        multBtn.innerHTML = "Buy "+multiplier+"x Points<br><b>Cost "+(multiplier_cost*multiplier)+" Points</b>"
        updatePlayerPoints()
        return
    }

    // If the player does not have enough it will say so
    invalidPoints(multBtn)
})

// This allows the player to end the game
endBtn.addEventListener("click", function() {
    // Checks if the player has enough points
    if (points-ending_cost >= 0) {
        points -= ending_cost
        document.getElementById("shop").style.display = "none"
        document.getElementById("end").style.display = "block"
        return
    }
    invalidPoints(endBtn)
})

function invalidPoints(button) {
    // Saves the text before changing it
    var oldText = button.innerHTML

    // Sets the button into a invalid_btn 
    button.className = "invalid_btn"
    button.innerHTML = "<b>Not Enough <br>Points</b>"

    // After 2 seconds it will make the button go back to normal
    setTimeout(() => { 
        button.innerHTML = oldText; 
        button.className = "button" 
    }, 1500);
}

// Univaersal Items

// function that returns a random number between a min and max
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

// Updates the display for the players points
function updatePlayerPoints(add = null) {
    if (add != null) {
        points += multiplier
    }

    // Updates the Score Text
    document.getElementById("score").innerHTML = "Score: "+points;
    document.getElementById("score_shop").innerHTML = "Score: "+points;
}
