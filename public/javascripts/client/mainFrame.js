function setupMainFrame(){
  var topbarChaterName = document.getElementById("aTopbarChaterName");
    
    document.getElementById("divStartPage").style.display = "none";
    document.getElementById("divMain").style.display = "block";
    document.getElementById("inputMessage").value = '';
    if(boxChatOf.length <= maxUsernameLength ){
      
      topbarChaterName.textContent = boxChatOf;

      
    }else{
      
      var room = getRoomInfo(boxChatOf);
      var roomName = room[1].slice();
      topbarChaterName.textContent = roomName;
      topbarChaterName.addEventListener("click", openGroupForm);
      function openGroupForm(){
        if(boxChatOf.length > maxUsernameLength){
          document.getElementById("divEditGroup").style.display = "block";
          socket.emit("refreshData", "getData"); 
        }
      }
    }
  }

  function addOption(friendName){
    var body = document.getElementById("messages");
    var tblView = document.createElement('table');
    tblView.style.margin = "auto";
   
  var tbdy = document.createElement('tbody');
  
    //create row of avatar
    var trAvatar = document.createElement('tr'); 
      var tdAvatar = document.createElement('td');
      tdAvatar.colSpan = "2";
      
      //create status icon         
      var imgAvatar = document.createElement('img');    
      var avaPath = getAvatarPathView(friendName);    
      imgAvatar.src= avaPath ;
      imgAvatar.alt = avaPath;
      imgAvatar.width = "200";
      imgAvatar.height = "200";
      tdAvatar.appendChild(imgAvatar);
    //add cell to row
    trAvatar.appendChild(tdAvatar); 
    
    //create row of info - usname -----------------
    var trNickname = document.createElement('tr'); 
      var tdLabelNickname = document.createElement('td');
      tdLabelNickname.appendChild(document.createTextNode("Nickname: "));
      
      var tdNickname = document.createElement('td');
      tdNickname.appendChild(document.createTextNode(friendName));    
      
    //add cell to row
    trNickname.appendChild(tdLabelNickname); 
    trNickname.appendChild(tdNickname); 

    //create row of action -----------------
    var trAction = document.createElement('tr'); 
      trAction.colSpan = "2";

      var tdAction = document.createElement('td');
      //create button Chat now
      var btnAccept = document.createElement('BUTTON');  
      btnAccept.addEventListener('click', clickAccept);
      btnAccept.textContent = "Accept";
      //reflection to outside function
      function clickAccept() {
        changeRelationship(addFriendAccept,friendName);
        
      }  
      tdAction.appendChild(btnAccept);
      
      //create button Add Friend
      var btnReject = document.createElement('BUTTON');  
      btnReject.addEventListener('click', clickReject);
      btnReject.textContent = "Reject";
      //reflection to outside function
      function clickReject() {
        changeRelationship(addFriendReject, friendName);
        
      }  
      tdAction.appendChild(btnReject);
      
    //add cell to row
    trAction.appendChild(tdAction); 
    
    //add row to tbdy  ---------------------------------------------
     
    tbdy.appendChild(trAvatar);
    tbdy.appendChild(trNickname);
    
    tbdy.appendChild(trAction);
  
  tblView.appendChild(tbdy);
  body.appendChild(tblView);
  $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 500);
    
  }

  function changeRelationship(reaction, friendName){
    var myAnswer = [];
    myAnswer.push(reaction);
    myAnswer.push(friendName);
    socket.emit("changeRelationship", myAnswer);
    clearFindBox();
    return(false);
  }

  socket.on("changeRelationshipResult", function(friendAnswer){
    var feedbackType = data[0];
    var friendName = data[1];

    var answerContent = '';
    if(feedbackType){
      answerContent = friendName + " accepted your add friend request";
    }else{
      answerContent = friendName + " rejected your add friend request";
    }

    
    //singleAlertType = alertAddFriendRequest;
    showSingleAlert(answerContent);
  });

  function addaMessToWindow(mess, showType){
    
    var userSend = mess[0];
    var messageTo = mess[4];
    var members = [];
    
    
    if(messageTo.length > maxUsernameLength ){ //message send to room
      if(boxChatOf == messageTo){//roomID is equar
        var room = getRoomInfo(messageTo);//open chat group => boxChatOf is a roomID

        //get members of the room with roomID = boxChatOf
        members = room[2].slice();   
      }else {  //message to an other room 
        singleAlertType = alertGroupMessage;
        friendInAlert = messageTo;

        var alertContent = userSend + " messaged " + messageTo;
        showSingleAlert(alertContent);
      }
    }else{ //mess frome user send to user
      
      if(userSend != socket.username && userSend != boxChatOf){
        singleAlertType = alertFriendMessage;
        friendInAlert = userSend;
        
        var alertContent = friendInAlert + " messaged you";
        showSingleAlert(alertContent);
        
      }
    }
    
    var body = document.getElementById("messages");
    //set position of form        
    if(socket.username == userSend ){//yourselt
     //create table of mess
      var tbl = document.createElement('table');
      tbl.style.width = '60%';
      tbl.style.float = "right";
      tbl.setAttribute('border', '0');
  
      var tbdy = document.createElement('tbody');
      
      for (var i = 0; i < 2; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 2; j++) {              
            if(i == 1 && j==1){        //avatar of chatter if readed cell
              var td = document.createElement('td');             
              var img = document.createElement('img');
              //get path avatar by nick name
              var avaPath = getAvatarPathView(boxChatOf);
              
              img.src= avaPath ;
              img.alt = avaPath;
              img.width = "10";
              if(0){
                td.appendChild(img);
              }
              td.width = '10';
            } else if (i ==0 && j == 0){//content cell
              var td = document.createElement('td');
              //td.width = "700";
              
              //give pic
              if(mess[3]){
                var arrayImg = mess[2].slice();
                
                for( var h = 0; h < arrayImg.length; h++){
                  var img = document.createElement('img');
                  
                  img.src= imgPath + arrayImg[h];
                  img.alt = imgPath + arrayImg[h];
                  img.width = "120";
  
                  //wait for server write tempic
                  setTimeout(function(){ 
                    
                  }, 100);
                  td.appendChild(img);
                                 
                  
                }              
              }
              else{//text
                td.appendChild(document.createTextNode('\u0020' + mess[2]));
                
              }
              td.style.fontSize = '20px';              
              td.style.float = "Right";
            } else if(i==1 && j==0){//time cell
              var td = document.createElement('td');
              td.appendChild(document.createTextNode('\u0020' + mess[1]));
              td.style.fontSize = '8px';
              td.style.float = "Right";
            } else { //empty cell
              var td = document.createElement('td');
            }
          tr.appendChild(td);      
        }
        tbdy.appendChild(tr);
      }
      tbl.appendChild(tbdy);
      
      
    }else if((boxChatOf == userSend && boxChatOf.length <= maxUsernameLength && messageTo.length <= maxUsernameLength) || 
              (members.indexOf(userSend) > -1)){//your friend or member of room
            
      //create table chat list
      var tbl = document.createElement('table');
      tbl.style.width = '60%';
      tbl.setAttribute('border', '0');
      tbl.style.float ="left";
      var tbdy = document.createElement('tbody');
      
      for (var i = 0; i < 2; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 2; j++) {              
            if(i == 0 && j==0){        //avatar cell
              var td = document.createElement('td');             
              var img = document.createElement('img');
              //get path avatar by nick name
              var avaPath = getAvatarPathView(mess[0]);
              
              img.src= avaPath ;
              img.alt = avaPath;
              img.width = "15";
              td.appendChild(img);
              td.width = '15';
            } else if (i==1 && j ==0){ //empty cell
              var td = document.createElement('td');
            } else if (i ==0 && j == 1){//content cell
              var td = document.createElement('td');
              //td.width = "700";
              //give pic
              if(mess[3]){
                var arrayImg = mess[2].slice();
                for( var h = 0; h < arrayImg.length; h++){
                  var img = document.createElement('img');
                  
                  img.src= imgPath + arrayImg[h];
                  img.alt = imgPath + arrayImg[h];
                  img.width = "120";
  
                  //wait for server write tempic
                  setTimeout(function(){ 
                    
                  }, 100);
                  td.appendChild(img);
                  
                  td.appendChild(img);
                }
                
              }
              else{//text
                td.appendChild(document.createTextNode('\u0020' + mess[2]));
              }
              td.style.fontSize = '20px';              
            } else if(i==1 && j==1){//time cell
              var td = document.createElement('td');
              td.appendChild(document.createTextNode('\u0020' + mess[1]));
              td.style.fontSize = '8px';
            }
          tr.appendChild(td);      
        }
        tbdy.appendChild(tr);
      }
      tbl.appendChild(tbdy);
    }
    
    body.appendChild(tbl);
    if(showType){
      //do not roll down screen
      
    }else{
      //scroll screen
      $('#messages').animate({scrollTop: $('#messages').prop("scrollHeight")}, 500);
    }
  }
  
  //clear chat box
  function clearChatBox(){
    var mess = document.getElementById("messages");
    mess.innerHTML = "";
  }
  
  //catch select chose friend chat
  function selectUser(usname){  
    boxChatOf = usname;    
    setupMainFrame(); 
    
    if (boxChatOf == null){
      //wait chose user chat     
    } else{
      //open chat box off
      socket.emit('openChatBox', boxChatOf);
      
    }
  }

  //listen answer message from server
  socket.on('openChatBoxResult', function(result){    
    
    clearChatBox();
    if (result.length > 0){
      for( var k = result.length - 1; k >= 0 ; k--){
        var mess = [];
        mess = result[k].slice();
        
        addaMessToWindow(mess);
      }
    }
    var userRelationship = getRelationship(boxChatOf);
    if(userRelationship === rlsAddFriendRecive){
      addOption(boxChatOf);
    }
  });
  
  socket.on('message', function(msg) {  
    //check resource of message
    //view mess to window
    addaMessToWindow(msg);     
  });
    
  function delMess(){
    if(confirm("Delete this user?")){
      //delete all mess of an user
      var userDel = boxChatOf;
      socket.emit('deleteMessOf', userDel)
      socket.on('deleteMess', function (result){
        if (result == 'ok') {
          
          
        } else {
          
        }
      });
    }
    }

    
  
  //array store all img user choice to send  
  var imgArrayToSend = []; 
  //array store all img element added to prewive diw
  var imgOnDivPreview = [];
  // Proxy button for <input/>
  function choiceImg(){
    
    document.getElementById("fileSelector").click();
  };
  
  
