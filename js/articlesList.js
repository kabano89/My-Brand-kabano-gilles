var contentData = document.getElementById('data');

var email_id = localStorage.getItem("myValue");

document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

document.getElementById("logout").onclick = function(){

   window.location.href = "login.html";  
   logout();
   
}

function logout(){
   firebase.auth().signOut();
}

function renderArticle(doc,n){ //the argument doc is the document that we want to render

      let div = document.createElement('div'); //will hold the elements
      let numbering = document.createElement('h3'); //#
      let title = document.createElement('h3'); // title of the article
      let buttonUpdate = document.createElement("button"); // update button
      let buttonDelete = document.createElement("button"); //delete button

      //div.style.gridTemplateColumns =

      div.style.display = 'grid';
      div.style.gridTemplateColumns = '0.2fr 0.2fr 0.05fr 0.05fr';
      div.style.gridGap= '5px';

      buttonUpdate.style.height = "20px";
      buttonDelete.style.height = "20px";
      


      numbering.textContent = n; //set the numbering
      title.textContent = doc.data().title; //set the title
      buttonUpdate.innerHTML = "Update"; // set the update button
      buttonDelete.innerHTML = "Delete"; // set the delete button
      
      div.setAttribute('data-id', doc.id);
      div.appendChild(numbering);
      div.appendChild(title);
      div.appendChild(buttonUpdate);
      div.appendChild(buttonDelete);
     
      contentData.appendChild(div); 


       //deleting data
       buttonDelete.addEventListener('click', (e) => {
           
            let id = e.target.parentElement.getAttribute('data-id');
 
            db.collection('articles').doc(id).delete();
            //console.log(id);
           
       })

       //upadte
       buttonUpdate.addEventListener('click', (e) => {
           //alert('hello')
          let id = e.target.parentElement.getAttribute('data-id');
        
          var a = id;
          localStorage.setItem('myValue',a);
          //window.location.href="testupdate.html";
          window.open('updateArticle.html');
       })
       
    
}



 //Real time
db.collection('articles').orderBy('date_added', 'asc').onSnapshot(snapshot => {
          let changes = snapshot.docChanges();
          changes.forEach((change,n) => {
             if(change.type == 'added'){
                n = n + 1;
                renderArticle(change.doc,n);
                
 
             }else if (change.type == 'removed'){
                 let div = contentData.querySelector('[data-id=' + change.doc.id + ']');

                 contentData.removeChild(div);

            }
          });
})

