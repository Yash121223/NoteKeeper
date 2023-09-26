

var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });


  const month = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  let editing = [];
/* Handling the plus button  */

function addClick(){
    // console.log ('aa');
    let popBox = document.querySelector('#popBox');

    popBox.style.display = "flex";

    document.querySelector('#addicon').style.display = "none";
}


/* Closing the pop up box */

function closeAdd(){
    let popBox = document.querySelector('#popBox');
    
    popBox.style.display = "none";
    document.querySelector('#addicon').style.display = "flex";

    document.querySelector('#titBox').value = "";
    document.querySelector('#dbox').value = "";
}


/* Sub menuu  */

function showMenu (a){
    let menu = a.nextElementSibling;
    
    if (menu.style.display == "none"){
        menu.style.display = "block";
        
    }
    
    else{
        menu.style.display = "none";
        
    }
    
    // console.log (menu);
}


/* Edit Box Checking  */

function editBox (a , b){
    
    let menu = b.parentNode;
    
    document.getElementById(`title~${a}`).setAttribute('contenteditable' , 'true');
    document.getElementById(`span~${a}`).setAttribute('contenteditable' , 'true');
    document.getElementById(`saveMenu~${a}`).style.display = "block";
    menu.style.display = "none";

    editing.push(a);



}

/* Stopping the edit */

function stopEdit (a, b){
    document.getElementById(`title~${a}`).setAttribute('contenteditable' , 'false');
    document.getElementById(`span~${a}`).setAttribute('contenteditable' , 'false');

    editing = editing.filter(fruit => fruit !== a);

    let title = document.getElementById(`title~${a}`).innerText;
    let description = document.getElementById(`span~${a}`).innerText;

    b.style.display = "none";


    /* Editing the note in the server  */

    fetch('/editNote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title : title , description : description , pid : a })
    })

        .then (response => response.json())
        .then ((obj)=>{
            if (obj.status == "ok"){
                Toast.fire ({
                    icon : "success",
                    title : "Note Editted Successfully !"
                });
            }

            else{
                Toast.fire ({
                    icon : "error",
                    title : "Server Error !"
                })
            }
        })


}



/* Adding a note */

function savingNote(){
    let title = document.querySelector('#titBox').value;
    let description = document.querySelector('#dbox').value;

    if (title == "" || description == ""){
        Toast.fire ({
            icon : "error",
            title : ' Please Fill the Fields ! '
        })
    }

    else{
      

        fetch('/saveNote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title : title , description : description })
    
        })

        .then (response=> response.json())
        .then ((obj)=>{
            if (obj.length == 0){
                Toast.fire ({
                    icon : "error",
                    title : ' Server Error ! '
                })
            }

            else{
                let popBox = document.querySelector('#popBox');
    
                popBox.style.display = "none";
                document.querySelector('#addicon').style.display = "flex";

                Toast.fire ({
                    icon : "success",
                    title : ' Note Added Successfully ! '
                })  
                
                let d = new Date ();
                d = d.getDate() + " " + month[d.getMonth()] + " " + d.getFullYear();
                
                addNoteHtml (obj[0].kake , title , description , d , "No");
            }
        })
    }
}



/* Function to physically add the note  */

function addNoteHtml (pid , title , desc , date , pin){
    let notebox = document.querySelector('#NoteBox');

    

    notebox.innerHTML += `
        <li class="note" id="note~${pid}">
            <div class="details">
            <P style="font-size:10px; color:'gray'">To pin click on the Title </p>
                <div class="kake" id="kake~${pid}"  onclick="pinning(${pid})">
                    <input type="text" name="" id="pinCheck~${pid}" hidden value="${pin}">
                    
                    <p id="title~${pid}">${title}</p>
                    <div class = "pinclass" id="pinicon~${pid}"  >
                        <i class="fa fa-map-pin pinsss"  id="pin~${pid}"></i>
                    </div>
                </div>
                <span id="span~${pid}" contenteditable="false">${desc}</span>
            </div>
            <div class="bottom-content">
                <span>${date}</span>
                <button class="btns2" id="saveMenu~${pid}" onclick="stopEdit(${pid}, this)">Save</button>
                <div class="settings">

                    <i class="fa fa-ellipsis-v" style="font-size:24px" onclick="showMenu(this)"></i>

                    <ul class="mixOpt">
                        <li onclick="editBox(${pid}, this)">Edit</li>
                        <li onclick="deleteBox(${pid})">Delete</li>
                    </ul>
                </div>
            </div>
        </li>
    
    `;

    if (pin == "No"){
        document.getElementById(`pinicon~${pid}`).style.display = "none";
    }
    
    // document.getElementById(`kake~${pid}`).addEventListener('mouseenter', ()=>{
       
    //     document.getElementById(`pinicon~${pid}`).style.display = "block";
        
    // })

    // document.getElementById(`kake~${pid}`).addEventListener('mouseleave', ()=>{

    //     if (pin == "No"){
    //         document.getElementById(`pinicon~${pid}`).style.display = "none";
    //     }   
        
    // })

}



/* Function to load notes during first page load */

function loadNotes (){
    fetch ('/loadNotes')
    .then (response=> response.json())
    .then ((obj)=>{
        if (obj.length == 0){
            Toast.fire ({
                icon : "warning",
                title : "No Notes Found !"
            })
        }

        else{
            obj.map ((items)=>{
                let  d = new Date (items.date); 
                d = d.getDate() + " " + month[d.getMonth()] + " " + d.getFullYear();
                addNoteHtml (items.pid , items.title , items.descr , d , items.pinned) ;
            })
        }
    })
}


/* Deleting the note */

function deleteBox (a){
    fetch (`/deleteNote?pid=${a}`)
        .then (response => response.json())
        .then ((obj)=>{
            if (obj.status == "ok"){
                Toast.fire ({
                    icon : "success",
                    title : "Note Deleted Successfully !"
                })

                // removing the note

                document.getElementById(`note~${a}`).remove();
            }

            else{
                Toast.fire ({
                    icon : "error",
                    title : "Server Error"
                })
            }
        })
}


/* Checking the pin  */

function pinning (a){
    let pin = document.getElementById(`pinCheck~${a}`);
    console.log (a);
    console.log (editing);
    console.log (a in editing);

    if (editing.includes(a)){
        return;
    }

    if (pin.value == "No"){
        pin.value = "Yes";
    }

    else if (pin.value == "Yes"){
        pin.value ="No";  
    }
        fetch (`/updatePin?pin=${pin.value}&pid=${a}`)
            .then (response => response.json())
            .then ((obj)=>{
                if (obj.status != "error"){
                    Toast.fire ({
                        icon : "success",
                        title : obj.status
                    })

                    document.querySelector('#NoteBox').innerHTML = `
                    <li class="add-box" id="addBtn">
                        <div class="icon" id="addicon" onclick="addClick()">
                            +
                        </div>
                        <p>Add new note</p>
                    </li>
                    `;

                    loadNotes();

                }

                else{
                    Toast.fire ({
                        icon : "error",
                        title : "Server Error !"
                    })
                }
            })
    
}