const articlesList = document.getElementById('content');

//create element and render articles
function renderArticles(doc){
    let div = document.createElement('div');
    
    let image = document.createElement('img');
    let title = document.createElement('h3');
    let content = document.createElement('p');
    let buttonReadMore = document.createElement("button"); // update button

    // var createA = document.createElement('a');
    // createA.setAttribute('href', "single-blog.html");
    

    image.src = doc.data().image;
    title.textContent = doc.data().title;
    content.textContent = doc.data().content.substr(0, 300);
    buttonReadMore.innerHTML = "Read More..."; // set the update button
    
    div.setAttribute('data-id', doc.id);
    div.appendChild(image);
    div.appendChild(title);
    //createA.appendChild(title);
    //div.appendChild(createA);
    div.appendChild(content);
    div.appendChild(buttonReadMore);
    

    articlesList.appendChild(div);

    //send the article id
    buttonReadMore.addEventListener('click', (e) => {
   
        let id = e.target.parentElement.getAttribute('data-id');
      
        var a = id;

        
        localStorage.setItem('myValue',a);
        // //window.open('updateArticle.html');
        window.location.href = "single-blog.html";
    })

}

// real-time listener
db.collection('articles').onSnapshot(snapshot => {
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


