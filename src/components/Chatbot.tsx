import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hi! I\'m your Think Plus Education assistant. How can I help you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');

  const quickReplies = [
    'Course information',
    'Fee structure',
    'Study materials',
    'Contact support'
  ];

  const botResponses: { [key: string]: string } = {
    'course information': 'We offer comprehensive courses for CAT, IPMAT, CLAT, and other competitive exams. Each course includes video lectures, study materials, weekly tests, and personalized guidance.',
    'fee structure': 'Our courses range from ₹14,999 to ₹39,999 depending on the program. We also offer combo packages at discounted rates. Would you like details on a specific course?',
    'study materials': 'All enrolled students get access to comprehensive study materials including video lectures, PDF notes, practice questions, and mock tests. Materials are available 24/7 on our platform.',
    'contact support': 'You can reach our support team at support@thinkplus.edu or call us at +91-XXXX-XXXXXX. We\'re available Monday to Saturday, 9 AM to 6 PM.',
    default: 'Thank you for your question! For detailed information, please contact our support team or explore our courses section. Is there anything specific I can help you with?'
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      type: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let responseText = botResponses.default;

      for (const [key, value] of Object.entries(botResponses)) {
        if (lowerInput.includes(key)) {
          responseText = value;
          break;
        }
      }

      const botMessage = {
        type: 'bot',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                size="lg"
                onClick={() => setIsOpen(true)}
                className="rounded-full w-16 h-16 shadow-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 hover:shadow-blue-500/50"
              >
                <MessageCircle className="w-7 h-7" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="fixed bottom-6 right-6 w-96 z-50"
          >
            <Card className="shadow-2xl overflow-hidden border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                  >
                    <MessageCircle className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-white">Chat Support</h3>
                    <p className="text-xs text-blue-100">We're here to help!</p>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </motion.div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950">
                {messages.map((message, idx) => (
                  <div
                    key={idx}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 transition-all hover:scale-[1.02] ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Replies */}
              {messages.length === 1 && (
                <div className="px-4 py-2 bg-white dark:bg-gray-900 border-t dark:border-gray-800">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Quick replies:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all hover:scale-105"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 bg-white dark:bg-gray-900 border-t dark:border-gray-800 rounded-b-lg">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                  <Button
                    onClick={handleSend}
                    size="icon"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 transition-all hover:scale-110"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}