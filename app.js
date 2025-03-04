//configurazione dotenv
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const postsRouter = require("./routers/posts.js");

//middleware per public
app.use(express.static("./public"));

//rotta /
app.get("/", (req, res) => {
    res.send("<h1>Benvenuto nel mio sito di blog</h1>");
});

app.use("/posts", postsRouter)

app.listen(port, () => {
    console.log(`Server avviato su http://localhost:3000`);
})