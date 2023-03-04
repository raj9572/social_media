const Post = require('../models/Post')
const User = require('../models/User')
const { error, success } = require('../Utils/responseWrapper');
const mapPostOutput = require('../Utils/Utils');
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
        // console.log(user)

        const post = await Post.create({
            owner,
            caption,
            image:{
                publicId:cloudImg.public_id,
                url:cloudImg.url
            }
        })

        // console.log(user, post._id)
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


module.exports = {
     createPostController,
     LikeAndUnlikePost,
     updatePostController,
     deletePost
     }