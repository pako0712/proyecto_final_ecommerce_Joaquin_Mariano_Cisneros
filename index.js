import express from "express";
const app = express();
app.get("/", (req, res)=>{
    res.send("aca esta el servidor funcando!");
})

const PORT = 3000;

app.listen(PORT,()=>console.log(`http://localhost:${PORT}`));