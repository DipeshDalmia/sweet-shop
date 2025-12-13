const express=require("express")
const cors=require("cors")

const authRoutes=require("./routes/authRoutes.js")
const sweetRoutes=require("./routes/sweetRoute.js")

const app=express()

app.use(cors())
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/sweets",sweetRoutes)

module.exports=app;