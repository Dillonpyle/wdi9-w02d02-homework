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

alert('click on deck to start game');
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

let rounds = 1

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
    return shuffledDeck.splice(rndIdx, 1)[0];

}

//dealer functionality

const dealToComputer = () => {
    while (computer.computerHand.length < 3) {
        computer.computerHand.push(pickRandomCard())[0];
    }
    console.log(computer.computerHand);
}

const dealToPlayer = () => {
    while (player1.playerHand.length < 3) {
        player1.playerHand.push(pickRandomCard())[0];
    }
    console.log(player1.playerHand);
}

//battle phase
let battlePhase = () => {
    if (yourPlayedCard[0].damage > computerSelectedCard[0].damage) {
        player1.updatePlayerScore()
        alert('you won');
    } else if (yourPlayedCard[0].damage < computerSelectedCard[0].damage) {
        computer.updateComputerScore()
        alert('you lost');
    } else if (yourPlayedCard[0].damage === computerSelectedCard[0].damage) {
        alert("you tied");
    }

    discard.push(yourPlayedCard)[0];
    discard.push(computerSelectedCard)[0];
    yourPlayedCard.pop();
    computerSelectedCard.pop();
    $(".scoreBoard").text(`Your Score :${player1.score} Computer Score :${computer.score}`);
}


//computer played card
let computerPickedCard = () => {
    let rndIdx = Math.floor(Math.random() * computer.computerHand.length);
    return computer.computerHand.splice(rndIdx, 1)[0];
}

const pushToComputer = () => {
    while (computerSelectedCard.length < 1) {
        computerSelectedCard.push(computerPickedCard())[0];

        console.log(computerSelectedCard);
    }
}

let startGame = () => {

    dealToComputer();
    dealToPlayer();
    pushToComputer();

    //gameEnd();
    //roundsWon();
}

//Rounds one
const roundsWon = () => {
    if (player1.score > computer.score) {
        alert("you won the round");
        winner++
    } else if (computer.score > player1.score) {
        alert("computer won the round");
        computerWins++
    }
    rounds++
    $(".roundsWon").text(`current round is :${rounds} Rounds Won :${winner} Computers wins :${computerWins}`);
    resetScore()
}

const resetScore = () => {
    player1.score = 0;
    computer.score = 0;
}

const gameEnd = () => {
    if (shuffledDeck <= 0) {
        alert("game over, out of cards");

    }
}

const playedCardHistory = () => {
    if (discard.length % 6 === 0 && discard.length % 12 !== 0) {
        player1.playerHand.pop()
        player1.playerHand.pop()
        player1.playerHand.pop()
        dealToComputer()
        dealToPlayer()
        roundsWon()
        $(".playerCard1").text(`${player1.playerHand[0].name} ${player1.playerHand[0].damage}`);
        $(".playerCard2").text(`${player1.playerHand[1].name} ${player1.playerHand[1].damage}`);
        $(".playerCard3").text(`${player1.playerHand[2].name} ${player1.playerHand[2].damage}`);
    } else if (discard.length % 12 === 0) {
        player1.playerHand.pop()
        player1.playerHand.pop()
        player1.playerHand.pop()
        dealToComputer()
        dealToPlayer()
        roundsWon()
        $(".playerCard1").text(`${player1.playerHand[0].name} ${player1.playerHand[0].damage}`);
        $(".playerCard2").text(`${player1.playerHand[1].name} ${player1.playerHand[1].damage}`);
        $(".playerCard3").text(`${player1.playerHand[2].name} ${player1.playerHand[2].damage}`);
    }
    gameEnd()
}

const cardSelected1 = () => {
    player1.playerHand.splice(0, 1, []);
}
const cardSelected2 = () => {
    player1.playerHand.splice(1, 1, []);
}

const cardSelected3 = () => {
    player1.playerHand.splice(2, 1, []);
}
// game functionality

$(".playerCard1").click(function () {
    const pushToSelected = () => {
        yourPlayedCard.push(player1.playerHand[0]);
        console.log(yourPlayedCard);
    }
    pushToSelected()
    alert(`you picked ${yourPlayedCard[0].name} & the computer picked ${computerSelectedCard[0].name}`);
    battlePhase()
    cardSelected1()
    playedCardHistory()
    pushToComputer()
});

$(".playerCard2").click(function () {
    const pushToSelected = () => {
        yourPlayedCard.push(player1.playerHand[1]);
        console.log(yourPlayedCard);
    }
    pushToSelected()
    alert(`you picked ${yourPlayedCard[0].name} & the computer picked ${computerSelectedCard[0].name}`);
    battlePhase()
    cardSelected2()
    playedCardHistory()
    pushToComputer()
});

$(".playerCard3").click(function () {
    const pushToSelected = () => {
        yourPlayedCard.push(player1.playerHand[2]);
        console.log(yourPlayedCard);
    }
    pushToSelected()
    alert(`you picked ${yourPlayedCard[0].name} & the computer picked ${computerSelectedCard[0].name}`);
    battlePhase()
    cardSelected3()
    playedCardHistory()
    pushToComputer()
});

$(".deck").click(function () {
    startGame();
    $(".playerCard1").text(`${player1.playerHand[0].name} ${player1.playerHand[0].damage}`);
    $(".playerCard2").text(`${player1.playerHand[1].name} ${player1.playerHand[1].damage}`);
    $(".playerCard3").text(`${player1.playerHand[2].name} ${player1.playerHand[2].damage}`);
    console.log("started the game");
});