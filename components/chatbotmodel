import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

export default function ChatbotModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => base44.auth.me()
  });

  const { data: diseases = [] } = useQuery({
    queryKey: ['diseases'],
    queryFn: () => base44.entities.Disease.list('name', 100)
  });

  const { data: medicineInfo = [] } = useQuery({
    queryKey: ['medicine-info'],
    queryFn: () => base44.entities.MedicineInfo.list('name', 100)
  });

  useEffect(() => {
    if (isOpen && user && messages.length === 0) {
      setMessages([
        { role: 'bot', text: `Hello, ${user.full_name || 'there'}. I am your health assistant. I can help you with:\n\n- Understanding symptoms and diseases\n- Learning about medicines and their uses\n- Getting precautions for health conditions\n\nHow can I assist you today?` }
      ]);
    }
  }, [isOpen, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Prepare context from datasets
      const diseaseContext = diseases.map(d => 
        `Disease: ${d.name}\nSymptoms: ${d.symptoms?.join(', ')}\nPrecautions: ${d.precautions?.join(', ')}\n`
      ).join('\n');

      const medicineContext = medicineInfo.map(m => 
        `Medicine: ${m.name}${m.generic_name ? ` (${m.generic_name})` : ''}\nUses: ${m.uses?.join(', ')}\n${m.side_effects ? `Side Effects: ${m.side_effects.join(', ')}` : ''}\n`
      ).join('\n');

      const prompt = `You are a professional health assistant chatbot. A user asked: "${userMessage}"

Here is the disease database:
${diseaseContext}

Here is the medicine database:
${medicineContext}

User's current health conditions: ${user?.health_conditions?.join(', ') || 'None specified'}

IMPORTANT INSTRUCTIONS:
- Provide a helpful, accurate response based ONLY on the available data above
- If the question is about symptoms, match them with diseases in the database
- If it is about medicines, provide information from the medicine database
- Always remind users to consult healthcare professionals for proper diagnosis and treatment
- Write in a professional, clear, and formal tone
- Do NOT use emojis, special symbols, or decorative characters
- Use simple dashes (-) for bullet points, not fancy symbols
- Keep the response concise and well-structured
- Use proper capitalization and punctuation
- Do not use asterisks, markdown formatting, or any special characters except basic punctuation

Format your response professionally without any special characters.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: prompt,
        add_context_from_internet: false
      });

      // Clean response to remove any unwanted special characters
      const cleanedResponse = response
        .replace(/[*_~`]/g, '') // Remove markdown characters
        .replace(/[•●◆■▪▫]/g, '-') // Replace special bullets with dashes
        .replace(/[\u{1F300}-\u{1F9FF}]/gu, '') // Remove emojis
        .replace(/[\u{2600}-\u{26FF}]/gu, '') // Remove misc symbols
        .replace(/[\u{2700}-\u{27BF}]/gu, '') // Remove dingbats
        .trim();

      setMessages(prev => [...prev, { role: 'bot', text: cleanedResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: 'I apologize, but I encountered an error. Please try again or consult with a healthcare professional.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#5FA8D3]">
            <Bot className="w-5 h-5" />
            Health Assistant Chatbot
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-[#F2F2F2] rounded-xl">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-[#5FA8D3] text-white rounded-br-sm' 
                    : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
                }`}>
                  <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-2xl rounded-bl-sm shadow-sm p-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#63C7B2]" />
                    <span className="text-sm text-gray-600">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Ask about symptoms, diseases, or medicines..."
              className="flex-1 rounded-xl border-gray-200"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSend}
              className="bg-[#63C7B2] hover:bg-[#5FA8D3] rounded-xl px-4"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
