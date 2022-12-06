// require library
const mongoose=require('mongoose')
//connect to db
mongoose.connect('mongodb://localhost/contacts_list_db',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
})

//accquire the connection
const db=mongoose.connection;
// if error occurs
db.on('error',console.error.bind(console,'error connecting to db'))
// up and running then print msg
db.once('open',function(){
    console.log("sucessful connection")
})
