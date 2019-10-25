module.exports = {
  getPosts: (req, res) => {
    const db = req.app.get('db');

  },
  
  getPost: (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    
  },
  
  createPost: (req, res) => {
    const db = req.app.get('db');
    const {title, img, content, userId} = req.body;
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