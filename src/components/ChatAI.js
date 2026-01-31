import React, { useState, useEffect, useRef } from "react";

export default function ChatAI({ userProfile }) {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: `Hi ${userProfile?.fullName || 'there'}! I'm Gemini, your AI counsellor. Ready to talk about ${userProfile?.major || 'your studies'}?`, 
      sender: "ai" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // This is the logic you requested, integrated into the component
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userInput = input;
    const userMsg = { id: Date.now(), text: userInput, sender: "user" };
    
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const BACKEND_URL = "https://ai-counsellor-server-rb2b.onrender.com/api/chat";

    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userInput,
          profile: userProfile // Passing the profile for personalized advice
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const aiMsg = { 
          id: Date.now() + 1, 
          text: data.reply, 
          sender: "ai" 
        };
        setMessages(prev => [...prev, aiMsg]);
      } else {
        throw new Error(data.error || "Server error");
      }
    } catch (err) {
      console.error("Connection failed:", err);
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: "I'm having trouble connecting to my server. Please wait a moment for the Render server to wake up and try again!", 
        sender: "ai" 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="glass-card chat-wrapper fade-in" style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
      <div className="chat-messages-container" style={{ flex: 1, overflowY: 'auto', marginBottom: '15px', paddingRight: '10px' }}>
        {messages.map((m) => (
          <div key={m.id} className={`msg-bubble ${m.sender === "user" ? "user-msg" : "ai-msg"}`} style={{ 
            marginBottom: '15px', 
            padding: '12px', 
            borderRadius: '15px',
            maxWidth: '85%',
            alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
            background: m.sender === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
            border: m.sender === 'ai' ? '1px solid var(--glass-border)' : 'none',
            marginLeft: m.sender === 'user' ? 'auto' : '0'
          }}>
            <p style={{ fontSize: '0.9rem', margin: 0, color: 'white' }}>{m.text}</p>
          </div>
        ))}
        {isTyping && <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>AI is thinking...</p>}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your chances..."
          disabled={isTyping}
          className="chat-input"
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
        />
        <button type="submit" className="chat-send-btn" disabled={isTyping} style={{ padding: '10px 15px', borderRadius: '8px', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer' }}>
          {isTyping ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}