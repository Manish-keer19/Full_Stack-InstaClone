import { Server, Socket } from "socket.io";

export const initializeSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    // Listen for incoming messages
    socket.on("sendMessage", (message) => {
      console.log(`Message received: ${message.text}`);
      io.emit("receiveMessage", message); // Broadcast to all clients
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
