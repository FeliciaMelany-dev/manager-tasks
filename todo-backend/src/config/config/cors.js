
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3000/api-docs",
  "http://localhost:5500",
  "https://meufrotend.vercel.app"
];

const corsOptions = {
  origin: (origin, callback) => {
    if(!origin) return callback(null, true); // permite chamadas sem origin (Postman/Swagger)
    if(allowedOrigins.includes(origin)){
      callback(null, true);
    }else{
      console.log("Origin bloqueada:", origin); // útil para debug
      callback(null, false); // não gera erro 500
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}

export default corsOptions; 