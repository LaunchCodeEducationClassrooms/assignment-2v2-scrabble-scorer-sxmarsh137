// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");
const getValidInput = require("./inputValidator");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let newPointStructure;

//setup for future expansion of scrabbe-scorer to engage mulitple players
let players = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
//save all words that each player enters, into an array
let player1Words =[], player2Words = [], player3Words = [], player4Words = [];
let playersWords = [player1Words, player2Words, player3Words, player4Words];

let dashline = "-----------------------------------------------------------------------";
let ddashline = "=======================================================================";

/*-------------------------------------------------------------------------------------
Original Scrabble Scoring Function
--------------------------------------------------------------------------------------- */
function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //


/*--------------------------------------------------------------------------------------
Function initialPrompt. Prompts player for word and verifies that the word only contains letters. Added parameter player to get the number of the player if mulitple players; if possible future updates call for more than one player.
--------------------------------------------------------------------------------------------*/
function initialPrompt(player, words) {
  if (player===0){
    console.log("Let's play some scrabble!");
    let playerWord = getValidInput.isValidInput(`${players[player]}, Enter a word:  `, getValidInput.isAWord);

    playersWords[player].push(playerWord);

    console.log();
    console.log(dashline);
    console.log(`${players[player]}, Word:  ${playerWord}`);
    console.log(ddashline);

  }else {
    let playerWord = getValidInput.isValidInput(`${players[player]}, It's your turn! Enter a word:  `, getValidInput.isAWord);

    playersWords[player].push(playerWord);

    console.log();
    console.log(dashline);
    console.log(`${players[player]}, Word:  ${playerWord}`);
    console.log(ddashline);
  }
  return;
} //=========================================================================================


/*---------------------------------------------------------------------------------------------
Function simpleScore takes a word as a parameter and returns a numerical score.
Each letter within the word is worth 1 point
-----------------------------------------------------------------------------------------------*/
function simpleScore(word) {
	 return(word.length);
} //============================================================================================


/*---------------------------------------------------------------------------------------------
Function vowelBonusScore takes a word as a parameter and returns a score. Each vowel within
the word is worth 3 points, and each consonant is worth 1 point
----------------------------------------------------------------------------------------------*/
let vowelBonusScore = function(word) {
  word = word.toUpperCase();
	let letterPoints = 0, numOfVowels = 0; numOfConsonants = 0;
 
	for (let i = 0; i < word.length; i++) {
 	 	if (getValidInput.isAVowel(word[i])) {
      numOfVowels++;
		} else {
      numOfConsonants++;
    }
	}
	return letterPoints = numOfConsonants + 3*numOfVowels;
 }//=========================================================================================


 /*---------------------------------------------------------------------------------------
Function Transfors takes the old scrabble point structure object and transforms it to a new point structure creating 26 keys, one for each letter of alphabet
------------------------------------------------------------------------------------------- */
function transform(pointStructure) {
  let newKeys = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let newPointStructure = {
    ' ': '0'
  };

  for (i=0; i<newKeys.length; i++) {
    for (item in pointStructure) {
      if (pointStructure[item].includes(newKeys[i])) {
        newPointStructure[newKeys[i]] = item;
      }
    }
  }
  return newPointStructure;
} //===================================================================================
newPointStructure = transform(oldPointStructure);
console.log("New Scrabble Point Structure:");
console.log(dashline);
console.log(newPointStructure);
console.log(ddashline+'\n');


/*-----------------------------------------------------------------------------------------
New Scrabble Scoring Function
------------------------------------------------------------------------------------------*/
function scrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = 0;
  for (let i=0; i<word.length; i++) {
    letterPoints += Number(newPointStructure[word[i]]);
  }
  return letterPoints;
};//=======================================================================================


 /*-----------------------------------------------------------------------------------------
 Create object for each scorer type with function key to call scorer.
 Put all objects in an array
 -------------------------------------------------------------------------------------------*/
  const simpleScorer = {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scoreFunction: simpleScore   
  }

  const vowelBonusScorer = {
    name: 'Bonus Vowel',
    description: 'Vowels are 3 pts, consonants are 1 pt.',
    scoreFunction: vowelBonusScore 
  }

  const scrabbleScore = {
    name: 'Scrabble',
    description: 'The traditional scoring algorithm.',
    scoreFunction: scrabbleScorer /* replaced oldScrabbleScorer*/
  }
const scoringAlgorithms = [simpleScorer, vowelBonusScorer, scrabbleScore];
//========================================================================================

/*-------------------------------------------------------------------------------------------
Function scorerPrompt lets user to select which scoring algorithm to use to score their word. 
If the user enters 0, the program output a score using the simple scorer.
If the user enters 1, the vowel bonus scoring function is used.
If the user enters 2, the Scrabble scoring option is used.
scorerPrompt() returns the object the user has selected. 
------------------------------------------------------------------------------------------*/
function scorerPrompt(scoringMethods) {
  console.log("Which scoring algorithm would you like to use?\n\nScrabble Scoring Methods: ");
  console.log(dashline);

  for (let i=0; i<scoringMethods.length; i++) {
    console.log(scoringMethods[i].name.padEnd(13) + ":\t" + scoringMethods[i].description.padEnd(39) + ":\t" + "Enter " + i + " to use " + scoringMethods[i].name); 
  }
  console.log(ddashline);
  console.log();

  //While (!getValidInput.isAMember())
    //let userScorerSelection = input.question("Select scoring method:  ");
  let userScorerSelection = getValidInput.isValidInput("Select scoring method: ", getValidInput.isAMember, ['0','1','2']);

  return userScorerSelection;
} //=======================================================================================





/*---------------------------------------------------------------------------------------
Function runProgram.  Lets each player take a turn.  Only Player 1 can choose the scoring algorithm
-----------------------------------------------------------------------------------------*/
function runProgram() {
  
  let numOfPlayers = getValidInput.isValidInput("Enter number of players, 1 to 4: ", getValidInput.isAMember, ['1','2','3','4']);

  let userScoringSelection = 2;  // default scoring algorithm is scrableScorer

  for (let i=0; i<numOfPlayers; i++) {
    initialPrompt(i, playersWords);  // prompt player to enter word

    //show player the various scoring methods and ask player to chooose one.
    if (i===0) {
      userScoringSelection = (scorerPrompt(scoringAlgorithms));
    }
    console.log(dashline);
    
    if (userScoringSelection === '0') {
      console.log("Scoring Algorithm: ", scoringAlgorithms[0].name);
      console.log(scoringAlgorithms[0].name," Result is ", scoringAlgorithms[0].scoreFunction(playersWords[i].slice(playersWords[i].length-1).join()));
      console.log(ddashline+'\n');

    }else if (userScoringSelection === '1') {
      console.log("Scoring Algorithm: ", scoringAlgorithms[1].name); 
      console.log(scoringAlgorithms[1].name, " Score is ", scoringAlgorithms[1].scoreFunction(playersWords[i].slice(playersWords[i].length-1).join())); 
      console.log(ddashline+'\n');

    }else {
      console.log("Scoring Algorithm: ", scoringAlgorithms[2].name);
      console.log(scoringAlgorithms[2].name, " Score is ");
      console.log(scoringAlgorithms[2].scoreFunction(playersWords[i].slice(playersWords[i].length-1).join()));
      console.log(ddashline+'\n');
    }
  }
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //

module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   oldScrabbleScorer: oldScrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

