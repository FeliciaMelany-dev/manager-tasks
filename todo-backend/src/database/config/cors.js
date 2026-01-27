

const corsOptions = {
  origin: (origin, callback) =>{
    if(!origin) return callback(null, true);
  
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:5500",
      "https://meufrotend.vercel.app" //futuramente
    ];

    if(allowedOrigins.includes(origin)){
      callback(null, true);
    }else{
      callback(new Error("Origin não permitida"));
    }
  },

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  
}

export default corsOptions; 