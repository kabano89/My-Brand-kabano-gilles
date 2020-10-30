//var email_id = localStorage.getItem("myValue");

var email_id = localStorage.getItem('emailValue');

if(!email_id){
    window.location.href = "login.html";

}else{

    document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;


    const form = document.getElementById('update-articles-form');

    var ids = localStorage.getItem("myValue");

    // var resetValue = 0;
    // localStorage.setItem("myValue", resetValue);



    var imageOldUrl = "";  //will catch the old url

    function renderArticle(doc){ //the argument doc is the document that we want to render

        document.getElementById("title").value = doc.data().title;

        document.getElementById("content").value = doc.data().content;

        const image = document.querySelector('#image');
        image.src = doc.data().image;
        imageOldUrl = doc.data().image;

    }


    //retrieve data
    db.collection('articles').where('__name__', '==', ids).get().then((snapshot) => {

            snapshot.docs.forEach(doc => {
                renderArticle(doc); //call the function
            });
    })





    function uploadImageToFirebase(){
        return new Promise(
        function(resolve,reject){
            const ref = firebase.storage().ref()
    
            const file = document.querySelector("#photo").files[0]

            if (typeof (file) !== "undefined"){
        
                const name = new Date() + '-' + file.name
            
                const metadata = {
                    contentType:file.type
                }
                
                const task = ref.child(name).put(file,metadata)
                
                task
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then(url =>  {
                    const image = document.querySelector('#image');
                    image.src = url;
                    resolve(url);   
                })
            }else{
                url = imageOldUrl;
                resolve(url);
            }
        }
        )
    }



    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        var imageUrl = await uploadImageToFirebase();

        db.collection('articles').doc(ids).update({
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
    window.location.href = "login.html";  
    
}

function logout(){
    firebase.auth().signOut();
    localStorage.clear();
}

