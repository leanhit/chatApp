var bcrypt = require('bcrypt');
var MongoClient = require('mongodb').MongoClient;
//const images = require('/images');


const baseUrl = 'mongodb://localhost:27017/';
const dbAllUser = 'dbAllUser';
const dbUser = "dbUser_";
const chatListCollection = "chatList";
const alertListCollection = "alertList";
const roomsCounterCollection = "roomscounter";


function addZero(number){
    if ( 0 <= number &&  number <=9){
        return "0" + number;
    }
    return number;
}

function getDay(){
    var today = new Date();
    return addZero(today.getDate()) +'-'+ addZero(today.getMonth()+1) +'-'+today.getFullYear();
}

function getTimeNow(){
    //var today = new Date;
    //return today;
    var today = new Date();
    return addZero(today.getHours()) + ":" + addZero(today.getMinutes()) + ":" + addZero(today.getSeconds());
}

function dateTimeNow(){ 
    return today = new Date();
   //return getDay() + ' ' + getTimeNow();
}

function checkAccsessDB(sender, giver){
    var length_1 = "";
    if (sender){
        sender.length;
    } else{
        return false;
}

var length_2 = "";
if(giver){
    giver.length;
} else{
    return false;
}

if ( (6 <= length_1 || length_1 <= 25) && (6 <= length_2 || length_2 <= 25 )) {       
    return true;       
} else {       
    return false;
}
}  

  //active with db function
function saveMessTxtRoom(username, collectionName, mess, sender){
    MongoClient.connect(baseUrl, { useNewUrlParser: true }, {useUnifiedTopology: true}, function(err, db){
        if (err) {
            throw err;
        } 
        else {            
            var dbo = db.db(dbUser + username);
            var newMess = {
                sender: sender,
                textMess: mess,
                created: dateTimeNow()
              };
            dbo.collection(collectionName).insertOne(newMess, function(err, res) {
                if (err) throw err;
                else{
                    console.log("1 document inserted to room: " + username +"//"+collectionName);
                    db.close();
                }
            });
                
        }
    });
}

function saveMessImageBase64Room(username, collectionName, mess, sender){
    MongoClient.connect(baseUrl, { useNewUrlParser: true }, {useUnifiedTopology: true}, function(err, db){
        if (err) {
            throw err;
        } 
        else {            
            var dbo = db.db(dbUser + username);
            var newMess = {
                sender: sender,
                imgBase64: mess,
                created: dateTimeNow()
              };
            dbo.collection(collectionName).insertOne(newMess, function(err, res) {
                if (err) throw err;
                else{
                    console.log("1 document inserted");
                    db.close();
                }
            });
                
        }
    });
}

function saveMessTxtSender(username, collectionName, mess){
    MongoClient.connect(baseUrl, { useNewUrlParser: true }, {useUnifiedTopology: true}, function(err, db){
        if (err) {
            throw err;
        } 
        else {            
            var dbo = db.db(dbUser + username);
            var newMess = {
                sender: username,
                textMess: mess,
                created: dateTimeNow()
              };
            dbo.collection(collectionName).insertOne(newMess, function(err, res) {
                if (err) throw err;
                else{
                    console.log("1 message was saved in db of " + username);
                    db.close();
                }
            });
                
        }
    });
}

function saveMessTxtGiver(username, collectionName, mess){
    MongoClient.connect(baseUrl, { useNewUrlParser: true }, {useUnifiedTopology: true}, function(err, db){
        if (err) {
            throw err;
        } 
        else {            
            var dbo = db.db(dbUser + username);
            var newMess = {
                sender: collectionName,
                textMess: mess,
                created: dateTimeNow()
              };
            dbo.collection(collectionName).insertOne(newMess, function(err, res) {
                if (err) throw err;
                else{
                    console.log("1 message was saved in db of " + username);
                    db.close();
                }
            });
                
        }
    });
}

function saveMessImageBase64Sender(username, collectionName, mess){
    MongoClient.connect(baseUrl, { useNewUrlParser: true }, {useUnifiedTopology: true}, function(err, db){
        if (err) {
            throw err;
        } 
        else {            
            var dbo = db.db(dbUser + username);
            var newMess = {
                sender: username,
                imgBase64: mess,
                created: dateTimeNow()
              };
            dbo.collection(collectionName).insertOne(newMess, function(err, res) {
                if (err) throw err;
                else{
                    console.log("1 img message was saved in db of " + username);
                    db.close();
                }
            });
                
        }
    });
}

