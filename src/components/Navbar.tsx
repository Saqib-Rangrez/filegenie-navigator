
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Clock, Menu, X, MessageSquare } from "lucide-react";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [filteredCollections, setFilteredCollections] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Mock data for collections
  const collections = [
    "Annual Report 2023", 
    "Product Specifications", 
    "User Manual", 
    "Legal Documents",
    "Research Papers"
  ];

  // Filter collections based on search term
  const filterCollections = () => {
    if (!searchTerm.trim()) {
      setFilteredCollections([]);
      return;
    }
    
    const filtered = collections.filter(
      (collection) => 
        collection.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCollections(filtered);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update filtered collections when search term changes
  useEffect(() => {
    filterCollections();
  }, [searchTerm]);

  const selectCollection = (collection: string) => {
    setSearchTerm(collection);
    setIsDropdownOpen(false);
  };

  const saveSearch = () => {
    if (searchTerm) {
      console.log("Saving search:", searchTerm);
      // Here you would implement your save functionality
    }
  };

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md",
      className
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo and brand */}
        <div className="flex items-center space-x-4">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-foreground transition-opacity hover:opacity-80"
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-6 w-6"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span className="font-medium tracking-tight">FileGenie</span>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="md:hidden flex items-center" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? 
            <X className="h-5 w-5" /> : 
            <Menu className="h-5 w-5" />
          }
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex flex-1 items-center justify-center px-2">
          <div ref={searchRef} className="relative w-full max-w-md mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder="Search collection"
                className="search-input pl-9 pr-12"
              />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={saveSearch}
                className="absolute right-1 h-7"
              >
                Save
              </Button>
            </div>
            
            {isDropdownOpen && filteredCollections.length > 0 && (
              <div className="search-dropdown">
                <ul className="py-1">
                  {filteredCollections.map((collection, index) => (
                    <li 
                      key={index}
                      onClick={() => selectCollection(collection)}
                      className="search-dropdown-item"
                    >
                      {collection}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Auth and History buttons */}
        <div className="hidden md:flex items-center space-x-1">
          <Link to="/dashboard">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-foreground/80 hover:text-foreground"
              title="Go to Chat"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-foreground/80 hover:text-foreground"
            title="View Chat History"
          >
            <Clock className="h-5 w-5" />
          </Button>
          <div className="h-4 border-r border-border mx-1" />
          <Link to="/login" className="navbar-link">
            Log in
          </Link>
          <Link to="/signup">
            <Button size="sm" variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Sign up
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-4 pt-2 pb-3 space-y-3 sm:px-6">
            <div ref={searchRef} className="relative w-full">
              <div className="relative flex items-center">
                <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder="Search collection"
                  className="search-input pl-9 pr-12"
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={saveSearch}
                  className="absolute right-1 h-7"
                >
                  Save
                </Button>
              </div>
              
              {isDropdownOpen && filteredCollections.length > 0 && (
                <div className="search-dropdown">
                  <ul className="py-1">
                    {filteredCollections.map((collection, index) => (
                      <li 
                        key={index}
                        onClick={() => selectCollection(collection)}
                        className="search-dropdown-item"
                      >
                        {collection}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <Link to="/dashboard">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-foreground/80 hover:text-foreground flex items-center"
                    title="Go to Chat"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    <span>Chat</span>
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-foreground/80 hover:text-foreground flex items-center"
                  title="View Chat History"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  <span>History</span>
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">
                    Sign up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
