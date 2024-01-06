const express = require('express')
const app = express()
let gameRoutes = require("./src/routes/game")
var cron = require('node-cron');
const fs = require('fs');
var wordlist = require('wordlist-english'); 
const moment = require('moment')
const path = require('path')
let fileData
// Returns the path to the word list which is separated by `\n`
// const wordListPath = require('word-list');
 
// const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');
var commonEnglishWords = wordlist['english/10'];
const fiveLetterWord = commonEnglishWords.filter((item)=> {return item.length===5})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/game", gameRoutes)

cron.schedule('0 47 9 * * *', async () => {
    await writeWordInFile();
});

const writeWordInFile = async() => {
    var randomNumber = Math.random() * 500;
    var randomInteger = Math.floor(randomNumber);
    let date = moment().format("YYYY-MM-DD")
    fileData = {
        [date] : fiveLetterWord[randomInteger]
    }
    let fileDataString = JSON.stringify(fileData)
    await fs.writeFile('wordle.json', fileDataString, 'utf8', (err) => {
        if (err) {
          console.error('Error writing JSON file:', err);
        } else {
          console.log('JSON file has been written successfully!');
        }
    });
}


app.listen(3000,()=>{
  console.log("Server started at port 3000")
  const filePath = path.resolve(__dirname, 'wordle.json');

    fs.readFile(filePath, 'utf-8', async(err,res)=>{
          console.log(filePath)
          console.log(res)
          let data = JSON.parse(res)
          let date = moment().format("YYYY-MM-DD")
          let datesFromFile = Object.keys(data)
          if(!datesFromFile.includes(date)) {
            console.log("today word does not exist in file")
             await writeWordInFile();
          } else {
            console.log("todays word exist in file")
          }

    })
 
})