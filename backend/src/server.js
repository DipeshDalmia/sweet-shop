const app=require("./app")
const connectDB=require("./config/db.js")

connectDB()

const port=process.env.port || 5000
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})