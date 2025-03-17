
import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X, Clock, Search, Trash2 } from "lucide-react";
import { useHistory, HistoryItem } from "@/contexts/HistoryContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface HistorySidebarProps {
  open: boolean;
  onClose: () => void;
  collections: string[];
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ open, onClose, collections }) => {
  const { filteredHistory, filterByDate, filterByCollection, clearHistory } = useHistory();
  const [date, setDate] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDateSelect = (date: Date | null) => {
    setDate(date);
    filterByDate(date);
  };

  const handleCollectionSelect = (collection: string) => {
    filterByCollection(collection === "all" ? null : collection);
  };

  const handleClearHistory = () => {
    clearHistory();
    setDate(null);
    setSearchTerm("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredBySearch = searchTerm 
    ? filteredHistory.filter(item => 
        item.query.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredHistory;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:max-w-[425px]">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Query History
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        
        <div className="py-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search queries..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <Button
              variant="destructive"
              size="icon"
              onClick={handleClearHistory}
              title="Clear all history"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Filter by date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Select onValueChange={handleCollectionSelect}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Filter by collection" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Collections</SelectItem>
                {collections.map((collection) => (
                  <SelectItem key={collection} value={collection}>
                    {collection}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <ScrollArea className="h-[calc(100vh-250px)]">
            {filteredBySearch.length > 0 ? (
              <div className="space-y-4">
                {filteredBySearch.map((item) => (
                  <HistoryCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <Clock className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No history found</p>
              </div>
            )}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const HistoryCard: React.FC<{ item: HistoryItem }> = ({ item }) => {
  return (
    <div className="border rounded-md p-3 hover:bg-muted/50 transition-colors">
      <div className="flex justify-between items-start mb-1">
        <span className="font-medium text-sm">{item.collection}</span>
        <span className="text-xs text-muted-foreground">
          {format(new Date(item.timestamp), "MMM d, yyyy • h:mm a")}
        </span>
      </div>
      <p className="text-sm line-clamp-2">{item.query}</p>
    </div>
  );
};

export default HistorySidebar;
