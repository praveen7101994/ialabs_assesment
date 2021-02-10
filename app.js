const express = require('express')
const app = express();
const PORT = process.env.PORT || 3001;
var bodyParser = require('body-parser')
const fs = require('fs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

// route        '/'
// method       'GET'
// description  'product of two inputs'

app.get('/', (req, res) => {
    const first = req.body.first;
    const second = req.body.second;

    console.log(first, second);
    const product = first * second;
    if(first == undefined || second == undefined){
        
        res.status(400).send({
            result: 'Provide both inputs'
        })
    } if((typeof first || typeof second) !== Number){
        res.status(400).send({
            resutl: 'Please provide only number'
        })
    } else {
        res.status(200).send({
            result: 'Okay',
            product
        })
    }
});

// Route        '/fnrc'
// Method       'GET'
// Desc         'Gives First Non-Repeating Character'
app.get('/fnrc', (req, res) => {
    const input = req.body.input;
    console.log(input)

    function firstNonRepeatedCharacter(string) {
        for (var i = 0; i < string.length; i++) {
          var c = string.charAt(i);
          if (string.indexOf(c) == i && string.indexOf(c, i + 1) == -1) {
            return c;
          }
        }
        return null;
      }
    
      if(input == undefined){
          res.status(400).send({
              resutl: 'Please provide string',
              FNRC: null
          })
      } else {
          const FNRC = firstNonRepeatedCharacter(input);
          res.status(200).send({
              result: 'Okay',
              FNRC
          })
      }
})



app.post('/upload', upload.single('upload'), (req, res) => {
    res.send('ok');
})


app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));