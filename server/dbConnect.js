const mongoose = require('mongoose');




mongoose.set('strictQuery', true);
// const mongoURL=`mongodb+srv://rajali1432:${123456123}@social-media.z1kzwum.mongodb.net/social-media?retryWrites=true&w=majority`
// const mongoURL = `mongodb+srv://rajali1432:${123456123}@social-media.z1kzwum.mongodb.net/?retryWrites=true&w=majority&appName=social-media`
const mongoURL = `mongodb+srv://rajali1432:${123456123}@social-media.z1kzwum.mongodb.net/social-media?retryWrites=true&w=majority&appName=social-media`
const connectToMongo = async()=>{
   try {
    const result = await mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        });
    console.log("mongodb is connected succesuflly......")
   } catch (error) {
      console.log(error)
      process.exit(1)
   }
       
}

module.exports = connectToMongo