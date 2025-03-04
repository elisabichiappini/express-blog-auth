//configurazione dotenv
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const postsRouter = require("./routers/posts.js");
const auth = require('./controllers/auth.js');

//middleware per public
app.use(express.static("./public"));

//la chiamata di login non deve essere protetta da authwithjwt perchè l'area di accesso alle rotte successive
app.post('/login', express.json(), auth.login);

//inserisco middleware auth
app.use(auth.authenticateWithJWT);

//rotta /
app.get("/", (req, res) => {
    res.send("<h1>Benvenuto nel mio sito di blog</h1>");
});

app.use("/posts", postsRouter);

app.listen(port, () => {
    console.log(`Server avviato su http://localhost:3000`);
})