import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Upload, X, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { getToken } from '@/lib/auth'; // Import JWT token function

interface DocumentUploaderProps {
  onComplete: (doc: { id: string; name: string; type: string; size: string; createdAt: string }) => void;
  onCancel: () => void;
}

export const DocumentUploader = ({ onComplete, onCancel }: DocumentUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadError(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const selectedFile = e.dataTransfer.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // ✅ ACTUAL UPLOAD FUNCTION (Replaces Mock Upload)
  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", file); // ✅ Send file in FormData

    try {
      const token = getToken(); // ✅ Get JWT Token

      const response = await fetch("http://localhost:5002/api/documents/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send token for authentication
        },
        body: formData, // ✅ Send FormData (file upload)
      });

      if (!response.ok) {
        throw new Error("Upload failed. Please try again.");
      }

      const data = await response.json();
      setUploadProgress(100);

      // ✅ Call onComplete to update UI
      onComplete(data.document);
      toast.success("Document uploaded successfully!");

    } catch (error) {
      setUploadError(error.message);
      toast.error("Failed to upload document.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="border border-border/50 shadow-md bg-card/70 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>Upload your documents to query them via chat</CardDescription>
          </div>
          <Button size="icon" variant="ghost" onClick={onCancel}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {uploading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium">{file?.name}</p>
            </div>
            <div className="space-y-2">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-muted-foreground text-right">{uploadProgress}%</p>
            </div>
            {uploadProgress === 100 && (
              <div className="flex items-center text-sm text-green-600 space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Upload complete!</span>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="space-y-6">
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                file ? 'bg-muted border-primary/60' : 'border-border hover:border-primary/50'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="bg-primary/10 rounded-full p-3">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Drag and drop your file here or click to browse</p>
                  <p className="text-xs text-muted-foreground">
                    Supports PDF, DOCX, TXT, and other text-based files (Max 10MB)
                  </p>
                </div>
                <Input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.doc,.txt,.md,.html"
                />
              </div>
            </div>
            
            {file && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-muted p-3 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-md">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <Button size="icon" variant="ghost" onClick={() => setFile(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
            
            {uploadError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Upload failed</AlertTitle>
                <AlertDescription>{uploadError}</AlertDescription>
              </Alert>
            )}
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onCancel}>Cancel</Button>
              <Button onClick={handleUpload} disabled={!file}>Upload</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};