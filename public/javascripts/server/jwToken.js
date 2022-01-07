var jwt = require('jsonwebtoken');
var atob = require('atob');

const scretKeyToken = 'thisisscretkeyoftoken1';
const scretKeyFressToken = 'thisisscritkerofrefresstoken';
const tokenLife = 2*60; //2 min
const refressTokenlife = 7*27*60*60;//1week

function decodeTokenPromise(token){
  // decode token
  return new Promise(function(resolve, reject){

      //this way use callback
      // verifies secret and checks exp        
      jwt.verify(jwtoken, scretKey, (err, decoded) =>{      
        if (err) {
          //console.log('Failed to authenticate token.');
          //client.emit('loginByJwtResult', false);
          reject(err);
        } else {
          // if everything is good, save to request for use in other routes
          //client.emit('loginByJwtResult', decoded.username);
          resolve(decoded.username);
          
        }
      });
  
    });
}

 function decodeToken(token){
    // decode token
    if (token) {
        return JSON.parse(atob(token.split('.')[1]));

        /*this way use callback
        // verifies secret and checks exp        
        jwt.verify(jwtoken, scretKey, (err, decoded) =>{      
          if (err) {
            console.log('Failed to authenticate token.');
            client.emit('loginByJwtResult', false);
          } else {
            // if everything is good, save to request for use in other routes
            client.emit('loginByJwtResult', decoded.username);
            
          }
        });*/
    
      } else {
    
        // if there is no token
        // return an error
        return null;
      }
}

function decodeRefressToken(token){
  // decode token
  if (token) {
      return JSON.parse(atob(token.split('.')[1]));
    } else {
  
      // if there is no token
      // return an error
      return null;
    }
}

function encodeToken(usname){    
  const payload = {
      username: usname
    };

    var token = jwt.sign(payload, scretKeyToken, {
      expiresIn: tokenLife
    });

    return token;
}

function encodeRefressToken(usname){    
  const payload = {
      username: usname
    };

    var token = jwt.sign(payload, scretKeyFressToken, {
      expiresIn: refressTokenlife
    });

    return token;
}


module.exports.scretKeyToken = scretKeyToken;
module.exports.scretKeyFressToken = scretKeyFressToken;
module.exports.tokenLife = tokenLife;
module.exports.refressTokenlife = refressTokenlife;

module.exports.encodeToken = encodeToken;
module.exports.encodeRefressToken = encodeRefressToken;
module.exports.decodeToken = decodeToken;
module.exports.decodeRefressToken = decodeRefressToken;