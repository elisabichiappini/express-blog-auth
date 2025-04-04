const express = require("express");
const router = express.Router();

//importiamo qui il controller perchè ci saranno due rotte con "/" in get e post
const postsController = require("../controllers/posts.js");


//importiamo il middleware postSlugExist
const postSlugExist = require('../middleware/postSlugExist.js');
const { authenticateAdmin } = require("../controllers/auth.js");

//settiamo il bodyparser, con extended true per leggere array e oggetti se no li legge come stringhe
router.use(express.urlencoded({extended: true}));

//rotta /posts = qui decidiamo la rotta e cosa andrà ad eseguire
router.get('/', postsController.index);
router.get('/:slug', postsController.show);

//importiamo il middleware verifica admin -----> rotte protette da admin
router.use(authenticateAdmin);

router.post('/', postsController.store);
router.delete('/:slug', postSlugExist, postsController.destroy);

//per esportazine
module.exports = router;