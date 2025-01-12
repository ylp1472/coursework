const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admins');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const reservationRoutes = require('./routes/reservations');
const orderRoutes = require('./routes/orders');
const reviewRoutes = require('./routes/reviews');
const ticketRoutes = require('./routes/tickets');
const notificationRoutes = require('./routes/notifications');
const searchRoutes = require('./routes/search');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
		allowedHeaders: ["Content-Type"],
		credentials: true
	}
});
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
	origin: "http://localhost:3000",
	methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
	.then(() => console.log('MongoDB connected'))
	.catch(err => {
		console.error('MongoDB connection error:', err);
		process.exit(1);
	});

// Define routes
app.get('/', (req, res) => {
	res.send('Hello World!');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/search', searchRoutes);

// Socket.io configuration and real-time events
io.on('connection', (socket) => {
	console.log('A user connected');

	// Listen for incoming chat messages
	socket.on('chat message', (msg) => {
		console.log('Received message: ', msg);
		io.emit('chat message', msg);  // Broadcast message to all connected clients
	});

	// Listen for user disconnection
	socket.on('disconnect', () => {
		console.log('A user disconnected');
	});
});

// Start server
server.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
