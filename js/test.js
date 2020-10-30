const articlesList = document.getElementById('add-articles-form');

//create element and render articles
function renderArticles(doc){
    let div = document.createElement('div');
    let title = document.createElement('h3');
    let content = document.createElement('h3');
    let cross = document.createElement('div');

    div.style.display = 'grid';
    div.style.gridTemplateColumns = '0.2fr 0.2fr 0.05fr 0.05fr';
    
    div.setAttribute('data-id', doc.id);
    title.textContent = doc.data().title;
    content.textContent = doc.data().content;
    cross.textContent = 'x';

    div.appendChild(title);
    div.appendChild(content);
    div.appendChild(cross);
    articlesList.appendChild(div);

    //delete
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('articles').doc(id).delete();
    })
}

//getting data
// db.collection('articles').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//          renderArticles(doc)
//     });
// })

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