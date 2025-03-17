
import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export interface HistoryItem {
  id: string;
  query: string;
  collection: string;
  timestamp: Date;
}

interface HistoryContextType {
  history: HistoryItem[];
  addToHistory: (query: string, collection: string) => void;
  clearHistory: () => void;
  filterByDate: (date: Date | null) => void;
  filterByCollection: (collection: string | null) => void;
  filteredHistory: HistoryItem[];
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
};

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const savedHistory = localStorage.getItem("chat_history");
    return savedHistory
      ? JSON.parse(savedHistory).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }))
      : [];
  });
  
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [collectionFilter, setCollectionFilter] = useState<string | null>(null);
  const [filteredHistory, setFilteredHistory] = useState<HistoryItem[]>(history);

  useEffect(() => {
    localStorage.setItem("chat_history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    let filtered = [...history];
    
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filterDate.setHours(0, 0, 0, 0);
      
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.timestamp);
        itemDate.setHours(0, 0, 0, 0);
        return itemDate.getTime() === filterDate.getTime();
      });
    }
    
    if (collectionFilter) {
      filtered = filtered.filter(item => 
        item.collection === collectionFilter
      );
    }
    
    setFilteredHistory(filtered);
  }, [history, dateFilter, collectionFilter]);

  const addToHistory = (query: string, collection: string) => {
    const newItem: HistoryItem = {
      id: uuidv4(),
      query,
      collection,
      timestamp: new Date(),
    };
    
    setHistory(prev => [newItem, ...prev]);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("chat_history");
  };

  const filterByDate = (date: Date | null) => {
    setDateFilter(date);
  };

  const filterByCollection = (collection: string | null) => {
    setCollectionFilter(collection);
  };

  return (
    <HistoryContext.Provider
      value={{
        history,
        addToHistory,
        clearHistory,
        filterByDate,
        filterByCollection,
        filteredHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
