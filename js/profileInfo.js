var email_id = localStorage.getItem("myValue");

if(email_id == 0){
    window.location.href = "login.html";
}else{

    document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

   
        
    // ---------------------Profile----------------------------
    const form = document.getElementById('add-profile-form');
     //  profile to firebase
    function uploadImageToFirebase(){
        return new Promise(
        function(resolve,reject){
            const ref = firebase.storage().ref()

                
            const file = document.querySelector("#photo").files[0]
                    
            const name = new Date() + '-' + file.name
        
            const metadata = {
                contentType:file.type
            }
            
            const task = ref.child(name).put(file,metadata)
            
            task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url =>  {
                resolve(url);   
            })
        }
        )
    }

    //profile
    form.addEventListener('submit', async (e) => {
        e.preventDefault();       

        var imageUrl = await uploadImageToFirebase();
        

        db.collection('profile').add({
            welcomeMessage: form.welcomeMessage.value,
            image: imageUrl,
            profession: form.profession.value
        })
        form.welcomeMessage.value = '';
        form.image.value = '';
        form.profession.value = '';    

    })


}

document.getElementById("logout").onclick = function(){
    
    logout();
    // localStorage.clear();
    window.location.href = "login.html";  
    
}

function logout(){
        
  firebase.auth().signOut();
  localStorage.clear();
}

