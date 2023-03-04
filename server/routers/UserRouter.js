const { followOrUnfollowUserController, getPostOfFollowing, getMyPosts, getUserPosts, deleteMyProfile,getMyInfo,updateUserProfile,getUserProfile } = require('../controllers/UserController');
const requireUser = require('../middleware/requireUser');

const router = require('express').Router();


router.post('/follow', requireUser, followOrUnfollowUserController)
router.get('/getpostoffollowing', requireUser, getPostOfFollowing)
router.get('/getmyposts', requireUser, getMyPosts)
router.get('/getuserposts', requireUser, getUserPosts)
router.delete('/', requireUser, deleteMyProfile)
router.get('/getmyinfo', requireUser, getMyInfo)
router.put('/',requireUser,updateUserProfile)
router.post('/getUserProfile',requireUser,getUserProfile)


module.exports = router