import express from "express";
const app = express();

const products=[{id:1, name:"banana", price:20},
    {id:2, name:"manzana", price:100},
        {id:3, name:"uva", price:75},
]
app.get("/", (req, res)=>{
    res.send("aca esta el servidor funcando!");
})

app.get("/products", (req, res)=>{
    res.json(products);
})

const PORT = 3000;

app.listen(PORT,()=>console.log(`http://localhost:${PORT}`));