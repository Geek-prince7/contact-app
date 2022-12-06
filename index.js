const exp = require('constants');
const express=require('express');
const { normalize } = require('path');
const path=require('path');
const { stringify } = require('querystring');


const port=8000;
//set up dp connect
const db=require('./config/mongoose')
// define schema
const contactsCollection=require('./model/contact')

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'Templates'))
//middleware-> just before controller accesses the data -> app.use signify its a middleware
app.use(express.urlencoded());


/*creating our own middleware
whenver an request or resp is sended then middleware is called if exist any and also middleware can manipulate req or resp
app.use(function(req,resp,next){
    console.log("mw1 called")
    req.abc='xyz'
    next(); //this line send control to next middleware or controller
})
*/

// for static files like image,video,css,js etc
// we are using a folder assets
app.use(express.static('assets'))

var contacts=[
    {
        name:'Stark',
        contact:'272830'

    },
    {
        name:'bruce',
        contact:'123456'
    },
    {
        name:'steve',
        contact:'98765'
    },
    {
        name:'thor',
        contact:'11111'

    }
]
filter={}


app.get('/contacts',function(req,resp){
    console.log('filter is *********** \n',filter)
    contactsCollection.find(filter,function(error,data){
        if(error)
        {
            console.log("***** error in fetching data *******")
            return;
        }
        resp.render('ContactTemplate',{contact_list:data});


    })
    // resp.render('ContactTemplate',{contact_list:contacts});

});

app.get('/form-submit',function(req,resp){
    resp.send('<h3>Submitted successfully</h3>')

})

app.post('/create-contact',function(req,resp){
    
    let index=contacts.findIndex(con=>con.contact==req.body.contact)
    if(index==-1)
    {
        /*
        contacts.push({
            name:req.body.name,
            contact:req.body.contact
        })
        */
       contactsCollection.create({
        name:req.body.name,
        phone:req.body.contact
       },function(eror,newContact){
            if(eror)
            {
                console.log("error occured in saving!",eror)
                return;
            }
            console.log('contact saved \n',newContact);
            resp.redirect('back')
       })

    }
    //or contacts.push(req.body) --> since the keys are same
    //return resp.redirect('/contacts'); // or we can use this return resp.redirect('back')
})
app.post('/filter-search',function(req,resp){
    let nm=req.body.name;
    let ph=req.body.phone
    
    if(nm!=null && nm!=undefined && nm!='')
    {
        filter.name=nm;
    }
    if(ph!=null && ph!=undefined && ph!='')
    {
        console.log("im in contactssss------>")
        filter.phone=ph;
    }
    if(ph=='' && nm=='')
    {
        delete filter.name;
        delete filter['phone'];
        
    }
    resp.redirect('/contacts')
})
/*
//using string param -> delete-contact/1234
app.get('/delete-contact/:contact',function(req,resp){
    let phone=req.params.contact
    console.log(phone)
    let index=0
    for(let i of contacts){
        if(i.contact==phone){
            break;
        }
        index++;

    }
    contacts.splice(index,1);
    return resp.redirect('back');

})
*/

// using query param -> /delete-contact?contact=1234
app.get('/delete-contact/',function(req,resp){
    // get the id
    let id=req.query.id

    //find contact in db and delete it 
    contactsCollection.findByIdAndDelete(id,function(error){
        if(error)
        {
            console.log("cant delete error occured !")
            return;
        }
        resp.redirect('/contacts');

    })
    /*
    console.log(phone)
    let index=contacts.findIndex(con=>con.contact==phone)
    if(index!=-1)
    {
        contacts.splice(index,1);
    }
    resp.redirect('/contacts')
    */
})


app.listen(port,function(error){
    if(error)
    {
        console.log('error occured');
        return;
    }
    console.log('running on port ',port);
})