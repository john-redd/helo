module.exports = {
  getPosts: async (req, res) => {
    const db = req.app.get('db');

    const posts = await db.get_posts();

    res.status(200).send(posts);
  },
  
  getPost: async (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    
    let post = await db.get_post(id);
    post = post[0];

    res.status(200).send(post);
  },
  
  createPost: async (req, res) => {
    const db = req.app.get('db');
    const {title, img, content, userId} = req.body;

    db.create_post(title, img, content, userId);

    res.status(200).send('Post created.')
  },
  
  deletePost: (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
  },
  
  updatePost: (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    const {title, img, content, userId} = req.body;
  }
}