var email_id = localStorage.getItem("myValue");

if(email_id == 0){
    window.location.href = "login.html";
}else{

    document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

   
        
    // ---------------------Profile----------------------------
    const form1 = document.getElementById('add-profile-form');
     //  profile to firebase
    function uploadImageToFirebase1(){
        return new Promise(
        function(resolve,reject){
            const ref = firebase.storage().ref()

                
            const file = document.querySelector("#photo1").files[0]
                    
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
    form1.addEventListener('submit', async (e) => {
        e.preventDefault();       

        var imageUrl = await uploadImageToFirebase1();
        

        db.collection('profile').add({
            welcomeMessage: form1.welcomeMessage.value,
            image: imageUrl,
            profession: form1.profession.value
        })
        form1.welcomeMessage.value = '';
        form1.image.value = '';
        form1.profession.value = '';    
        console.log('success');

    })

    // ---------End profile---------------------------------------

    // ------Services-----------------------------
    const form2 = document.getElementById('add-services-form');

    //  Services to firebase
    function uploadImageToFirebase2(){
        return new Promise(
        function(resolve,reject){
            const ref = firebase.storage().ref()

                
            const file = document.querySelector("#photo2").files[0]
                    
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
    //services
    form2.addEventListener('submit', async (e) => {
        e.preventDefault();       

        var imageUrl = await uploadImageToFirebase2();
        

        db.collection('services').add({
            title: form2.title.value,
            image: imageUrl,
            content: form2.content.value
        })
        form2.title.value = '';
        form2.image.value = '';
        form2.content.value = '';    

    })

    // -------------End Services---------------------


    // -----------------Skills ----------------------
    const form3 = document.getElementById('add-skills-form');
    //skills photo
    function uploadImageToFirebase3(){
        return new Promise(
        function(resolve,reject){
            const ref = firebase.storage().ref()

                
            const file = document.querySelector("#photo3").files[0]
                    
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

    //skills
    form3.addEventListener('submit', async (e) => {
        e.preventDefault();       

        var imageUrl = await uploadImageToFirebase3();
        

        db.collection('skills').add({
            title: form3.title.value,
            image: imageUrl
        })
        form3.title.value = '';
        form3.image.value = '';

    })

    // ------End Skills --------------------------------------------------

    // -------------contact ---------------------------------------------
    const form4 = document.getElementById('add-contact-form');
    //contact photo
    function uploadImageToFirebase4(){
        return new Promise(
        function(resolve,reject){
            const ref = firebase.storage().ref()

                
            const file = document.querySelector("#photo4").files[0]
                    
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

    
    //contact
    form4.addEventListener('submit', async (e) => {
        e.preventDefault();       

        var imageUrl = await uploadImageToFirebase4();
        

        db.collection('contact').add({
            title: form4.title.value,
            image: imageUrl,
            content: form4.content.value
        })
        form4.title.value = '';
        form4.image.value = '';
        form4.content.value = '';    

    })

    // ---------------------end contact------------------------

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

