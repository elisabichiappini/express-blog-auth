let posts = require("../db/posts.json");
const path = require("path");
const fs = require("fs");

const show = (req, res) => {
    res.format({
        html: () => {
            let html = '<ul>';
            posts.forEach(post => {
                html += `
            <li>
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <img width="200px" src=${`/${post.image}`}/>
                <h6>tags: ${post.tags}</h6>
                <a href="/${post.immagine}" target="_blank"> Visualizza immagine</a> 
                <a href="/posts/${post.slug}/download" target="_blank"> Scarica immagine </a>
            </li>`;
        });
            html += '</ul>';
            res.send(html);
        },
        json: () => {
            res.json({
                data: posts,
                count: posts.length
            })
        }
    })
};

const  addPost = (newPost) => {
    const filePath = path.join(process.cwd(), './db/posts.json');
    const newPosts = [...posts, newPost];
    fs.writeFileSync(filePath, JSON.stringify(newPosts));
    posts = newPosts;
}

const store = (req, res) => {
    const { title, content, tags} = req.body;
    //step 1 leggere il contenuto del body, ok router.use per il parser del body
    // 2 fare i controlli di validità del body, 
    ['title', 'content'].forEach(stringKey => {
        const value = req.body[stringKey];
        if(!value || typeof value !== 'string' || value.trim().replaceAll('/','').length === 0) {
            return res.status(400).send(`Il ${value} non è valido`);
        }
    });
    if(!tags || !Array.isArray(tags) || tags.length === 0) {
        return res.status(400).send(`Tags non è valido`);
    };

    const newPost = {
        title, 
        content, 
        tags
    }; 

    addPost(newPost);
    //SE non è valido segnaliamo errore 400, ALTR salviamo nel file.json il nuovo post
    res.format({
        html: () => {
            res.redirect('/posts');
        },
        json: () => {
            res.json({
                data: newPost
            })
        }
    })
};

const destroy = (req, res) => {
    const { postDaEliminare } = req;

    res.send(`cancello il post ${postDaEliminare.title}`);
};

module.exports = {
    show,
    store,
    destroy,
}