function saveMessImageBase64Giver(username, collectionName, mess){
    MongoClient.connect(baseUrl, { useNewUrlParser: true }, {useUnifiedTopology: true}, function(err, db){
        if (err) {
            throw err;
        } 
        else {            
            var dbo = db.db(dbUser + username);
            var newMess = {
                sender: collectionName,
                imgBase64: mess,
                created: dateTimeNow()
              };
            dbo.collection(collectionName).insertOne(newMess, function(err, res) {
                if (err) throw err;
                else{
                    console.log("1 img message was saved in db of " + username);
                    db.close();
                }
            });
                
        }
    });
}

function createdDefaultUserDB(usName){
    MongoClient.connect(baseUrl, { useNewUrlParser: true }, {useUnifiedTopology: true}, function(err, db){
        if (err) {
            throw err;
        } 
        else {            
            //creater db chat list
            var dbo = db.db(dbUser + usName);
            var newChater = {
                name: 'chatbot',
                created: dateTimeNow()
              };

            dbo.collection(chatListCollection).insertOne(newChater, function(err, res) {
                if (err) throw err;
                else{
                    console.log("user database created");
                    db.close();
                }
            });
                
        }
    });


}

function UpdateImgCollection(username, collectionName, img){
    var imgName = img[0];
    var image = img[1];
    MongoClient.connect(baseUrl, { useNewUrlParser: true }, {useUnifiedTopology: true}, function(err, db){
        if (err) {
            throw err;
        } 
        else {            
            var dbo = db.db(dbUser + username);
            var newImage = {
                imgName: imgName,
                imgBase64: image,
                created: dateTimeNow()
              };
            dbo.collection(collectionName).insertOne(newImage, function(err, res) {
                if (err) throw err;
                else{
                    console.log("1 document inserted");
                    db.close();
                }
            });
                
        }
    });


}

function updateInfomation(username, userInfo){
    
    const usn = userInfo[0].slice();//full name
    const firstName = usn[0];
    const lastName = usn[1];
    const psw = userInfo[1]; //password
    const email = userInfo[2]; //email
    const sex = userInfo[3]; //sexual
    const birthday = userInfo[4]; //birthday
    const nativeLand = userInfo[5];//where user was born
    const address = userInfo[6]// where user live


    
    MongoClient.connect(baseUrl,{ useNewUrlParser: true }, {useUnifiedTopology: true}, function(err, db){
        if (err) {
            throw err;
        } else {                       
            var dbo = db.db(dbAllUser);
            dbo.collection('users').findOneAndUpdate({username: username},  {$set: {
                "name":{
                    "firstName": firstName,
                    "lastName": lastName
                },
                "password": psw,
                "email": email,
                "sex": sex,
                "birthday": birthday,
                "nativeLand": nativeLand,
                "address": address         
            
                }},function(err, user){                  
                if (err) {
                    throw err;
                } else {
                    console.log("update user infomation complete!");
                    db.close();
                }
            });      
        } 
    });
      
}


