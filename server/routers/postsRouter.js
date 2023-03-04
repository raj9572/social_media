
const router = require('express').Router();
const postControllers = require('../controllers/postController')
const requireUser = require('../middleware/requireUser')

// router.get('/all',requireUser,postControllers.getAllPostsController)
router.post('/', requireUser, postControllers.createPostController)
router.post('/like', requireUser, postControllers.LikeAndUnlikePost)
router.put('/', requireUser, postControllers.updatePostController)
router.delete('/', requireUser, postControllers.deletePost)

module.exports = router