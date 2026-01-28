
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:5500",
  "https://manager-tasks-green.vercel.app/"
];

const corsOptions = {
  origin: (origin, callback) => {

    if(!origin) return callback(null, true); 

    if(allowedOrigins.includes(origin)){
      callback(null, true);

    }else{
      console.log("Origin bloqueada:", origin); 
      callback(null, false);
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}

export default corsOptions; 