const addToChatList = true;
const dellFromChatList = false;
const updateOderChatList = 'update';
function updateChatList(usname, chatter, addOrDel){
    MongoClient.connect(baseUrl,{ useNewUrlParser: true }, {useUnifiedTopology: true}, function(err, db){
        if (err) {
            throw err;
        } else {                 
            const dbName = dbUser + usname;      
            var dbo = db.db(dbName);
            switch(addOrDel){
                case addToChatList://insert        addOrDel = true                    
                    var newChater = {
                        name: chatter,
                        //lastRlsStatus: rlsStranger,
                        currentRlsStatus: rlsAddFriendRecive,
                        lastChat: dateTimeNow(),
                        created: dateTimeNow()
                    };
                    dbo.collection(chatListCollection).insertOne(newChater, function(err, res) {
                        if (err) throw err;
                        else{
                            console.log("1 document inserted");
                            db.close();
                        }
                    });
                break;

                case dellFromChatList: //delete addOrDel = fale
                dbo.collection(chatListCollection).deleteOne({name:chatter}, function(err, res) {
                    if (err) throw err;
                    else{
                        console.log("1 document deleted");
                        db.close();
                    }
                });     
        
                break;

                case updateOderChatList: //update last chat with this user
                    dbo.collection(chatListCollection).findOneAndUpdate({name:chatter},{$set: {lastChat: dateTimeNow()}} ,function(err, res) {
                        if (err) throw err;
                        else{
                            console.log("1 document updated");
                            db.close();
                        }
                    });  
                break;
                default:
            }
        }
    });
}          
//----------------------------------------------
function updateRoomMember(roomID, member, membersList){    
    var dbName = dbUser + member;
    MongoClient.connect(baseUrl, { useNewUrlParser: true }, function(err, db){        
      var dbo = db.db(dbName);
      
      dbo.collection(chatListCollection).findOneAndUpdate({name:roomID},{$set: {members: membersList}} ,function(err, res) {
        if (err) throw err;
        else{
            console.log("room " + roomID + " of "+ member + " updated");
            db.close();                       
        }
      });
    });  
   }

   
  function insertRoomToChatList(usname,roomInfo){
    var roomID = roomInfo[0];
    var roomName = roomInfo[1];
    var roomMembers =  roomInfo[2];
    
    MongoClient.connect(baseUrl,{ useNewUrlParser: true }, {useUnifiedTopology: true}, function(err, db){
      if (err) {
          throw err;
      } else { 
        const dbName = dbUser + usname;      
        var dbo = db.db(dbName); 
        
        //add room to chat list         
        var newChater = {
            name: roomID,
            roomName: roomName,
            members: roomMembers,
            lastChat: dateTimeNow(),
            created: dateTimeNow()
        };
        dbo.collection(chatListCollection).insertOne(newChater, function(err, res) {
            if (err) throw err;
            else{
                console.log("1 room inserted to " +usname+ " chatList");
                db.close();
            }
        });       
      }
    });
  }

  function updateRoomName(roomID, member, newRoomName){    
    var dbName = dbUser + member;
    MongoClient.connect(baseUrl, { useNewUrlParser: true }, function(err, db){        
      var dbo = db.db(dbName);
      
      dbo.collection(chatListCollection).findOneAndUpdate({name:roomID},{$set: {roomName: newRoomName}} ,function(err, res) {
        if (err) throw err;
        else{
            console.log("room " + roomID + " of "+ member + " updated");
            db.close();                       
        }
      });
    });  
   }

   //------------------------------------------------------------

//build relationship user-user

/**define relationship
 * send request add friend 
 * give request add friend
 * send message to friend
 * send message to unfriend
 * give message from friend
 * give message from strange
 *  */

const rlsStranger = 0;
const rlsLock = 1;
const rlsFriend = 2;
const rlsAddFriendRequest = 3;
const rlsAddFriendRecive = 4;
const rlsAddFriendWait = 5;
const rlsUnlock = 6;
const rlsUnfriend = 7;
const addFriendReject = false;
const addFriendAccept = true;
const addFriendCancel = 9;

function addNewFriendToChatList(usname, chatter, relationship){
    return new Promise(function(resolve, reject){
        MongoClient.connect(baseUrl,{ useNewUrlParser: true }, {useUnifiedTopology: true}, function(err, db){
            if (err) {
                reject(err);
            } else {                 
                const dbName = dbUser + usname;      
                var dbo = db.db(dbName);                            
                var newChater = {
                    name: chatter,
                    currentRlsStatus: relationship,
                    //lastRlsStatus: rlsStranger,
                    lastChat: dateTimeNow(),
                    created: dateTimeNow()
                };
                dbo.collection(chatListCollection).insertOne(newChater, function(err, res) {
                    if (err) reject(err);
                    else{
                        console.log("1 document inserted");
                        db.close();
                        resolve(newChater._id);
                    }
                });
                    

            }
        });
    });
}  

