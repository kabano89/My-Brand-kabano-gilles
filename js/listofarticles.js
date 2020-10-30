var email_id = localStorage.getItem("myValue");

if(email_id == 0){
    window.location.href = "login.html";

}else{

    document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    const articlesList = document.getElementById('data');

    //create element and render articles
    function renderArticles(doc, n){
        let div = document.createElement('div');
        let numbering = document.createElement('h3'); //#
        let title = document.createElement('h3');
        let content = document.createElement('h3');
        let buttonUpdate = document.createElement("button"); // update button
        let buttonDelete = document.createElement("button"); //delete button

        div.style.display = 'grid';
        div.style.gridTemplateColumns = '0.2fr 0.5fr 0.05fr 0.05fr';
        div.style.gridGap= '5px';


        
        div.setAttribute('data-id', doc.id);

        numbering.textContent = n; //set the numbering
        title.textContent = doc.data().title;
        content.textContent = doc.data().content;
        buttonUpdate.innerHTML = "Update"; // set the update button
        buttonDelete.innerHTML = "Delete"; // set the delete button

        div.appendChild(numbering);
        div.appendChild(title);
        div.appendChild(buttonUpdate);
        div.appendChild(buttonDelete);

        articlesList.appendChild(div);

        //delete
        buttonDelete.addEventListener('click', (e) => {
            e.stopPropagation();
            var result = confirm("Are you sure  you want to delete?");
            if (result) {
                //Logic to delete the item
                let id = e.target.parentElement.getAttribute('data-id');
                db.collection('articles').doc(id).delete();
            }
        
        })

        //update
        buttonUpdate.addEventListener('click', (e) => {
    
        let id = e.target.parentElement.getAttribute('data-id');
    
        var a = id;
        var email = email_id;
        localStorage.setItem('myValue',a);
        localStorage.setItem('emailValue',email);
        //window.open('updateArticle.html');
        window.location.href = "updateArticle.html";
    })
    }

    // real-time listener
    db.collection('articles').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        
        changes.forEach((change, n) => {
            if(change.type == 'added'){
                n = n + 1;
                renderArticles(change.doc, n);
                console.log(n);
            }else if(change.type == 'removed'){
                let div = articlesList.querySelector('[data-id=' + change.doc.id + ']');
                articlesList.removeChild(div);
            }
        });
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