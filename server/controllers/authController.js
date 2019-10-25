const bcrypt = require('bcryptjs');

module.exports = {
  login: async (req, res) => {
    const db = req.app.get('db');
    const {username, password} = req.body;

    let foundUser = await db.check_user(username);
    foundUser = foundUser[0];

    if(!foundUser){
      return res.status(401).send('Username does not exist.')
    }

    const authenticated = bcrypt.compareSync(password, foundUser.password);

    if(authenticated){
      delete foundUser.password;
      req.session.user = foundUser;
      res.status(202).send(req.session.user);
    } else {
      return res.status(401).send('Incorrect password.')
    }
  },
  register: async (req, res) => {
    const db = req.app.get('db');
    const {username, password, profilePic} = req.body;

    let foundUser = await db.check_user(username);
    foundUser = foundUser[0];

    if(foundUser){
      return res.status(409).send('Username already exists.')
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    let newUser = await db.register(username, hash, profilePic);
    newUser = newUser[0];

    delete newUser.password;
    req.session.user = newUser;
    res.status(201).send(req.session.user);
  },
  logout: (req, res) => {
    req.session.destroy();
    
    res.status(200).send(req.session);
  },
  getUser: (req, res) => {
    if(req.session.user){
      res.status(200).send(req.session.user);
    }

    res.sendStatus(200);
  },
}