function previewFiles() {
  var preview = document.querySelector('#preview');
  var files   = document.querySelector('input[type=file]').files;
  
  function readAndPreview(file) {                
      var reader = new FileReader();

      reader.addEventListener("load", function () {
        var image = new Image();
        image.height = 35;
        image.title = file.name;
        image.src = this.result;
        //add img to send
        imgArrayToSend.push({base64:this.result});
        //add img to dell
        imgOnDivPreview.push(image);
        //add img to show
        preview.appendChild( image );
      }, false);

      reader.readAsDataURL(file);
  }

  if (files) {
        [].forEach.call(files, readAndPreview);
  }
}

function enterPress(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   sendMessage();
  }
}

  function sendMessage() {   
    var input = document.getElementById("inputMessage");
    if (input.value) {
      var mess = [];
      mess.push(boxChatOf);
      mess.push("default value");
      mess.push(input.value);
  
      if(mess[0] != null){
        
        socket.emit('message', mess);
        input.value = '';
      }  
    } else if(imgArrayToSend.length)
    {
      var mess = [];
      mess.push(boxChatOf);
      mess.push("1");
      mess.push(imgArrayToSend);
  
      if(mess[0] != null){
        
        socket.emit('message', mess);
        //clear imgArrayToSend aftersend it
        if(imgArrayToSend.length){
          imgArrayToSend.splice(0,imgArrayToSend.length)
          for(var i = 0; i < imgOnDivPreview.length; i++){
            imgOnDivPreview[i].remove();
          }
        }

            //clear imgArrayToSend
        if(imgArrayToSend.length){
          imgArrayToSend.splice(0,imgArrayToSend.length)
        }
      }      
    }
  }

  //------------------------------------------------------
 

