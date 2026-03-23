const { createServer } = require('http');
const next = require('next');
const {Server} = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(()=>{
    const httpServer = createServer((req, res)=>{
     handle(req, res);  
    });

    const io = new Server(httpServer, {
        path: '/api/socket',
        cors: {
            origin: '*',
        },
    });


io.on('connection', (socket)=>{
    console.log('🟢 Socket connected!', socket.id);

    socket.on('join-room', (roomId)=>{
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    socket.on('send-message', (data)=> {
        console.log('Message received:', data);
        io.to(data.roomId).emit('receive-message',{
            ...data,
            timestamp: new Date().toISOString(),
        });
    });

    socket.on('disconnect', ()=>{
        console.log('Socket disconnected:', socket.id);
    });
});

httpServer.listen(port, ()=> {
    console.log(`> Ready on http://${hostname}:${port}`);
});
});