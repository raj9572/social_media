
const router = require('express').Router();
const postControllers = require('../controllers/postController')
const requireUser = require('../middleware/requireUser')

// router.get('/all',requireUser,postControllers.getAllPostsController)
router.post('/', requireUser, postControllers.createPostController)
router.post('/like', requireUser, postControllers.LikeAndUnlikePost)
router.put('/', requireUser, postControllers.updatePostController)
router.delete('/', requireUser, postControllers.deletePost)
router.post('/postcomment', requireUser, postControllers.postCommentController)
router.get('/getcomments/:postId', requireUser, postControllers.getPostAllComments)
router.get('/postDetails/:postId', requireUser, postControllers.getPostDetails)

module.exports = router