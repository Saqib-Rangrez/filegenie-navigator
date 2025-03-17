
import React, { useState } from "react";
import { Upload, FileText, AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onUploadComplete: (fileName: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("Only PDF files are allowed");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);

    // Simulate file upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 300);

    try {
      // This is a mock upload - in a real app, you would send the file to your backend
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(interval);
      setProgress(100);
      
      setTimeout(() => {
        toast({
          title: "Upload Complete",
          description: `${file.name} has been successfully uploaded and processed.`,
        });
        onUploadComplete(file.name);
        setUploading(false);
        setFile(null);
      }, 500);
    } catch (err) {
      clearInterval(interval);
      setError("Failed to upload file. Please try again.");
      setUploading(false);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "There was an error uploading your file.",
      });
    }
  };

  return (
    <div className="w-full space-y-4 rounded-lg border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-lg font-medium">
        <FileText className="h-5 w-5 text-primary" />
        <h2>Upload PDF Document</h2>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-border/70 bg-muted/50 p-8">
        <div className="rounded-full bg-primary/10 p-3">
          <Upload className="h-6 w-6 text-primary" />
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {file ? file.name : "Drag & drop a PDF file, or click to browse"}
          </p>
          {error && (
            <div className="mt-2 flex items-center gap-1 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </div>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => document.getElementById("file-upload")?.click()}
          disabled={uploading}
        >
          Browse Files
        </Button>
      </div>

      {file && !uploading && (
        <div className="flex items-center gap-2 rounded-md bg-muted/60 p-3">
          <FileText className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium flex-1 truncate">{file.name}</span>
          <Button size="sm" onClick={handleUpload}>
            Upload
          </Button>
        </div>
      )}

      {uploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Uploading and processing...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
