"use client";

import useChatAction from "@/actions/useChatAction";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";

interface ChatMessage {
  AI: string | null;
  USER: string;
}

const AIModel: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { AI: "Hello! How can I assist you today?", USER: "" },
  ]);
  const [loading, setLoading] = useState(false);

  const handleAskQuestion = async (form: FormData) => {
    const input = form.get("userInput") as string;
    if (!input) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { USER: input, AI: "loading..." },
    ]);

    setLoading(true);
    const { aiChat } = await useChatAction(input);
    setLoading(false);

    setMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      newMessages[newMessages.length - 1] = { USER: input, AI: aiChat };
      return newMessages;
    });
  };

  return (
    <main className="flex flex-col items-center  text-black">
      {/* Chat History */}
      <section className="w-full max-w-lg flex flex-col rounded-lg h-[70vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-3 text-center">
          Chat Assistant
        </h2>
        <div className="space-y-3">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col gap-2"
              >
                {msg.USER && (
                  <motion.div
                    className="self-end bg-blue-500 text-white px-4 py-2 rounded-2xl max-w-xs shadow-md"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {msg.USER}
                  </motion.div>
                )}
                <motion.div
                  className="self-start bg-gray-700 text-white px-4 py-2 rounded-2xl max-w-xs shadow-md"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {msg.AI === "loading..." ? (
                    <span className="animate-pulse">Thinking...</span>
                  ) : (
                    msg.AI
                  )}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Input Form */}
      <section className="w-full max-w-lg mt-4">
        <form
          action={handleAskQuestion}
          className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg shadow-md"
        >
          <input
            name="userInput"
            required
            className="w-full bg-transparent placeholder:text-gray-400 text-sm border-none rounded-md px-3 py-2 text-white focus:outline-none"
            placeholder="Ask me anything..."
          />
          <button
            className="bg-blue-500 p-2 rounded-lg text-white hover:bg-blue-600 transition flex items-center justify-center"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-pulse">...</span>
            ) : (
              <Send size={18} />
            )}
          </button>
        </form>
      </section>
    </main>
  );
};

export default AIModel;
