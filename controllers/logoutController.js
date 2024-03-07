const User = require('../model/User');


const handleLogout = async (req, res) => {
    const cookies =  req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  
    const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({refreshToken}).exec();
  if(!foundUser) {
    res.clearCookie('jwt', {httpOnly : true, sameSite : 'None', secure : true});
    res.sendStatus(204);
  }
   // delete refresh token in db
    foundUser.refreshToken = '';
   const result = await foundUser.save();
     console.log(result);
     // delete cookie totally
   res.clearCookie('jwt', {httpOnly : true , sameSite : 'None', secure : true})
   // in production add secure : true for https
   res.sendStatus(204);

}

module.exports = { handleLogout }