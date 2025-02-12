"use client";

import useChatAction from "@/actions/useChatAction";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <main className="flex flex-col items-center">
      {/* Chat History */}
      <section className="w-full text-white p-4 rounded-md mb-4 h-80 overflow-y-scroll hideBar">
        <h2 className="text-lg font-semibold mb-2">Chat History</h2>
        <div className="space-y-3">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col gap-3"
              >
                {/* User Message */}
                {msg.USER && (
                  <motion.div
                    className="self-end bg-blue-500 text-white px-4 py-2 rounded-md max-w-xs"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {msg.USER}
                  </motion.div>
                )}

                {/* AI Message (Show loading if response is pending) */}
                <motion.div
                  className="self-start bg-gray-700 text-white px-4 py-2 rounded-md max-w-xs"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {msg.AI === null ? (
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
      <section className="w-full max-w-md">
        <form
          action={handleAskQuestion}
          className="w-full flex items-center gap-3"
        >
          <input
            name="userInput"
            required
            className="w-full bg-transparent placeholder:text-slate-400 text-sm border border-slate-400 rounded-md pl-3 pr-28 py-2 text-black focus:outline-none focus:border-slate-500 hover:border-slate-300 shadow-sm transition"
            placeholder="Ask About Your Order..."
          />
          <button
            className="border p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
            type="submit"
            disabled={loading}
          >
            {loading ? "..." : "Send"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default AIModel;
