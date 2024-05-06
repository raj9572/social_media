const mongoose = require('mongoose')
const { Schema,model } = mongoose;

const commentSchema = new Schema({
 
    commentText:{
        type:String,
        required:true
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    
},);

module.exports= model('comment',commentSchema)