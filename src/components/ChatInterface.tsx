
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { MessageSquareDashed } from "lucide-react";
import FileUpload from "./FileUpload";
import CollectionSelector from "./CollectionSelector";
import ChatMessage, { Message } from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatInterface: React.FC = () => {
  const [collections, setCollections] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleUploadComplete = (fileName: string) => {
    // In a real app, you'd get the actual collection name from your backend
    const collectionName = fileName.replace(".pdf", "");
    
    if (!collections.includes(collectionName)) {
      setCollections((prev) => [...prev, collectionName]);
    }
    
    setSelectedCollection(collectionName);
    
    // Add a system message indicating successful upload
    const newMessage: Message = {
      id: uuidv4(),
      content: `<p>I've successfully processed <strong>${fileName}</strong>. You can now ask questions about this document.</p>`,
      role: "assistant",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedCollection) {
      toast({
        variant: "destructive",
        title: "No collection selected",
        description: "Please select a document collection first.",
      });
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    // Add loading message for the assistant
    const loadingMessageId = uuidv4();
    const loadingMessage: Message = {
      id: loadingMessageId,
      content: "",
      role: "assistant",
      timestamp: new Date(),
      loading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setIsProcessing(true);

    // Simulate API call to backend
    try {
      // In a real app, you'd make an actual API call here
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Replace loading message with actual response
      const assistantMessage: Message = {
        id: loadingMessageId,
        content: `<p>This is a simulated response to your question about <strong>${selectedCollection}</strong>. In an actual implementation, this would be answered by an AI backend based on the content of your document.</p>`,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) =>
        prev.map((msg) => (msg.id === loadingMessageId ? assistantMessage : msg))
      );
    } catch (error) {
      // Handle error
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get a response. Please try again.",
      });

      // Remove the loading message
      setMessages((prev) => prev.filter((msg) => msg.id !== loadingMessageId));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid h-[calc(100vh-9rem)] grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {/* Sidebar */}
      <div className="flex flex-col space-y-6 md:col-span-1">
        <FileUpload onUploadComplete={handleUploadComplete} />
        
        {collections.length > 0 && (
          <CollectionSelector
            collections={collections}
            selectedCollection={selectedCollection}
            onSelect={setSelectedCollection}
          />
        )}
      </div>

      {/* Chat Area */}
      <div className="flex flex-col rounded-lg border bg-card/20 md:col-span-2 lg:col-span-3">
        <div className="flex items-center gap-2 border-b p-4">
          <MessageSquareDashed className="h-5 w-5 text-primary" />
          <h2 className="font-medium">
            {selectedCollection
              ? `Chat with ${selectedCollection}`
              : "Upload a document to start chatting"}
          </h2>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1">
          <div className="flex flex-col divide-y">
            {messages.length > 0 ? (
              messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center p-12 text-center">
                <div className="rounded-full bg-muted/50 p-4">
                  <MessageSquareDashed className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No messages yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Upload a document and start asking questions to get insights from your files.
                </p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t p-4">
          <ChatInput
            onSend={handleSendMessage}
            disabled={!selectedCollection || isProcessing}
            placeholder={
              !selectedCollection
                ? "Please select a document collection first..."
                : "Ask a question about your document..."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
