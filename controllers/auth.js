const jwt = require("jsonwebtoken");
//con dotenv installato possiamo recuperare le nostre variabili di ambiente  dal file env
require('dotenv').config();
const users = require('../db/users.json');


// funzione per generare i token
const generateToken = (payload, expiresIn = "1h") => {
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
const authenticateWithJWT = (req, res, next) => {
    //controlliamo se è passato il parametro del token
    const { authorization } = req.headers;
    if(!authorization) {
        return res.format({
            html: () => {
                return res.status(401).send('<p>non sei loggato</p>');
            },
            json: () => {
                return res.status(401).json({error: 'non sei loggato'})
            }
        })
    }
    // se authorization c'è prendiamo un pezzo della stringa che riceviamo
    const token = authorization.split(' ')[1];
    //controlliamo il token e gli passiamo la stringa, la parola segreta, e una callback function che viene eseguita alla fine della verifica, se la verifica va a buon fine il nostro payload che è il nostro user sarà buono, altrimentni il payload non c'è e avremo un errore
    jwt.verify(token, process.env.JWT_AUTH, (error, payload) => {
        if(error) {
            return res.status(403).send('token error');
        }
        //se c'è ci salviamo il req.user = payload
        req.user = payload;
        next();
    })
}

module.exports = {
    login,
    authenticateWithJWT
}