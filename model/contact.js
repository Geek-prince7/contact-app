// define schema of database
const mongoose=require('mongoose')

const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    phone:{
        type:String,
        required:true
    }     
})

// collection name
const contactsCollection=mongoose.model('contactsCollection',contactSchema)
// export
module.exports=contactsCollection;
