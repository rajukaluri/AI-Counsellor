import React, { useState, useEffect, useRef } from "react";

export default function ChatAI({ userProfile }) {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: `Hi ${userProfile?.fullName || 'there'}! I see you're interested in ${userProfile?.major || 'studying abroad'}. How can I help you today?`, 
      sender: "ai" 
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userText) => {
    const text = userText.toLowerCase();
    const gpa = parseFloat(userProfile?.gpa);
    
    // Logic: AI understands your GPA
    if (text.includes("chance") || text.includes("gpa")) {
      if (gpa >= 9.0) return `With your impressive GPA of ${gpa}, you have a strong shot at "Dream" schools like Stanford or MIT!`;
      if (gpa >= 7.5) return `Your ${gpa} GPA is solid. You should focus on "Target" schools in the UK or Canada.`;
      return `A GPA of ${gpa} is a starting point. Let's look at universities in Germany where they value specific subject credits!`;
    }

    // Logic: AI understands your Budget
    if (text.includes("money") || text.includes("cost") || text.includes("budget")) {
      return `Based on your yearly budget of $${userProfile?.budget}, I recommend looking at ${userProfile?.targetCountry === 'Germany' ? 'Public Universities in Germany' : 'Scholarship programs in ' + userProfile?.targetCountry}.`;
    }

    // Default Response
    return `That's interesting! Tell me more about why you want to study ${userProfile?.major} in ${userProfile?.targetCountry}.`;
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    
    const currentInput = input;
    setInput("");

    // AI "Thinking" delay
    setTimeout(() => {
      const aiMsg = { 
        id: Date.now() + 1, 
        text: generateAIResponse(currentInput), 
        sender: "ai" 
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 800);
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
            <p style={{ fontSize: '0.9rem', margin: 0 }}>{m.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button type="submit" className="chat-send-btn">Send</button>
      </form>
    </div>
  );
}