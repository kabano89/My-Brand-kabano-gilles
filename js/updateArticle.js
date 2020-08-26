const form = document.getElementById('update-articles-form');

var ids = localStorage.getItem("myValue");
// // alert("the value received is" + b);
 var resetValue = 0;
 localStorage.setItem("myValue", resetValue);

function renderArticle(doc){ //the argument doc is the document that we want to render

     document.getElementById("title").value = doc.data().title;

     document.getElementById("content").value = doc.data().content;

    const image = document.querySelector('#image');
    image.src = doc.data().image;

}


//retrieve data

 db.collection('articles').where('__name__', '==', ids).get().then((snapshot) => {

         snapshot.docs.forEach(doc => {
            //console.log(doc.data());//data() to view it well

            renderArticle(doc); //call the function
         });
 })



 function uploadImage(){
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
          const image = document.querySelector('#image');
          image.src = url;
          return(url);   
    })

}

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
    console.log(imageUrl);

    
    // uploadImageToFirebase.then(value => {
    //      console.log(value);
    //  })

    db.collection('articles').doc(ids).update({
        title: form.title.value,
        image: imageUrl,
        content: form.content.value
    })
    form.title.value = '';
    form.image.value = '';
    form.content.value = '';    

})

