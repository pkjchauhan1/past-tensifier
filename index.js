const http = require('http');
const port = 3000;
const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();
const nlp = require('compromise');
nlp.extend(require('compromise-sentences'));

app.use(express.static(path.join(__dirname, 'public')));

router.get('/past-tense?', (req, res) => {
    let doc = nlp(req.query.sentence);
    doc.sentences().toPastTense();
    const text = doc.text(); 
    console.log(text); 
    res.json({ text:text });
})

app.use('/', router);

http.createServer(app).listen(port, () =>{
    console.log(`Welcome to ${port}...`);
});

