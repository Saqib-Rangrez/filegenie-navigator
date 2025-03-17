
import React from "react";
import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  loading?: boolean;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full gap-3 p-4",
        isUser ? "bg-muted/30" : "bg-background"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        )}
      >
        {isUser ? (
          <User className="h-5 w-5" />
        ) : (
          <Bot className="h-5 w-5" />
        )}
      </div>

      <div className="flex-1 space-y-2">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {message.loading ? (
            <>
              <Skeleton className="h-4 w-2/3 rounded" />
              <Skeleton className="mt-2 h-4 w-1/2 rounded" />
            </>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: message.content }} />
          )}
        </div>
        <div className="text-xs text-muted-foreground">
          {message.loading
            ? "Generating response..."
            : message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
