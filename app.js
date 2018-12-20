const deckOfCards = [{
    name: "Bulbasaur",
    damage: 60,
    imgFile: 'img/bulbsaur.jpg'
}, {
    name: "Caterpie",
    damage: 40
}, {
    name: "Charmander",
    damage: 60
}, {
    name: "Clefairy",
    damage: 50
}, {
    name: "Jigglypuff",
    damage: 60
}, {
    name: "Mankey",
    damage: 30
}, {
    name: "Meowth",
    damage: 60
}, {
    name: "Nidoran - female",
    damage: 60
}, {
    name: "Nidoran - male",
    damage: 50
}, {
    name: "Oddish",
    damage: 40
}, {
    name: "Pidgey",
    damage: 50
}, {
    name: "Pikachu",
    damage: 50
}, {
    name: "Poliwag",
    damage: 50
}, {
    name: "Psyduck",
    damage: 60
}, {
    name: "Rattata",
    damage: 30
}, {
    name: "Squirtle",
    damage: 60
}, {
    name: "Vulpix",
    damage: 50
}, {
    name: "Weedle",
    damage: 40
}]

const player1 = {
    score: 0,
    playerHand: [],
    cardsPlayed: [],
    updatePlayerScore() {
        console.log('score up')
        this.score += 1;
    }
}

const computer = {
    score: 0,
    computerHand: [],
    cardsPlayed: [],
    updateComputerScore() {
        console.log('computer score up');
        this.score += 1;
    }
}

let yourPlayedCard = []

let computerSelectedCard = []

let discard = []

let winner = []

let computerWins = []

let rounds = []

//secondary deck
let shuffledDeck = deckOfCards.map(function (obj) {
    return {
        name: obj.name,
        damage: obj.damage
    };
});

//pulled from secondary deck
let pickRandomCard = () => {
    let rndIdx = Math.floor(Math.random() * shuffledDeck.length);
    return shuffledDeck.splice(rndIdx, 1);

}

//dealer functionality

const dealToComputer = () => {
    while (computer.computerHand.length < 3) {
        computer.computerHand.push(pickRandomCard());
    }
    console.log(computer.computerHand);
}

const dealToPlayer = () => {
    while (player1.playerHand.length < 3) {
        player1.playerHand.push(pickRandomCard());
    }
    console.log(player1.playerHand);
}

//battle phase
let battlePhase = () => {
    if (yourPlayedCard[0][0][0].damage > computerSelectedCard[0][0][0].damage) {
        player1.updatePlayerScore()
        console.log('you won');
    } else if (yourPlayedCard[0][0][0].damage < computerSelectedCard[0][0][0].damage) {
        computer.updateComputerScore()
        console.log('you lost');
    } else if (yourPlayedCard[0][0][0].damage === computerSelectedCard[0][0][0].damage) {
        console.log("you tied");

    }
}


//computer played card
let computerPickedCard = () => {
    let rndIdx = Math.floor(Math.random() * computer.computerHand.length);
    return computer.computerHand.splice(rndIdx, 1);
}

const pushToComputer = () => {
    while (computerSelectedCard.length < 1) {
        computerSelectedCard.push(computerPickedCard());

        console.log(computerSelectedCard);
    }
}

//your played card
let selectedCard = () => {
    let rndIdx = Math.floor(Math.random() * player1.playerHand.length);
    return player1.playerHand.splice(rndIdx, 1);
}

const pushToSelected = () => {
    while (yourPlayedCard.length < 1) {
        yourPlayedCard.push(selectedCard());

        console.log(yourPlayedCard);
    }
}

//remove cards(objects) from yourPlayedCard and computerSelectedCard puts in discard
//pile

const removeUsedCards = () => {
    //to remove from array
    //yourPlayedCard.pop();
    //computerSelectedCard.pop();
    discard.push(yourPlayedCard);
    discard.push(computerSelectedCard);
    yourPlayedCard.pop();
    computerSelectedCard.pop();

}

let startGame = () => {

    for (let i = 0; i < 3; i++) {
        dealToComputer();
        dealToPlayer();
        pushToComputer();
        pushToSelected();
        battlePhase();
        removeUsedCards();
        gameEnd();
    }
    roundsWon();

}

//Rounds one
const roundsWon = () => {
    if (player1.score > computer.score) {
        console.log("you won the round");
        winner++
    } else if (computer.score > player1.score) {
        console.log("computer won the round");
        computerWins++
    }
    rounds++
    resetScore()
}

const resetScore = () => {
    player1.score = 0;
    computer.score = 0;
}

const gameEnd = () => {
    if (shuffledDeck <= 0) {
        console.log("game over, out of cards");

    }
}



//set initial state of menu