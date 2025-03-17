
import React from "react";
import ChatInterface from "@/components/ChatInterface";
import { useHistory, HistoryProvider } from "@/contexts/HistoryContext";

// This component checks if the HistoryContext is already available
const HistoryContextAwareWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  try {
    // Try to use the context to see if it's already available
    useHistory();
    // If no error is thrown, the context is available, so just render children
    return <>{children}</>;
  } catch (e) {
    // If an error is thrown, the context is not available, so wrap with provider
    return <HistoryProvider>{children}</HistoryProvider>;
  }
};

const Dashboard: React.FC = () => {
  return (
    <HistoryContextAwareWrapper>
      <div className="container py-6">
        <ChatInterface />
      </div>
    </HistoryContextAwareWrapper>
  );
};

export default Dashboard;
