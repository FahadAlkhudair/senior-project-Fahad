module.exports={
    cors:{
        origin: "http://localhost:8081"
    },
    mongoDBConectionString: "mongodb+srv://falkhudair:Leopard-321@cluster0.golvl.mongodb.net/?retryWrites=true&w=majority",
    jwt:{
        Secret: "online-blood-management-system-key",
        tokenTTL: 3600,         // 1 Hour
        refreshTokenTTL: 86400, // 24 Hours
        rounds: 10              // Rounds for Salt Generation
    }
}