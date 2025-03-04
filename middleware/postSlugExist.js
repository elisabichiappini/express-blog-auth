const posts = require('../db/posts.json');

module.exports = (req, res, next) => {
    //decostructuring di slug nella req params
    const { slug } = req.params;
    const sluggedPost = posts.find(p => p.slug === slug);

    if(!sluggedPost) {
        return res.status(404).send(`post con slug ${slug} non trovato`)
    }
    //salvo il post da eliminare della request
    req.postDaEliminare = sluggedPost;

    //scriverlo subito per chè va eseguito
    next();
}