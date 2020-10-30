var ids = localStorage.getItem("myValue");

const articlesList = document.getElementById('content');

//create element and render articles
function renderArticles(doc){
    let div = document.createElement('div');
    
    let image = document.createElement('img');
    let title = document.createElement('h3');
    let content = document.createElement('p');
    

    // var createA = document.createElement('a');
    // createA.setAttribute('href', "single-blog.html");
    
       

    image.src = doc.data().image;
    title.textContent = doc.data().title;
    content.textContent = doc.data().content;

    
    div.setAttribute('data-id', doc.id);
    div.appendChild(image);
    div.appendChild(title);
    //createA.appendChild(title);
    //div.appendChild(createA);
    div.appendChild(content);
      

    articlesList.appendChild(div);

    

}

// real-time listener
db.collection('articles').where('__name__', '==', ids).onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    
     changes.forEach(change => {
          if(change.type == 'added'){
              renderArticles(change.doc);
          }else if(change.type == 'removed'){
              let div = articlesList.querySelector('[data-id=' + change.doc.id + ']');
              articlesList.removeChild(div);
          }
     });
})

//comments on article
const form = document.getElementById('post-comments');

//save comments to firebase
form.addEventListener('submit', async (e) => {
    e.preventDefault();


    db.collection('comments').add({
        articleid: ids,
        names: form.names.value,
        email: form.youremail.value,
        comment: form.comment.value
    })
    form.names.value = '';
    form.youremail.value = '';
    form.comment.value = '';    

})

const commentList = document.getElementById('display-comments');

//function to render comments
function renderComments(doc){
    let div = document.createElement('div');
    
    
    let names = document.createElement('h3');
    let comment = document.createElement('p');

    names.textContent = doc.data().names + " says:";
    comment.textContent = doc.data().comment;

    
    div.setAttribute('data-id', doc.id);
    div.appendChild(names);
    div.appendChild(comment);
    
    //createA.appendChild(title);
    //div.appendChild(createA);
    
      

    commentList.appendChild(div);

    

}

// real-time listener
db.collection('comments').where('articleid', '==', ids).onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    
     changes.forEach(change => {
          if(change.type == 'added'){
             renderComments(change.doc);
          }
     });
})