function CloseEditGroup(){
  document.getElementById("divEditGroup").style.display = "none";
}

function setupFriendList(type){
  var room = getRoomInfo(boxChatOf);
  var roomMembers = room[2].slice(); 
  if(type == 1){
    return   roomMembers;
  }else{
    var templist = []; 
    
    for(var i = 0; i < myListChat.length; i++){
      const aChatter = myListChat[i].slice();
      const username = aChatter[0]; 

      if((roomMembers.indexOf(username) < 0) && username.length < maxUsernameLength && username != "chatbot"){
        templist.push(username);
      }
    }    
    return templist;
  }
}

var deleteButtonsList=[];
function showMembersToDelete() {
    //clear deleteButtonsList
    deleteButtonsList.splice(0, deleteButtonsList.length);

    var roomMember = setupFriendList(1);

    var chatterNumber = roomMember.length;
    var body = document.getElementById('ulSelectFriend');
    body.innerHTML ="";
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '0');

    var tbdy = document.createElement('tbody');
    for (var i = 0; i < chatterNumber; i++) {
        //create row
        var tr = document.createElement('tr');
        const usname = roomMember[i].slice();
        
      
        //create status cell      ---------------------------------------  
        var td = document.createElement('td');
        //create status icon         
        if(usname != socket.username){
          var deleteMember = document.createElement('input');    
          deleteMember.setAttribute("type", "button");
          deleteMember.setAttribute("value", "Delete");
          
          td.width = "20";
          td.appendChild(deleteMember);

          var temp = [];
          temp.push(usname);
          temp.push(deleteMember);
          deleteButtonsList.push(temp);


          td.addEventListener("click", deleteThisMember);
          function deleteThisMember(){
            deleteMemberFromGroup(usname);
          }
        }
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
    tbl.appendChild(tbdy);
    body.appendChild(tbl);
    $('#ulSelectFriend').animate({scrollTop: $('#ulSelectFriend').prop("scrollHeight")}, 500);

}

