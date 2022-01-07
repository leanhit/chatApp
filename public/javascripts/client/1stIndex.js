window.onload = function(){

    function loginByCookie(){
        if(!getCookie("gruu-username")){
            document.getElementById("divLoginForm").style.display = "block";
        }
        else{
            //load cookie
            var usernameCookie = getCookie("gruu-username");
            var passwordCookie = getCookie("gruu-password-" + usernameCookie);

            loginInfo.push(usernameCookie);
            loginInfo.push(passwordCookie);

            socket.emit('userLogin', loginInfo);
            
        }
    }
    //get token from cookie
    if(getCookie('_jwtoken')){
        socket.emit('userLoginJwt', getCookie('jwtoken'));
        socket.on('userLoginJwtResult', function(data){
            if(data == invalidResult){
                loginByCookie();
            }
        })
    }else{
        loginByCookie();        
    }

    socket.on('loginResult', function(result){
        switch (result){
            case "0":
                alert("Invalid username");
                document.getElementById("divLoginForm").style.display = "none";
                deleteCookie("gruu-username");
                document.getElementById("divLoginForm").style.display = "block";
                break;
            case "1":
                alert("Invalid password");
                document.getElementById("divLoginForm").style.display = "none";
                deleteCookie("gruu-username");
                document.getElementById("divLoginForm").style.display = "block";
                break;
            default:
                //stick my nickname
                socket.username =loginInfo[0];

                //show hide element
                document.getElementById("divLoginForm").style.display = "none";
                document.getElementById("divStartPage").style.display = "block";   
                document.getElementById("divSidebar").style.display = "block";   
                
                //setup view
                setupStartFrame();
                setupSidebarFrame();

                //write cookie
                var usernameCookie = "gruu-username";
                var passwordCookie = "gruu-password-" + loginInfo[0];
    
                setCookie(usernameCookie, loginInfo[0], "3600");
                setCookie(passwordCookie, loginInfo[1], "3600");

                socket.on('jwtResult', function(token){
                    //setCookie('jwtoken', token, "2000");
                    //alert("write jwt token");
                });
                
        }
      });
}