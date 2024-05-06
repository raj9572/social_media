const Post = require('../models/Post')
const User = require('../models/User')
const CommentModel  = require('../models/Comment')
const { error, success } = require('../Utils/responseWrapper');
const mapPostOutput = require('../Utils/Utils');
const Comment = require('../models/Comment');
const cloudinary = require('cloudinary').v2;


const createPostController = async (req, res) => {
    try {
        const { caption,postImg } = req.body;
        const owner = req._id;

        if(!caption || !postImg){
            return res.send(error(400,'caption and postImg are required'))
        }
       
            const cloudImg = await cloudinary.uploader.upload(postImg,{
                folder:'postImg'
            })
            

       

        const user = await User.findById(req._id)

        const post = await Post.create({
            owner,
            caption,
            image:{
                publicId:cloudImg.public_id,
                url:cloudImg.url
            }
        })

        user.posts.push(post._id);
        await user.save();

        return res.send(success(201, post))
    } catch (e) {
       return res.send(error(500, e.message))
    }
}


const LikeAndUnlikePost = async (req,res)=>{
    try {
        const {postId} = req.body;
    const curUserid = req._id

    const post = await Post.findById(postId).populate('owner')
    if(!post){
        return res.send(error(404,'Post not found'))
    }
    
    if(post.likes.includes(curUserid)){
           const index = post.likes.indexOf(curUserid);
           post.likes.splice(index,1)
           
    }else{
        post.likes.push(curUserid);
       
    }

    await post.save();
    return res.send(success(200,{post:mapPostOutput(post,req._id)}))


    } catch (error) {
        return res.send(error(500,e.message))
    }
}


const updatePostController = async(req,res)=>{
    try {
        const {postId,caption} = req.body
    const curUserId = req._id
    const post = await Post.findById(postId)

    if(!post){
        return res.send(error(404,"Post Not Found"))
    }

    if(post.owner.toString() !== curUserId ){
        return res.send(error(403,"Only owner can update posts"))
    }

    if(caption){
        post.caption = caption;
    }

    await post.save();
    return res.send(success(200,{post}))
    } catch (e) {
        return res.send(error(500,e.message))
    }

}


const deletePost = async(req,res)=>{
    try {
        const {postId} = req.body
        const curUserId = req._id

        const post = await Post.findById(postId)
        const curUser = await User.findById(curUserId)
        if(!post){
            return res.send(error(404,"Post Not Found"))
        }
    
        if(post.owner.toString() !== curUserId ){
            return res.send(error(403,"Only owner can delete posts"))
        }

        const index = curUser.posts.indexOf(postId)
        curUser.posts.splice(index,1)
        await curUser.save();
        await post.remove();

        return res.send(success(200,'post deleted'))

    } catch (e) {
        return res.send(error(500,e.message))
    }
}

const postCommentController = async (req, res) => {
    try {
        const { commentText, postId } = req.body
        if (!commentText) {
            return res.send(Error(400, "please text in comment"))
        }

        const post = await Post.findById(postId)

        const comment = await CommentModel.create({
            commentText,
            postId,
            userId: req._id
        })

        post.comments.push(comment._id)
        await post.save()

        return res.send(success(200, "you are commented on post"))


    } catch (error) {
        return res.send(Error(500, error.message))
    }

}


const getPostDetails = async(req,res)=>{
    
    try {
        const {postId} = req.params
    if(!postId){
        return res.send(Error(404, "postId not found"))
    }

    const post = await Post.findById(postId).populate('owner')
   
    if(!post){
        return res.send(Error(404, "postId not found"))
    }
    
    return res.send(success(200, {post:mapPostOutput(post,req._id)}))

    } catch (error) {
        return res.send(Error(500, error.message))
    
    }

}
const getPostAllComments = async(req,res)=>{
    
    try {
        const {postId} = req.params

    const AllComment = await Comment.find({postId}).populate('userId')
   
    return res.send(success(200, {comments:AllComment}))

    } catch (error) {
        return res.send(Error(500, error.message))
    
    }

}

 


module.exports = {
     createPostController,
     LikeAndUnlikePost,
     updatePostController,
     deletePost,
     postCommentController,
     getPostDetails,
     getPostAllComments
     }