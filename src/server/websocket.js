import { Server } from 'socket.io';
import { createServer } from 'http';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const connectedUsers = new Map();
const activeDeliveries = new Map();

io.use((socket, next) => {
  const userId = socket.handshake.auth.userId;
  if (!userId) {
    return next(new Error("Invalid user ID"));
  }
  socket.userId = userId;
  next();
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.userId}`);
  connectedUsers.set(socket.userId, socket.id);

  socket.on('location:update', ({ deliveryId, location }) => {
    io.to(`delivery:${deliveryId}`).emit(`location:${deliveryId}`, location);
    activeDeliveries.set(deliveryId, {
      ...activeDeliveries.get(deliveryId),
      currentLocation: location
    });
  });

  socket.on('bid:new', ({ deliveryId, bid }) => {
    io.to(`delivery:${deliveryId}`).emit(`bids:${deliveryId}`, bid);
  });

  socket.on('delivery:status', ({ deliveryId, status }) => {
    io.to(`delivery:${deliveryId}`).emit(`delivery:${deliveryId}`, { status });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.userId}`);
    connectedUsers.delete(socket.userId);
  });
});

const PORT = process.env.WS_PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});