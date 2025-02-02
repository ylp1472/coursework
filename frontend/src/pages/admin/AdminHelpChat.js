import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

import AdminNavbar from '../../components/admin/Navbar';
import SideMenu from '../../components/admin/SideMenu';

const socket = io('http://ec2-13-215-205-31.ap-southeast-1.compute.amazonaws.com:8000', {
	withCredentials: true,
	transports: ['websocket', 'polling']
});

function AdminHelpChatPage() {
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');
	const [connected, setConnected] = useState(false);
	const messageContainerRef = useRef(null);
	const inputRef = useRef(null);

	useEffect(() => {
		// Connection event handlers
		socket.on('connect', () => {
			console.log('Connected to server');
			setConnected(true);
		});

		socket.on('connect_error', (error) => {
			console.error('Connection error:', error);
			setConnected(false);
		});

		socket.on('chat message', (msg) => {
			setMessages(prevMessages => [...prevMessages, msg]);
		});

		return () => {
			socket.off('connect');
			socket.off('connect_error');
			socket.off('chat message');
		};
	}, []);

	const sendMessage = () => {
		if (message.trim() && connected) {
			const messageData = {
				text: message,
				sender: 'Admin',
				timestamp: new Date().toISOString(),
				isUser: false
			};
			socket.emit('chat message', messageData);
			setMessage('');
			inputRef.current?.focus();
			setTimeout(scrollToBottom, 100);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	const scrollToBottom = () => {
		messageContainerRef.current?.scrollTo({
			top: messageContainerRef.current.scrollHeight,
			behavior: 'smooth'
		});
	};

	return (
		<>
			<div className="h-screen w-full flex flex-row">
				<SideMenu />

				<div className="h-full w-4/5 flex flex-col bg-gray-100">
					<AdminNavbar />

					<div className="w-full flex" style={{ height: 'calc(100% - 70px)' }}>
						<div className="w-full h-full flex flex-col gap-4 container mx-auto p-4">
							<div className="h-full w-full flex flex-col gap-4 container mx-auto text-black bg-white border rounded">
								{/* Socket Start */}
								<div className="w-full h-full flex flex-col">
									<div className="w-full h-[60px] flex flex-row items-center justify-between text-sm font-semibold p-4 bg-white border-b rounded-t">
										Help Chat
										<span className={`flex flex-row justify-center items-center gap-1 text-xs font-normal uppercase ${connected ? 'text-green-600' : 'text-red-600'}`}>
											<svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="currentColor" className="animate-pulse">
												<path stroke="none" d="M0 0h24v24H0z" fill="none" />
												<path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
											</svg>
											{connected ? 'Connected' : 'Disconnected'}
										</span>
									</div>
									<div
										ref={messageContainerRef}
										className="w-full h-full bg-gray-200 overflow-auto"
									>
										<div className="flex-1 p-4">
											{messages.map((msg, index) => (
												<div
													key={index}
													className={`mb-2 px-4 py-4 text-sm shadow-md w-fit ${msg.isUser ? 'text-black bg-zinc-50 mr-auto rounded-tl-sm rounded-tr-3xl rounded-br-3xl rounded-bl-3xl' : 'text-white bg-red-500 ml-auto rounded-tl-3xl rounded-tr-sm rounded-br-3xl rounded-bl-3xl'} max-w-[70%]`}
												>
													<div className={`font-semibold text-xs ${msg.isUser ? 'text-red-500 text-left' : 'text-white text-right'}`}>
														{msg.sender}
													</div>
													<div className={`my-1 ${msg.isUser ? 'text-black text-left' : 'text-white text-right'}`}>{msg.text}</div>
													<div className={`text-xs ${msg.isUser ? 'text-gray-400 text-left' : 'text-red-300 text-right'}`}>
														{new Date(msg.timestamp).toLocaleTimeString('en-US', {
															hour: '2-digit',
															minute: '2-digit',
															hour12: true
														})}
													</div>
												</div>
											))}
										</div>
									</div>
									<div className="relative bottom-0 p-4 border-t">
										<div className="flex gap-4">
											<input
												ref={inputRef}
												type="text"
												value={message}
												onChange={(e) => setMessage(e.target.value)}
												onKeyDown={handleKeyDown}
												placeholder="Type your message"
												className="flex-1 px-2 py-2 text-xs border rounded"
											/>
											<button
												onClick={sendMessage}
												disabled={!connected}
												className="px-3 py-2 text-xs bg-red-500 hover:bg-red-400 text-white rounded disabled:text-white disabled:bg-gray-400"
											>
												<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-send-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" /><path d="M6.5 12h14.5" /></svg>
											</button>
										</div>
									</div>
								</div>
								{/* Socket End */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AdminHelpChatPage;