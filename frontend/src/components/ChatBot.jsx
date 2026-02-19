import React, { useState } from 'react';
import { MessageSquare, Send, X, Bot } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I'm Geneqi AI. How can I help you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { text: input, sender: 'user' };
        setMessages([...messages, userMsg]);
        setInput('');

        try {
            const res = await axios.post(`${config.API_URL}/api/ai/chat`, { message: input });
            const botMsg = { text: res.data.message, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);

            if (res.data.route && res.data.route !== '/') {
                setTimeout(() => {
                    if (window.confirm(`Would you like to go to the ${res.data.intent} section?`)) {
                        navigate(res.data.route);
                        setIsOpen(false);
                    }
                }, 1000);
            }
        } catch (err) {
            setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting to my brain right now.", sender: 'bot' }]);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="btn btn-primary w-14 h-14 rounded-full shadow-2xl flex items-center justify-center p-0"
                >
                    <MessageSquare size={28} />
                </button>
            ) : (
                <div className="card w-80 md:w-96 h-[500px] flex flex-col p-0 overflow-hidden shadow-2xl border-primary/20">
                    <div className="bg-primary p-4 text-white flex justify-between items-center">
                        <div className="flex items-center gap-2 font-bold">
                            <Bot size={20} /> Geneqi AI
                        </div>
                        <button onClick={() => setIsOpen(false)}><X size={20} /></button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.sender === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white shadow-sm border rounded-tl-none text-gray-800'}`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSend} className="p-4 bg-white border-t flex gap-2">
                        <input
                            type="text"
                            className="flex-1 p-2 border rounded-full text-sm focus:ring-1 ring-primary outline-none text-gray-800"
                            placeholder="Ask about scholarships..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" className="bg-primary text-white p-2 rounded-full">
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
