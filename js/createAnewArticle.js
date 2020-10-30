var email_id = localStorage.getItem("myValue");

if(email_id == 0){
    window.location.href = "login.html";
}else{

    document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    const form = document.getElementById('add-articles-form');

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


    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        var imageUrl = await uploadImageToFirebase();
        

        db.collection('articles').add({
            title: form.title.value,
            image: imageUrl,
            content: form.content.value
        })
        form.title.value = '';
        form.image.value = '';
        form.content.value = '';    

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

