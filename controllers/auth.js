const jwt = require("jsonwebtoken");
//con dotenv installato possiamo recuperare le nostre variabili di ambiente  dal file env
require('dotenv').config();

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
        return res.status(400).send('Inserire tutti i dati');
    }
    // const token = generateToken({id, username});
    res.end();
}

//middleware per verificare il token
const authenticateWithJWT = (req,res,next) => {

}

module.exports = {
    login,
    authenticateWithJWT
}