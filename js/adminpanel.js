  var email_id = localStorage.getItem("myValue");

if(email_id == 0){
    window.location.href = "login.html";
}else{

   document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

}

document.getElementById("logout").onclick = function(){
   //do something
   
   logout();
   window.location.href = "login.html";  
   
   
}

function logout(){
   firebase.auth().signOut();
   localStorage.clear();
}