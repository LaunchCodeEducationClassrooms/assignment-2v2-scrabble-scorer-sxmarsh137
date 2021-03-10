
const input = require('readline-sync');

let validLetter = [' ','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
let validVowel = ['a','e','i','o','u'];
let validConsonant = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z'];

function isValidInput(prompt, isValid, validElementsArray) {
    let userInput = input.question(prompt);
    while (!isValid(userInput, validElementsArray)) {
      console.log("Invalid input. Try again.");
      userInput = input.question(prompt);
    }
    return userInput;
}

// write a validator that ensures input is a vowel
let isAVowel = function(letter){
  if (validVowel.indexOf(letter.toLowerCase()) === -1) {
    return false;
  }
  return true;
}

// write a validator that ensures input is a letter
let isALetter = function(letter){
  if (validLetter.indexOf(letter.toLowerCase()) === -1) {
    return false;
  }
  return true;
}

// write a validator that ensures input is a consonant
let isAConsonant = function(letter){
  if (validConsonant.indexOf(letter.toLowerCase()) === -1) {
    return false;
  }
  return true;
}

let isAWord = function(word){
  for (i=0; i<word.length; i++) {
    if (validLetter.indexOf(word[i].toLowerCase()) === -1) {
      return false;
    }
  }
  return true;
}

let isAMember = function(member, validMembers) {
  if (validMembers.indexOf(member) === -1) {
    return false;
  }
  return true;
}

module.exports = {
  isValidInput: isValidInput,
  isALetter: isALetter,
  isAVowel: isAVowel,
  isAConsonant: isAConsonant,
  isAWord: isAWord,
  isAMember: isAMember
}