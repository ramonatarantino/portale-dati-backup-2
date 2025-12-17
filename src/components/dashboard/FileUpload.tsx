import { useCallback, useState } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileLoaded: (content: string, fileName: string) => void;
  className?: string;
}

export function FileUpload({ onFileLoaded, className }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith('.csv')) {
      alert('Per favore carica un file CSV');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setUploadedFile(file.name);
      onFileLoaded(content, file.name);
    };
    reader.readAsText(file);
  }, [onFileLoaded]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const clearFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className={cn("w-full", className)}>
      {uploadedFile ? (
        <div className="glass-card rounded-xl p-4 flex items-center justify-between animate-scale-in">
          <div className="flex items-center gap-3">
            <div className="gradient-bg rounded-lg p-2">
              <CheckCircle className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-medium text-sm">{uploadedFile}</p>
              <p className="text-xs text-muted-foreground">File caricato con successo</p>
            </div>
          </div>
          <button
            onClick={clearFile}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      ) : (
        <label
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300",
            isDragging 
              ? "border-primary bg-primary/5 scale-[1.02]" 
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className={cn(
              "p-3 rounded-full mb-3 transition-colors",
              isDragging ? "bg-primary/10" : "bg-muted"
            )}>
              {isDragging ? (
                <FileText className="h-8 w-8 text-primary" />
              ) : (
                <Upload className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <p className="mb-2 text-sm font-medium">
              <span className="gradient-text">Carica un file CSV</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Trascina qui o clicca per selezionare
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            accept=".csv"
            onChange={handleChange}
          />
        </label>
      )}
    </div>
  );
}