function changeRlsStatus(usname, chatter, newRlsStatus){
    return new Promise(function(resolve, reject){
        MongoClient.connect(baseUrl,{ useNewUrlParser: true }, {useUnifiedTopology: true}, function(err, db){
            if (err) {
                reject (err);
            } else {                 
                const dbName = dbUser + usname;      
                var dbo = db.db(dbName);
                dbo.collection(chatListCollection).findOneAndUpdate({name:chatter},{$set: {currentRlsStatus: newRlsStatus }} ,
                    function(err, res) {
                        if (err) reject (err);
                        else{
                            console.log("1 document updated");                            
                            //console.log(res); 
                            //console.log(res.value._id);   
                            //resolve(res.value._id);
                            if(res.value){
                                resolve(res.value._id);
                            }else{
                                resolve(null);
                                
                            }
                            db.close();
                        }
                }); 
                
            }
        });
    });
}   

module.exports.addNewFriendToChatList = addNewFriendToChatList;
module.exports.changeRlsStatus = changeRlsStatus;
module.exports.rlsStranger = rlsStranger;
module.exports.rlsLock = rlsLock;
module.exports.rlsUnlock = rlsUnlock;
module.exports.rlsFriend = rlsFriend;
module.exports.rlsUnfriend = rlsUnfriend;
module.exports.rlsAddFriendRequest = rlsAddFriendRequest;
module.exports.rlsAddFriendRecive = rlsAddFriendRecive;
module.exports.rlsAddFriendWait = rlsAddFriendWait;
module.exports.addFriendReject = addFriendReject;
module.exports.addFriendAccept = addFriendAccept;
module.exports.addFriendCancel = addFriendCancel;



//------------------------------------
//alert store

const alertIsNew = true;
const alertIsOld = false;
const alertAddnew = 1;
const deleteAlert = 2;
const updateAlert = 3;
//define actions in alert
const actAddFriend = 1;
const actAddFriendContent = " wana be your friend";

function updateAlertList(usname, commandType, contentID){
    //console.log(usname +"    " + commandType + "  " + contentID);
    MongoClient.connect(baseUrl,{ useNewUrlParser: true }, {useUnifiedTopology: true}, function(err, db){
        if (err) {
            throw err;
        } else {                 
            const dbName = dbUser + usname;      
            var dbo = db.db(dbName);
            switch(commandType){
                
                case deleteAlert: //delete commandType = 2
                    dbo.collection(alertListCollection).deleteOne({contentID: contentID}, function(err, res) {
                        if (err) throw err;
                        else{
                            console.log("1 alert of "+ usname +" deleted");
                            
                            db.close();
                        }
                    });     
        
                break;

                case updateAlert: //update alert status
                    dbo.collection(chatListCollection).findOneAndUpdate({contentID: contentID},{$set: {alertStatus: alertIsOld}} ,function(err, res) {
                        if (err) throw err;
                        else{
                            console.log("1 document updated");
                            db.close();
                        }
                    });  
                break;
                
                default:
            }
        }
    });
} 

function addNewAlert(usname, friendName, actionType, contentID){       
        MongoClient.connect(baseUrl,{ useNewUrlParser: true }, {useUnifiedTopology: true}, function(err, db){
            if (err) {
                throw (err);
            } else {                 
                const dbName = dbUser + usname;      
                var dbo = db.db(dbName);                 
                var newAlert = {
                    contentID: contentID,
                    actionUser: friendName,
                    actionType: actionType,
                    alertStatus: alertIsNew,
                    created: dateTimeNow()
                };
                dbo.collection(alertListCollection).insertOne(newAlert, function(err, res) {
                    if (err){
                        throw (err);
                    }else{
                        console.log("1 document inserted");
                        
                        db.close();
                        //resolve(newAlert._id);
                    }
                });                
            }
        });
    
} 

