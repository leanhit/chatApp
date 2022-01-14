const domainName = "http://localhost:8888";
var socket = io.connect(domainName);
//login type
const loginByJwt = 0;
const loginToMongoDB = 1;
const loginToMssqlDB = 2;

//login failt result
const loginInvalidUsername = 0;
const loginInvalidPassword = 1;
const jwtExpired = 2;
const loginInvalidDb = 3;
const alertLogin = ["Invalid username", "Invalid password", "Token is expired", "Connect database fail"];

//img size define
const sizeImgStatus = "15";
const sizeImgAvatar = "30";
const sizeAvatarChat = "20";
const sizeImgChat = "120";
const sizeFontChat = "20";
const sizeFontTime = "8";


window.onload = function () {
    //get token from cookie
    if (getCookie('jwtoken')) {
        socket.emit('userLogin', {
            loginType: loginByJwt,
            content: getCookie('jwtoken')
        });
    } else {
        invalidLogin(null);
    }
}

function invalidLogin(failtType) {
    if (failtType !== null)
        alert("failtType " + alertLogin[failtType]);

    document.getElementById("divLoginForm").style.display = "block";
    document.getElementById("divStartPage").style.display = "none";
    document.getElementById("divSidebar").style.display = "none";
}

function btnLogin() {
    let temp
    if (domainName.indexOf("localhost") >= 0)
        temp = loginToMongoDB;
    else
        temp = loginToMssqlDB;

    socket.emit('userLogin', {
        loginType: temp,
        content: {
            password: $("#pswPass").val(),
            username: $("#txtUName").val()
        }
    });
}

socket.on('userLoginResult', (result) => {
    if (result.resultType) {
        socket.username = result.resultContent;

        //show hide element
        document.getElementById("divLoginForm").style.display = "none";
        document.getElementById("divStartPage").style.display = "block";
        document.getElementById("divSidebar").style.display = "block";
    } else {
        invalidLogin(result.resultContent);
    }
});


socket.on('jwtResult', function (token) {
    setCookie('jwtoken', token, "2000");
    console.log("write jwt token");
});

//------------module function----------------

function openPage(pageTag) {
    let aLogin = document.createElement('a');
    aLogin.setAttribute('href', pageTag);
    setTimeout(() => {
        aLogin.click();
    }, 10);
}


function showOneDiv(divShow) {
    let popups = document.getElementsByClassName("classDivPopup");
    for (var i = 0; i < popups.length; i++) {
        popups[i].style.display = 'none';
    }

    divShow.style.display = "block";

}

function closeDivByOutSideDivClick(xPoint, yPoint) {
    const divCoordinates = getCoordinates(currentActiveDiv);

    const topPoint = divCoordinates.topPoint;
    const leftPoint = divCoordinates.leftPoint;
    const rightPoint = divCoordinates.rightPoint;
    const bottomPoint = divCoordinates.bottomPoint;

    if ((xPoint > leftPoint && xPoint < rightPoint) && yPoint > topPoint && yPoint < bottomPoint) {
        //cursor inside div

    } else {
        currentActiveDiv.style.display = 'none';
        currentActiveDiv = divCoverAll;
        divCoverAll.style.display = 'block';
    }

}

function divClick(xPoint, yPoint) {
    if (isAddMenuClick) {
        showOneDiv(divTopbarAddMenu);
        isAddMenuClick = false;
    } else if (isMainMenuClick) {
        showOneDiv(divTopbarMainMenu);
        isMainMenuClick = false
    } else {
        closeDivByOutSideDivClick(xPoint, yPoint);
    }
}

function getCoordinates(element) {
    var rect = element.getBoundingClientRect();
    return {
        topPoint: rect.top,
        leftPoint: rect.left,
        rightPoint: rect.right,
        bottomPoint: rect.bottom
    }
}

function showit() {
    let xCoordinates = Event.x;
    let yCoordinates = Event.y;

    divClick(xCoordinates, yCoordinates);
}

function showitMOZ(e) {
    let xCoordinates = e.pageX;
    let yCoordinates = e.pageY;

    divClick(xCoordinates, yCoordinates);
}

function getPositionClick() {
    if (!document.all) {
        window.captureEvents(Event.CLICK);
        window.onclick = showitMOZ;
    } else {
        document.onclick = showit;
    }
}


function addRb(rbName, rbValue) {
    var radiobutton = document.createElement('input');
    radiobutton.setAttribute('type', 'radio');
    radiobutton.setAttribute('name', rbName);
    radiobutton.setAttribute('value', rbValue);

    return radiobutton;
}

function addCb(cbName, cbValue) {
    var checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('name', cbName);
    checkbox.setAttribute('value', cbValue);

    return checkbox;
}

function addBtn() {
    var button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.style.backgroundColor = 'aquablue';
    return button;
}

function addTbl(tbWidth, tbFloat) {
    var tbl = document.createElement('table');
    tbl.style.width = tbWidth;
    if (tbFloat !== null)
        tbl.style.float = tbFloat;
    tbl.setAttribute('border', '0');
    return tbl;
}

function addImg(imgID, imgSize) {
    var img = document.createElement('img');
    if (imgSize === sizeImgAvatar) {
        img.src = getAvatarPathView(imgID);
        img.height = imgSize;
    } else if (imgSize === sizeImgStatus) {
        img.src = getStatusIcon(imgID);
        img.height = imgSize;
    } else
        img.src = imgID;

    img.width = imgSize;

    return img;
}

function addImage(imgSrc, imgWidth, imgHight) {
    var img = document.createElement('img');
    img.src = imgSrc;
    img.width = imgWidth;
    if (imgHight !== null)
        img.height = imgHight;
    return img;
}

function addImgCell(tr, imgID, imgSize) {
    console.log(imgID)
    var td = document.createElement('td');
    var img = document.createElement('img');
    if (imgSize === sizeImgAvatar || imgSize === sizeAvatarChat) {
        img.src = getAvatarPathView(imgID);
        img.height = imgSize;
    } else if (imgSize === sizeImgStatus) {
        img.src = getStatusIcon(imgID);
        img.height = imgSize;
        listCellStatus.push(td);
    } else
        img.src = imgID;

    img.width = imgSize;
    td.style.width = imgSize;
    

    td.appendChild(img);
    //add cell to row
    tr.appendChild(td);
    return td;
}


function addTextCell(tr, text, fontSize) {
    var td = document.createElement('td');
    td.appendChild(document.createTextNode(text));

    td.style.fontSize = fontSize;
    //add cell to row
    tr.appendChild(td);
    return td;
}

function addEmptyCell(tr) {
    var td = document.createElement('td');
    td.appendChild(document.createTextNode(""));

    //add cell to row
    tr.appendChild(td);
}

function addBtn(btnName) {
    var btn = document.createElement('input');
    btn.setAttribute("type", "button");
    btn.setAttribute("value", btnName);
    return btn;
}

function addBtnCell(tr, btnName) {
    var td = document.createElement('td');
    var btn = addBtn(btnName);
    td.style.width = "20";
    td.appendChild(btn);
    //add cell to row
    tr.appendChild(td);
    return btn;
}

function addCbCell(tr, cbName, cbValue) {
    var td = document.createElement('td');
    //create status icon         
    var checkbox = document.createElement('input');
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", cbName);
    checkbox.setAttribute("value", cbValue);


    td.appendChild(checkbox);
    td.style.width = '5';
    //add cell to row
    tr.appendChild(td);
}