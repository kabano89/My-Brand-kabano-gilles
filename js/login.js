firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    
      var user = firebase.auth().currentUser;
  
      if(user != null){
  
        var email_id = user.email;
        localStorage.setItem('myValue',email_id);
        
        window.location.href = "adminpanel.html";

  
      }
  
    } else {
      // No user is signed in.
  
        // document.getElementById("message").innerHTML = "Provide E-mail and Password";
        localStorage.setItem('myValue', 0);  
    }
});
  
  function login(){
  
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      document.getElementById("message").style.backgroundColor = "red";
      document.getElementById("message").style.color = "white";
  
      document.getElementById("message").innerHTML = errorMessage;
  
    });
  
  }
  
function logout(){
     firebase.auth().signOut();
}