var addButtonsList=[];
function showUsersToAdd() {
    //clear addButtonsList
    addButtonsList.splice(0, addButtonsList.length);

    var roomMember = setupFriendList(0);
    
    var chatterNumber = roomMember.length;
    var body = document.getElementById('ulSelectFriend');
    body.innerHTML ="";
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '0');

    var tbdy = document.createElement('tbody');
    for (var i = 0; i < chatterNumber; i++) {
        //create row
        var tr = document.createElement('tr');
        const usname = roomMember[i].slice();
        
      
        //create status cell      ---------------------------------------  
        var td = document.createElement('td');
        //create status icon         
        if(usname != socket.username){
          var addMember = document.createElement('input');    
          addMember.setAttribute("type", "button");
          addMember.setAttribute("value", "Add");
          
          td.width = "20";
          td.appendChild(addMember);
          
          var temp = [];
          temp.push(usname);
          temp.push(addMember);
          addButtonsList.push(temp);

          td.addEventListener("click", addThisMember);
          function addThisMember(){
            addMemberToGroup(usname);
          }
        }
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
    tbl.appendChild(tbdy);
    body.appendChild(tbl);
    
    $('#ulSelectFriend').animate({scrollTop: $('#ulSelectFriend').prop("scrollHeight")}, 500);
  
}

function deleteMemberFromGroup(usname){  
  if(confirm("Remove " + usname + " from group?")){
    var removeInfo = [];
    removeInfo.push(boxChatOf);
    removeInfo.push(usname);
    
    socket.emit("removeGroupMember", removeInfo);  
    
    for(i = 0; i< deleteButtonsList.length; i++){
      var temp = deleteButtonsList[i].slice();
      if(usname == temp[0]){
        temp[1].remove();
      }
    }
  }
  setTimeout(function(){ 
    socket.emit("refreshData", "getData");                    
  }, 500);  
}

function addMemberToGroup(usname){  
  if(confirm("Add " + usname + " to group?")){
    var addInfo = [];
    addInfo.push(boxChatOf);
    addInfo.push(usname);
    socket.emit("addGroupMember", addInfo);   
          
    for(i = 0; i< addButtonsList.length; i++){
      var temp = addButtonsList[i].slice();
      if(usname == temp[0]){
        temp[1].remove();
      }
    }         
  }

  setTimeout(function(){ 
    socket.emit("refreshData", "getData");                    
  }, 500);
}

function enterNewGroupName(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   changeGroupName();
  }
}

function changeGroupName(){
  var newName = document.getElementById("inputNewGroupName").value;

  var newNameInfo = [];
  newNameInfo.push(boxChatOf);
  newNameInfo.push(newName);
  socket.emit("changeGroupName", newNameInfo);
  document.getElementById("aTopbarChaterName").textContent = newName;
  document.getElementById("inputNewGroupName").value = "";
  setTimeout(function(){ 
    socket.emit("refreshData", "getData");                    
  }, 500);

}

socket.on("needRefressData", function(data){
  socket.emit("refreshData", "getData"); 
});

