
import React, { useState } from "react";
import { Check, ChevronDown, ChevronUp, FolderOpen } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CollectionSelectorProps {
  collections: string[];
  selectedCollection: string | null;
  onSelect: (collection: string) => void;
}

const CollectionSelector: React.FC<CollectionSelectorProps> = ({
  collections,
  selectedCollection,
  onSelect,
}) => {
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center gap-2">
        <FolderOpen className="h-4 w-4 text-primary" />
        <label htmlFor="collection-select" className="text-sm font-medium">
          Select Document Collection
        </label>
      </div>
      <Select
        value={selectedCollection || ""}
        onValueChange={onSelect}
      >
        <SelectTrigger className="w-full bg-card/50 backdrop-blur-sm">
          <SelectValue placeholder="Choose a collection" />
        </SelectTrigger>
        <SelectContent>
          {collections.length > 0 ? (
            collections.map((collection) => (
              <SelectItem key={collection} value={collection}>
                {collection}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no-collections" disabled>
              No collections available
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CollectionSelector;
