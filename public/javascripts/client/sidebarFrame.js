function setupSidebarFrame(){
    document.getElementById("aSidebarMyName").textContent = socket.username;
    document.getElementById("imgSidebarMyAvatar").src = getAvatarPathView(socket.username);
  }

  function sidebarShowMenu(){
    document.getElementById("divSidebarMenu").style.display = "block";
    
    setTimeout(function(){ 
      document.getElementById("divSidebarMenu").style.display = "none"; 
    }, 4000);
  }

  function sidebarHideMenu(){
    document.getElementById("divSidebarMenu").style.display = "none";
  }


  function logoutClick() {
        
    var usernameCookie = "gruu-username";
    var passwordCookie = "gruu-password-" + loginInfo[0];

    setCookie(usernameCookie, "");
    setCookie(passwordCookie, "" );

  }
  
socket.on('getChatListResult', function(data){
    //clear myChatList
    myListChat.splice(0, myListChat.length);
  
    //copy data to myChatList
    myListChat = data.slice(0, data.length);

    clearTableChatList();
    createTableChatlist(myListChat);
});

socket.on('getRoomsListResult', function(data){
  //clear myChatList
  myListRooms.splice(0, myListRooms.length);

  //copy data to myChatList
  myListRooms = data.slice(0, data.length);
  
});

function clearTableChatList(){
  var chatlistView = document.getElementById("ulChatlistView");
    
  chatlistView.innerHTML = "";
}

//array store cell of name user . 
var listCellName = [];
//array store cell of user status
var listCellStatus = [];
function createTableChatlist(inputList) {
  
    var chatterNumber = inputList.length;
    var body = document.getElementById('ulChatlistView');
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '0');

    var tbdy = document.createElement('tbody');
    for (var i = 0; i < chatterNumber; i++) {
      
      //create row
      var tr = document.createElement('tr');
      const aChatter = inputList[i].slice();
      const usname = aChatter[0]; 

      //create status cell      ---------------------------------------  
      var td = document.createElement('td');
      //create status icon         
      var img = document.createElement('img');    
      var avaPath = getStatusIcon(aChatter[1]);    
      img.src= avaPath ;
      img.alt = avaPath;
      img.width = "15";
      td.appendChild(img);
      td.width = '15';
      //add cell to row
      tr.appendChild(td); 
      listCellStatus.push(img);  
              
      //create avatar cell -------------------------------------------------
      var td = document.createElement('td');

      var img = document.createElement('img');
      var avaPath = getAvatarPathView(aChatter[0]);
      img.src= avaPath ;
      // img.alt = avaPath;
      img.width = "30";
      img.height = "30";
      td.appendChild(img);
      td.width = '30';
      //add cell to row
      tr.appendChild(td); 

      //create username cell ---------------------------------------------
      var td = document.createElement('td');
      //td.style.width = "500px";              
      td.appendChild(document.createTextNode(usname)); 
      //catch event click user name in list
      td.addEventListener('click', clickUsername);
      //reflection to outside function
      function clickUsername() {
        
        reflectFunction(usname);
      } 

      //add cell to row  ---------------------------------------------
      tr.appendChild(td);
      listCellName.push(td);      
      tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl);
    $('#ulChatlistView').animate({scrollTop: $('#ulChatlistView').prop("scrollHeight")}, 500);

}

//change color of cell selected and call selectUser() function
function reflectFunction(usname){  
  //set numberOfMessagePage = 0 to count number of message page to read more
  numberOfMessagePage = 1;
  for(var i = 0; i < myListChat.length; i++){
    if(listCellName[i].textContent == usname){
     selectUser(usname);
      listCellName[i].style.backgroundColor = '#3807';
    }else{
      listCellName[i].style.backgroundColor = "paleturquoise";
    }
  }

}


socket.on('friendStatusResult', function(data){  
  var friendName = data[0];
  var friendStatus = data[1];

  if(listCellStatus.length){
    for(var i = 0; i < listCellStatus.length; i++){
      if(listCellName[i].textContent == friendName){
        //reset status icon of friend
        
        listCellStatus[i].src = getStatusIcon(friendStatus);
      }
    }

  }

  var singleAlert = '';
  if(friendStatus === offlineStatus){
    singleAlert = friendName + " is offline";

    //friend off while calling you
    if((friendName === boxChatOf || friendName === currentCaller) && isCalling){
      hideMediaConferent();
      stopBothVideoAndAudio(localStrem);
      singleCallReset();
    }
  }else{
    singleAlert = friendName + " is online";
  }

  friendInAlert = data[0];
  singleAlertType = alertFriendStatus;
  showSingleAlert(singleAlert);

  
});

//-----------------------------------------------------------------------


