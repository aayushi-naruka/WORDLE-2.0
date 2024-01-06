const fs = require('fs')
const path = require('path')
const moment = require('moment')

const checkWordController = async (req,res) => {
    const filePath = path.resolve(__dirname, '../../wordle.json');
    let finalObject
    await fs.readFile(filePath, 'utf-8', (err,response)=>{
          console.log(filePath)
          console.log(response)
          let date = moment().format("YYYY-MM-DD")
          let word = JSON.parse(response)[`${date}`]
          let guessedWord = req.body.word
          let {correctPositions, incorrectPositions} = wordleChecker(word,guessedWord)
          finalObject = {
            correctPositions, 
            incorrectPositions
          }
          res.status(200).send(finalObject)
    })

}

function wordleChecker(correctWord, guessedWord) {
    if (correctWord.length !== guessedWord.length) {
        throw new Error("The length of the correct word and guessed word must be the same.");
    }
    let correctPositions = [];
    let incorrectPositions = [];
    for (let i = 0; i < correctWord.length; i++) {
        if (guessedWord[i] === correctWord[i]) {
            correctPositions.push({ index: i, letter: guessedWord[i], present: true });
        } else {
            const correctIndex = correctWord.indexOf(guessedWord[i]);
            incorrectPositions.push({ index: i, letter: guessedWord[i], present: correctIndex !== -1, correctIndex });
        }
    }
    return { correctPositions, incorrectPositions };
}


module.exports={
    checkWordController,
}