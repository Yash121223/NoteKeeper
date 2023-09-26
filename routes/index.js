var express = require('express');
const pool = require('./pool');
var router = express.Router();
var aes256 = require("aes256");
var passkey = "";



router.get ('/',(req,res)=>{
    res.render ('index');
})


/* Saving the note */

router.post('/saveNote',(req,res)=>{
    const text = req.body;

    pool.query ('insert into notes ( title , descr , date , pinned )  values ( ?,?,?,"No")' , [text.title, text.description , new Date ()] ,(err,obj)=>{
        if (err){
            console.log (err);
            res.send ([]);
        }

        else{
            pool.query ('select max (pid) as kake from notes', (err2 , obj2)=>{
                if (err2){
                    console.log (err2);
                    res.send ([]);
                }

                else{
                   
                    res.send (obj2);
                }
            })
        }

    })
})


/* Get the notes */

router.get ('/loadNotes',(req,res)=>{
    pool.query ('select * from notes order by  pinned desc, pid' ,(err,obj)=>{
        if (err){
            console.log (err);
            res.send ([]);
        }

        else{
            res.send (obj);
        }
    })
})


/* Deleting the note */

router.get('/deleteNote' ,(req,res)=>{
    pool.query ('delete from notes where pid = ?' , [req.query.pid] , (err,obj)=>{
        if (err){
            console.log (err);
            res.send ({status : "error"});
        }

        else{
            res.send ({status : "ok"});
        }
    })
})



/* Editing the note  */

router.post('/editNote' ,(req,res)=>{
    const text = req.body;

    pool.query ('update notes set title = ?, descr = ? , date = ? where pid = ?' , [text.title , text.description , new Date() , text.pid] , (err,obj)=>{
        if (err){
            console.log (err);
           res.send ({status : "error"});
        }

        else{
            res.send ({status : "ok"});
        }
    })
    
})


/* Updating the pin  */

router.get('/updatePin', (req,res)=>{
    pool.query ('update notes set pinned = ? where pid = ?' , [req.query.pin , req.query.pid], (err,obj)=>{
        if (err){
            console.log (err);
            res.send ({status : "error"});
        }

        else{
            let a = "Removed !";
            if (req.query.pin == "Yes"){
                a = "Pinned !"
                res.send ({status : `Note  ${a}`});
            }
            
            else{
                res.send ({status : `Pin  ${a}`});

            }

        }
    })
})

module.exports = router;
