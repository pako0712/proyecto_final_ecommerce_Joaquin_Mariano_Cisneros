import express from "express";
import cors from "cors";
const app = express();

const products=[
    {id:1, name:"banana", price:20, category: "fruta"},
    {id:2, name:"manzana", price:100, category: "fruta"},
    {id:3, name:"uva", price:75, category: "fruta"},
    {id:4, name:"lechuga", price:20000, category: "verdura"}
]

//app.use((req, res, next) => {
 //  res.json({ message: "En mantenimiento" });
// });
app.use(cors());
app.use(express.json());

//COMIENZO RUTAS
//RUTA A PAGINA PRINCIPAL
app.get("/", (req, res)=>{
    res.json({"mensaje":"servidor funcando!"}); 
})
// RUTA  A TODOS LOS PRODUCTOS y FILTRADO
app.get("/products", (req, res)=>{
    const{category}=req.query;
    if(category){
        const productsFiltered= products.filter((item)=>item.category.includes(category));
        res.json(productsFiltered);
        return;
    }
    res.json(products);
})
// RUTA A FILTRADO POR NOMBRE
// app.get("/products/search", (req, res) => {
//   const { name } = req.query;

//   const filteredProducts = products.filter((p) =>
//     p.nombre.toLowerCase().includes(nombre.toLowerCase())
//   );

//   return res.json(filteredProducts);
// });
// RUTA A UN PRODUCTO
app.get("/products/:id", (req, res)=>{
    const id= parseInt(req.params.id);
    const product=products.find((item)=> item.id == id);
    if(!product){
        res.status(404).json({error:"el producto no existe"})
    }
    res.json(product);
})

// post
app.post("/products", (req, res) => {
  const { name, price } = req.body;

  const newProduct = {
    id: products.length + 1,
    name,
    price,
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

app.put("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  const { name, price } = req.body;

  products[productIndex] = { id: productId, name, price };
  res.json(products[productIndex]);
});

app.delete("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  products.splice(productIndex, 1);

  res.status(204).send();
});
// FIN RUTAS
//middlewarw para "not found"
app.use((req, res, next) => {
  res.status(404).json({ error: "Recurso no encontrado o ruta inválida" });
});
const PORT = 3000;

app.listen(PORT,()=>console.log(`http://localhost:${PORT}`));