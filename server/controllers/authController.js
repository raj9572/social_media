
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { success, error } = require('../Utils/responseWrapper')

const singupController = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password, name } = req.body
        if (!email || !password || !name) {
            // return res.status(400).send('All field are required')
            return res.send(error(400, 'All field are required'))
        }
        const oldUser = await User.findOne({ email })
        if (oldUser) {
            // return res.status(409).send('User is already register')
            return res.send(error(409, 'User is already register'))
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        console.log(hashPassword)

        const user = await User.create({

            name,
            email,
            password: hashPassword,
            bio:'default'

        })



        const newUser = await User.findById({ _id: user._id })
        return res.send(success(201, 'user Created successfully'))

    } catch (err) {
        // res.status(401).send({ error })
        return res.send(error(500, 'Internal server error in signup'))
    }
}



const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            // return res.status(400).send('All field are required')
            return res.send(error(400, 'All fieldare required'))
        }
        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            // return res.status(409).send('User is not register')
            return res.send(error(409, 'User is not register'))
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            // return res.status(403).send('Incorrect password')
            return res.send(error(403, 'Incorrect password'))
        }





        const accessToken = generateAccessToken({ _id: user._id, email: user.email })
        const refreshToken = generateRefreshToken({ _id: user._id, email: user.email })


        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true
        })

        // return res.json({ accessToken });
        return res.send(success(200, { accessToken }))


    } catch (err) {
        // res.status(400).send({ error })
        return res.send(error(500, 'Internal server error in login'))
    }
}


// this api will check the refresh token validity and generate a new access token
const refreshAccessTokenController = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies.jwt) {
        // return res.status(401).send("Refresh token in cookie is required")
        return res.send(error(401, 'Refresh token in cookie is required'))
    }
    const refreshToken = cookies.jwt

    try {
        const token = jwt.verify(refreshToken, process.env.REFRESE_TOKEN_PRIVATE_KEY)
        const _id = token._id
        const accessToken = generateAccessToken({ _id })
        // return res.status(201).json({ accessToken })
        return res.send(success(201, { accessToken }))
    } catch (err) {
        // return res.status(401).send("Invalid access key")
        return res.send(error(401, 'Invalid access key'))
    }

}


const logoutController = async(req,res)=>{
    try {
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: true
        })
        return res.send(success(200,'user logged out'))
    } catch (e) {
        return res.send(error(500,e.message))
    }
}








// internal function

const generateAccessToken = (data) => {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
        expiresIn: '1d'
    })
    return token
}

const generateRefreshToken = (data) => {
    const token = jwt.sign(data, process.env.REFRESE_TOKEN_PRIVATE_KEY, {
        expiresIn: '1y'
    })
    return token
}

module.exports = { singupController, loginController, refreshAccessTokenController,logoutController }