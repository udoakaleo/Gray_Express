const userDB = {
    users : require('../model/users.json'),
   setUsers : function (data) {this.users = data}
}
const path = require('path');
const fsPromises = require('fs').promises


const handleLogout = async (req, res) => {
    const cookies =  req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  
    const refreshToken = cookies.jwt;
  const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
  if(!foundUser) {
    res.clearCookie('jwt', {httpOnly : true, sameSite : 'None', secure : true});
    res.sendStatus(204);
  }
   // delete refresh token in db
  const otherUsers = userDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
  const currentUser = {...foundUser, refreshToken : ''};
  userDB.setUsers([...otherUsers, currentUser]);
   await fsPromises.writeFile(
    path.join(__dirname, '..', 'model', 'users.json'),
    JSON.stringify(userDB.users)
  );
     // delete cookie totally
   res.clearCookie('jwt', {httpOnly : true , sameSite : 'None', secure : true})
   // in production add secure : true for https
   res.sendStatus(204);

}

module.exports = { handleLogout }