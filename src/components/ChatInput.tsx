
import React, { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  disabled = false,
  placeholder = "Type your question about the document...",
}) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 rounded-lg border bg-card/50 p-3 backdrop-blur-sm">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="min-h-[60px] resize-none border-0 bg-transparent p-2 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <Button
        size="icon"
        type="submit"
        disabled={!message.trim() || disabled}
        onClick={handleSend}
        className="h-10 w-10 shrink-0"
      >
        <SendHorizontal className="h-5 w-5" />
        <span className="sr-only">Send message</span>
      </Button>
    </div>
  );
};

export default ChatInput;
