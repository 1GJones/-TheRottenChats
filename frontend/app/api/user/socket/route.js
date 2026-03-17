import { NextResponse } from "next/server";
import { Server } from "socket.io";

let io;

export async function GET(){
    if (!io){
        // Attach Socket.IO to the existing Next.js server 
        // In dev, this will be created on first GET /api/socet
        io = new Server(globalThis._httpServer || 3001, {
            cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
        });

        io.on("connection", (socket) => {
            console.log("User connected:", socket.id);

            // Join a room, e.g "public"
            socket.on("join-room", (roomId) => {
                socket.join(roomId);
                console.log(`Socket ${socket.id} joined room ${roomId}`);
            });
           
            //Receive and broadcast message in a room
            socket.on("send-message", ({ roomId, email, message })=>{
                const payload = {
                    email,
                    message,
                    timestamp: new Date().toISOString(),
                };
                io.to(roomId).emit("receive-message", payload);
            });
            
        socket.on("disconnect", ()=> {
            console.log("User disconnect:", socket.id);
        });
    });
}
return NextResponse.json({ status: "ok"});
}