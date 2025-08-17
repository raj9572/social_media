require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const connectToMongo = require('./dbConnect')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const cloudinary = require('cloudinary').v2;
const bodyParser = require('body-parser')
const { estimatedDocumentCount } = require('./models/Comment')

// middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use(morgan('common'))
app.use(cookieParser())
// https://social-media-client-blue-ten.vercel.app/
app.use(cors({
  origin: ['http://localhost:3000',"https://social-media-zl52.onrender.com/"],
  credentials: true
}))


// check deployment is right 
app.get("/", (req, res) => {
  return res.json({ books: "this is book" })
})

// cloudinary 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});







// routing
app.use("/auth", require('./routers/authRouter'))
app.use("/post", require('./routers/postsRouter'))
app.use("/user", require('./routers/UserRouter'))


app.listen(port, () => {
  connectToMongo()
  console.log(`Example app listening on port ${port}`)
})


// 