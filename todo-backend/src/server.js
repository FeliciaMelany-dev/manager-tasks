import app from "./app.js";
import dotenv from "dotenv";

dotenv.config()

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) =>(
    res.status(200).send("Servidor funcionando")
))

app.listen(PORT, () =>{
    console.log(`Servidor up!, rodando na porta ${PORT}`)
});
