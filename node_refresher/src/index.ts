import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.post('/user', (req, res, next) => {
  res.send(`<h1>${req.body.username}</h1>`)
})

app.get('/', (req, res, next) => {
  res.send(
    '<form method="POST" action="/user"><input type="text" name="username" /><button type="submit">Create User</button></form>'
  );
});

app.listen(5000);
