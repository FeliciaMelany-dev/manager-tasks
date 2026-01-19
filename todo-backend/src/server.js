import app from "./app.js";
import dotenv from "dotenv";

dotenv.config()

const PORT = process.env.PORT;

app.get('/', (req, res) =>(
    res.status(400).send("Servidor funcionando")
))

app.listen(PORT, () =>{
    console.log(`Servidor rodando!`)
});