function getAlertList(username){
    return new Promise(function(resolve, reject){
        var myAlertList = [];
        MongoClient.connect(baseUrl, { useNewUrlParser: true }, {useUnifiedTopology: true}, function(err, db){
            if (err) {
                reject(err);
            } 
            else {
            const dbName = dbUser + username;
            const collectionName = "alertList";
            var dbo = db.db(dbName); 
            dbo.collection(collectionName).find({}).sort({"created":-1}).toArray( function(err, data){
                if (err) {
                    reject(err);
                } else {
                    if(data.length <=0){                    
                        //there are no alert
                        resolve("");
                    }else{                        
                        data.forEach(function(anAlert){      
                            //setup myChatList
                            var tempAlert = [];                            
                            tempAlert.push(anAlert.actionUser);
                            tempAlert.push(anAlert.actionType);
                            tempAlert.push(anAlert.created);
                            tempAlert.push(anAlert._id);
                            tempAlert.push(anAlert.contentID);
            
                            myAlertList.push(tempAlert);   
                        });    
                    }
                    //return chat list to client
                    resolve(myAlertList);
                }                
            });
            db.close();
            }
        });
    });
}

module.exports.alertIsNew = alertIsNew;
module.exports.alertIsOld = alertIsOld;
module.exports.alertAddnew = alertAddnew;
module.exports.deleteAlert = deleteAlert;
module.exports.updateAlert = updateAlert;

module.exports.actAddFriend = actAddFriend;
module.exports.actAddFriendContent = actAddFriendContent;


module.exports.addNewAlert = addNewAlert;
module.exports.updateAlertList = updateAlertList;
module.exports.getAlertList = getAlertList;





   //-------------------------------------------------------------
module.exports.updateRoomName = updateRoomName;  
module.exports.insertRoomToChatList = insertRoomToChatList;
module.exports.updateRoomMember = updateRoomMember;
module.exports.saveMessTxtRoom = saveMessTxtRoom;
module.exports.saveMessImageBase64Room = saveMessImageBase64Room;
module.exports.saveMessTxtSender = saveMessTxtSender;
module.exports.saveMessTxtGiver = saveMessTxtGiver;
module.exports.saveMessImageBase64Giver = saveMessImageBase64Giver;
module.exports.saveMessImageBase64Sender = saveMessImageBase64Sender;
module.exports.createdDefaultUserDB = createdDefaultUserDB;
module.exports.UpdateImgCollection = UpdateImgCollection;
module.exports.updateInfomation = updateInfomation;
module.exports.updateChatList = updateChatList;
module.exports.dbUser = dbUser;
module.exports.addToChatList = addToChatList;
module.exports.dellFromChatList = dellFromChatList;
module.exports.updateOderChatList = updateOderChatList;
module.exports.chatListCollection = chatListCollection;

module.exports.getDay = getDay;
module.exports.getTimeNow = getTimeNow;
module.exports.dateTimeNow = dateTimeNow;
module.exports.checkAccsessDB = checkAccsessDB;


//--------------new code find user ------------------
function getRlsStatus(myNickname, userNickname){    
    return new Promise( function(resolve, reject){
        MongoClient.connect(baseUrl,{ useNewUrlParser: true }, {useUnifiedTopology: true}, function(err, db){
            if (err) {
                reject( err);
            } else {                 
                const dbName = dbUser + userNickname;      
                var dbo = db.db(dbName);
                dbo.collection(chatListCollection).findOne({name:myNickname} ,function(err, user) {
                    if (err) reject(err);
                    else {
                        if (user == null) {  //can't find myName in chat list of userName           
                          resolve(rlsStranger);
                        } else {//find out
                          resolve(user.currentRlsStatus);
                        }
                    }       

                    db.close();
                }); 
                
            }
        });
    });
}


const userNotExits = true;
function checkExitsUser(myNickname, userNickname){    
    return new Promise( function(resolve, reject){
        MongoClient.connect(baseUrl,{ useNewUrlParser: true }, {useUnifiedTopology: true}, function(err, db){
            if (err) {
                reject( err);
            } else {                 
                const dbName = dbUser + myNickname;      
                var dbo = db.db(dbName);
                dbo.collection(chatListCollection).findOne({name:userNickname} ,function(err, user) {
                    if (err) reject(err);
                    else {
                        if (user == null) {  //can't find myName in chat list of userName           
                          resolve(userNotExits);
                        } else {//find out
                          resolve(user.currentRlsStatus);
                        }
                    }       

                    db.close();
                }); 
                
            }
        });
    });
}


module.exports.userNotExits = userNotExits;
module.exports.getRlsStatus = getRlsStatus;
module.exports.checkExitsUser = checkExitsUser;