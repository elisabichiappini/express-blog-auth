const jwt = require("jsonwebtoken");
//con dotenv installato possiamo recuperare le nostre variabili di ambiente  dal file env
require('dotenv').config();
const users = require('../db/users.json');


// funzione per generare i token
const generateToken = (payload, expiresIn = "10s") => {
    //creo token, gli passo il jwt con sign e payload + chiave segreta registrata in .env
    const token = jwt.sign(payload, process.env.JWT_AUTH, {expiresIn});
    return token;
}

//controller per generare il token 
const login = (req, res) => {
    const {username, password} = req.body;

    if(!username || !password) {
        return res.status(400).json({
            error:'Inserire tutti i dati'
        });
    }

    const user = users.find( u => u.username === username && u.password === password);
    if(!user) {
        return res.status(404).json({
            error:'Dati errati'
        });
    }
    const token = generateToken({ id: user.id, username});
    res.json({token});
}

//middleware per verificare il token
const authenticateWithJWT = (req,res,next) => {

}

module.exports = {
    login,
    authenticateWithJWT
}