function showFriendToChoice() {
    var chatterNumber = myListChat.length;
    var body = document.getElementById('ulChoiceFriend');
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '0');

    var tbdy = document.createElement('tbody');
    for (var i = 0; i < chatterNumber; i++) {
        //create row
        var tr = document.createElement('tr');
        const aChatter = myListChat[i].slice();
        const usname = aChatter[0]; 
        
      if(usname.length <= 20 && usname != "chatbot"){
        //create status cell      ---------------------------------------  
        var td = document.createElement('td');
        //create status icon         
        var checkbox = document.createElement('input');    
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", "choicer");
        checkbox.setAttribute("value", usname);
        
        
        td.appendChild(checkbox);
        td.width = '5';
        //add cell to row
        tr.appendChild(td); 
                
        //create avatar cell -------------------------------------------------
        var td = document.createElement('td');

        var img = document.createElement('img');
        var avaPath = getAvatarPathView(usname);
        img.src= avaPath ;
        // img.alt = avaPath;
        img.width = "30";
        img.height = "30";
        td.appendChild(img);
        td.width = '30';
        //add cell to row
        tr.appendChild(td); 

        //create username cell ---------------------------------------------
        var td = document.createElement('td');
        //td.style.width = "500px";              
        td.appendChild(document.createTextNode(usname)); 
        
        //add cell to row  ---------------------------------------------
        tr.appendChild(td);
        tbdy.appendChild(tr);
      }
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl);
    $('#ulChoiceFriend').animate({scrollTop: $('#ulChoiceFriend').prop("scrollHeight")}, 500);
}

function createNewChat(){
  
  document.getElementById("ulChoiceFriend").innerHTML = "";
  showFriendToChoice();
  
  document.getElementById("divCreateNewGroup").style.display = "block";
}

function CloseCreateNewGroup(){
  document.getElementById("divCreateNewGroup").style.display = "none";
}

function createNewGroup(){
  var groupInfo = [];
  var groupMembers = [];

  const groupName = document.getElementById("inputGroupName");
  if(groupName.value == null){
    groupInfo.push("Group chat");
  }
  else {
    groupInfo.push(groupName.value);
  }

  //add member
  var checkboxList = document.getElementsByName('choicer');
  groupMembers.push(socket.username);
  
  for(var i = 0; i < checkboxList.length; i++){
    
    if(checkboxList[i].checked == true){
      groupMembers.push(checkboxList[i].value);
    }
  }

  if(groupMembers.length >= 3){
    
    groupInfo.push(groupMembers);

    socket.emit("createRoom", groupInfo);
    socket.on("createRoomResult", function(data){
      if(data){
        socket.emit("getChatList", data);
        document.getElementById("divCreateNewGroup").style.display = "none";
      }
    })
  }else{
    alert('Please choice more people');
  }
}
//-------------------------------------------------------------------------

//funcrtion process user find some thing in list chatter on sidebar
function enterCharPress(event){
  
  var inputChar = document.getElementById("inSidebarFind");
  var findWhom = inputChar.value;
  
  var newChatList = [];
  
  if(findWhom.length){//search box has value
    for(var i=0; i < myListChat.length; i++){
      var currentNickname = myListChat[i];
      if(currentNickname[0].indexOf(findWhom) > -1){
        newChatList.push(currentNickname);
      };      
    }
    clearTableChatList();
    createTableChatlist(newChatList);
  }else{  //serach box was clear  
    clearTableChatList();
    createTableChatlist(myListChat);
  }
}

//----------------------------------------------------------------------
var numberOfMessagePage = 1;

function readMoreMess(){
  numberOfMessagePage++;
  var readMoreMessInfo = [];
  readMoreMessInfo.push(boxChatOf);
  readMoreMessInfo.push(numberOfMessagePage);
  socket.emit('readMoreMess', readMoreMessInfo);
  
  
}

socket.on('readMoreMessResult', function (result){
  if (result ) {
    clearChatBox();
    if (result.length > 0){
      for( var k = result.length - 1; k >= 0 ; k--){
        var mess = [];
        mess = result[k].slice();
        
        addaMessToWindow(mess, 1);
      }
    }
    
  } else {
    
  }
});
  


/* ------------------- code for alert ------------------ */
//single alert. an alert respond and action
function showAlert(){
  alert("alert");
}


function sidebarOpenAlert(){  
  if(singleAlertType === alertFriendCall){
    showMediaConferent();

    hideLocalVideo();
    
    showRemoteVideoControl();
    showCallFeedbackControl();    
    hideRemoteVideo();
    
  }else{
    socket.emit("getChatList", "1");
    socket.on('getChatListResult', function(data){
      reflectFunction(friendInAlert);
    });
  }
  
}

function showSingleAlert(comeAlert){
  
  //insert alert content
  document.getElementById("aSidebarSingleAlert").textContent = comeAlert;
  //display it
  document.getElementById("divSidebarSingleAlert").style.display = "block";

  //hide alert after few sec
  setTimeout(function(){ 
    document.getElementById("divSidebarSingleAlert").style.display = "none";
    document.getElementById("aSidebarSingleAlert").textContent = ""; 
    //clear global value
    singleAlertType = 0;
    friendInAlert = "";
  }, 9000); 
}


socket.on("addFriendRequestAlert", function(friendRequest){
  
  //friendInAlert is global value
  friendInAlert= friendRequest;
  var alert = friendInAlert + actContent[1];

  singleAlertType = alertAddFriendRequest;
  showSingleAlert(alert);
})