//global values.
// like user do not logout
var socket = io.connect("http://localhost:8888");
const imgPath = "/images/upload/";
const iconPath = "/images/default/";
const avatarPath = "/images/avatar/";
const groupAvatarPath = "/images/default/defaultGroupAvatar.jpg";

//define info off user array
var loginInfo = [];

//this value will change while user open other chat box
var boxChatOf = '';
//array of chatter
var myListChat = [];

//array of rooms
var myListRooms = [];

const loginOk = 'ok';

const onlineStatus =2;
const offlineStatus = 1;
const invalidResult = 'ko';
const validResult = 'ok';
const exitsFriend = 'exits';
const loginInvalidUsername = '0';
const loginInvalidPassword = '1';
const maxUsernameLength = 20;


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

var friendInAlert = "";
//do not use yet ----->
var singleAlertType = 0;
const alertFriendStatus = 1;
const alertAddFriendRequest = 2;
const alertFriendMessage = 3;
const alertGroupMessage = 4;
const alertFriendCall = 5;
const alertGroupCall = 6;
//<-------------

//define actions in alert
const actAddFriend = 0;
const actMessageUser = 1;
const actMessageGroup = 2;
const actCallUser = 3;
const actCallGroup = 1;
const alertContents = ['',
  ' wana be your friend',
  '',
  ' messaed to you',
  ' messaged to group ',
  ' is calling you',
  ' is calling group '
]
const actAddFriendContent = " wana be your friend";
var myAlertList = [];

//call answers
const callUserOk = 0;
const callUserBusy =1;
const callUserCancel =2;


function getStatusIcon(status){
    if(status == onlineStatus){
      return iconPath + "onlineIcon.png";
    } else{    
      return iconPath + "offlineIcon.png";
    }
  }
  
  function getStatusChatter(usname){  
    //if(myListChat.length){        
        
      for( var k = 0; k < myListChat.length; k++){
        var aChar = myListChat[k].slice();
        alert(aChar);
        if(aChar[0] == usname){   
            
          return aChar[1];//2: online or 1: offline 
          
        }else{
            return 0; //new chater;
         }
      }
   // }
   // return 0; //new chater is ther first chater. no!!! alway has chatbot
  }
  
  function getFolderView(name){
    var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x' ,'y' ,'z'];
  
    var firstChar = name?.substr(0,1);
    var index = alphabet.indexOf(firstChar);
    if (0 <= index && index <= 7){
        return "atoh/";
    }
    else if (8 <= index && index <= 15){
        return "itop/";
    }
    else if (16 <= index && index <= 25){
        return "qtoz/";
    }
    else{
        return "other/";
    }
  }
  
  function getAvatarPathView(usname){
    if(usname?.length  > maxUsernameLength){
      return groupAvatarPath;
    }else{
      return avatarPath + getFolderView(usname) + usname + "_avatar.png"
    }
  }

    function getRoomInfo(roomID){    
      for (var i = 0; i<myListRooms.length ; i++){
        var temp = myListRooms[i].slice();
        if (temp[0] == roomID){
            return temp;
        }
      }
    }

    
    function getRelationship(username){          
      for (var i = 0; i<myListChat.length ; i++){
        var temp = myListChat[i].slice();
        if (temp[0] == username){
          
            return temp[2];
        }
      }
      return rlsStranger;
    }

//----------------------------------------------------------------------------------------------

