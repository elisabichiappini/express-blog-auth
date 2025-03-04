let posts = require("../db/posts.json");
const path = require("path");
const fs = require("fs");

const index = (req, res) => {
    res.format({
        html: () => {
            const post = posts.find(p => p.slug === req.params.slug);
            if(!post) {
                return res.status(404).send('<h1>non ci sono posts</h1>')
            }
            const html = `
            <div>
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <img width="200" src=${`/${post.image}`}/>
            <p>${posts.tags.map(t => `<span class="tag">#${t.toLowerCase().replaceAll(' ', '-')}</span>`).join(' ')}</p>
            </div>`;
            res.send(html);
        },
        json: () => {
            const post = posts.find(p => p.slug === req.params.slug);
            if(!post) {
                return res.status(404).json({
                    data: null,
                    error: 'Posts non trovato'
                })
            }
            res.json({
                data: post,
                count: posts.length,
                error: null
            })
        }
    })
};

const show = (req, res) => {
    res.format({
        html: () => {
            let html = `<ul>`;

        }
    })
}

const addPost = (newPost) => {
    const filePath = path.join(process.cwd(), './db/posts.json');
    const newPosts = [...posts, newPost];
    fs.writeFileSync(filePath, JSON.stringify(newPosts));
    posts = newPosts;
}

const store = (req, res) => {
    const { title, content, tags } = req.body;
    //step 1 leggere il contenuto del body, ok router.use per il parser del body
    // 2 fare i controlli di validità del body, 
    ['title', 'content'].forEach(stringKey => {
        const value = req.body[stringKey];
        if (!value || typeof value !== 'string' || value.trim().replaceAll('/', '').length === 0) {
            return res.status(400).send(`Il ${value} non è valido`);
        }
    });
    if (!tags || !Array.isArray(tags) || tags.length === 0) {
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
    index,
    show,
    store,
    destroy,
}