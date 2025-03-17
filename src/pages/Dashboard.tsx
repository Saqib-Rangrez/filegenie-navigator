
import React from "react";
import ChatInterface from "@/components/ChatInterface";
import { HistoryProvider } from "@/contexts/HistoryContext";

const Dashboard: React.FC = () => {
  return (
    <HistoryProvider>
      <div className="container py-6">
        <ChatInterface />
      </div>
    </HistoryProvider>
  );
};

export default Dashboard;
