const express = require('express');
const app = express();

const port = 8000;

const authorsId = [];
const notAuthorsId = [];

app.get('/', (req, res) => {
    res.send('Authors API');
  });

for(let i = 0; i < 10; i ++) {
    authorsId + i;
}
if(authorsId == 1){
    app.get(`/authors/${authorsId}`, (req, res) => {
    res.send('Lawrence Nowell, UK');
  })
}else if(authorsId == 2){
    app.get(`/authors/${authorsId}`, (req, res) => {
        res.send('William Shakespeare, UK');
      })
}else if(authorsId == 3){
    app.get(`/authors/${authorsId}`, (req, res) => {
        res.send('Charles Dickens, US');
      })
}else if(authorsId == 4){
    app.get(`/authors/${authorsId}`, (req, res) => {
        res.send('Oscar Wilde, UK');
      })
}/*else{
    app.get("*", (req, res) => {
        res.send(`The author with the ID ${notAuthorsId} does not exist`);
}*/



  app.listen(port, () => {
  console.log('Server started on port: ' + port);
});

// JE SAIS QUE C4EST FAUX MAIS BON