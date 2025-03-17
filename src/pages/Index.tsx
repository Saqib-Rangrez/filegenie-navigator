
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 md:p-10">
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2 animate-slide-in">
              Document Intelligence Platform
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Interact with your documents<br className="hidden md:block" /> like never before
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              FileGenie transforms how you work with documents, enabling natural conversations 
              with your PDF files and document collections.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/signup">
              <Button size="lg" className="font-medium">
                Get started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="font-medium">
                Try Dashboard
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="font-medium">
                Log in
              </Button>
            </Link>
          </div>
          
          <div className="pt-12 pb-8">
            <div className="relative mx-auto rounded-xl overflow-hidden shadow-2xl border border-border/30 w-full max-w-3xl aspect-video bg-card/50 backdrop-blur-sm">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <p className="text-sm">Document interface preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
