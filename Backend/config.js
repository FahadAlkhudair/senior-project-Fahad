module.exports={
    cors:{
        origin: "http://localhost:8081"
    },
    mongoDBConectionString: "mongodb+srv://fahadalkhudair:Leopard-321@cluster0.jdill.mongodb.net/?retryWrites=true&w=majority",
    jwt:{
        Secret: "online-blood-management-system-key",
        tokenTTL: 86400,         // 24 Hour
        refreshTokenTTL: 172800, // 24 Hours
        rounds: 10              // Rounds for Salt Generation
    }
}