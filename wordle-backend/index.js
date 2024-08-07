const express = require('express')
const app = express()
let gameRoutes = require("./src/routes/game")
var cron = require('node-cron');
const fs = require('fs');
var wordlist = require('wordlist-english'); 
const moment = require('moment')
const path = require('path')
var cors = require('cors')
var socket = require('socket.io')
var http = require('http')
let server = http.createServer(app);

app.use(cors({
  origin : '*'
}))
// Returns the path to the word list which is separated by `\n`
// const wordListPath = require('word-list');
 
// const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');

// io.on('connection',(socket)=>{
//   console.log('I am socket connection')
// })
var commonEnglishWords = wordlist['english/10'];
const fiveLetterWord = commonEnglishWords.filter((item)=> {return ([3,4,5,6,7].includes(item.length))})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/game", gameRoutes)

cron.schedule('0 59 11 * * *', async () => {
    await writeWordInFile();
});

const writeWordInFile = async() => {
  const date = moment().format("YYYY-MM-DD");
  let wordData = {};

  [3, 4, 5, 6, 7].forEach(length => {
      // Filter words of specific length
      const wordsOfLength = commonEnglishWords.filter(word => word.length === length);

      // Select a random word from filtered words
      const randomIndex = Math.floor(Math.random() * wordsOfLength.length);
      const randomWord = wordsOfLength[randomIndex];

      // Assign word to wordData object
      wordData[length] = randomWord;
  });
  let fileData = {}
  fileData[date] = wordData;
    let fileDataString = JSON.stringify(fileData)
    await fs.writeFile('wordle.json', fileDataString, 'utf8', (err) => {
        if (err) {
          console.error('Error writing JSON file:', err);
        } else {
          console.log('JSON file has been written successfully!');
        }
    });
}


let ser = app.listen(3200,()=>{
  console.log("Server started at port 3200")
  const filePath = path.resolve(__dirname, 'wordle.json');

    fs.readFile(filePath, 'utf-8', async(err,res)=>{
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
const io = socket(ser,{
  cors:'*'
})
io.on('connection',(socket)=>{
  socket.on('message',(data)=>{
     console.log('I am data',data)
  })
  socket.on('sendMessage', ({ roomId, message, username }) => {
    console.log(message, username)
    io.sockets.in(roomId).emit('receiveMessage',{message, username});
  });
  socket.on('joinRoom', ({roomId, username}) => {
    socket.join(roomId);
    console.log(`User ${username} joined room ${roomId}`);
});
})
