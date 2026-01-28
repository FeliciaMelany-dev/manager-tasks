import express from 'express';
import task from './routes/routeTask.js';
import { logger } from './middlewares/logger.js';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from './docs/swagger.js';
import cors from "cors";
import corsOptions from './config/config/cors.js';
import dotenv from "dotenv";

dotenv.config()

const app = express();

const isProduction = process.env.NODE_ENV === "production";

if(!isProduction){
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());


function validateId(req, res, next) {
  if (!req.params.id) {
    return res.status(400).json({ error: "O ID é obrigatório na URL." });
  }
  next();
}

app.use('/task/:id', validateId); 
app.use('/task', task);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    res.status(status).json({ error: error.message });
});


export default app;