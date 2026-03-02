import { NavHeader } from '@/components/nav-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function UploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [generating, setGenerating] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f?.type === 'application/pdf') setFile(f);
    else toast.error('Please upload a PDF file');
  }, []);

  const handleGenerate = () => {
    if (!file || !title) { toast.error('Please provide a PDF and title'); return; }
    setGenerating(true);
    // Mock generation
    setTimeout(() => {
      setGenerating(false);
      toast.success('Quiz generated successfully!');
      navigate('/dashboard/subjects/sub-1');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <main className="container mx-auto max-w-2xl px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Upload Study Material</h1>
          <p className="text-muted-foreground">Upload a PDF and we'll generate intelligent quiz questions</p>
        </div>

        <Card className="glass-card">
          <CardHeader><CardTitle>PDF Upload</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('pdf-input')?.click()}
              className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                dragOver ? 'border-primary bg-accent/50' : file ? 'border-success bg-success/5' : 'border-border hover:border-primary/50'
              }`}
            >
              {file ? (
                <div className="flex flex-col items-center gap-2">
                  <FileText className="h-10 w-10 text-success" />
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <p className="font-medium">Drop your PDF here or click to browse</p>
                  <p className="text-sm text-muted-foreground">Max 20 MB</p>
                </div>
              )}
              <input id="pdf-input" type="file" accept=".pdf" className="hidden" onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])} />
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Subject Title</label>
                <Input placeholder="e.g., Calculus I — Limits & Derivatives" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Description (optional)</label>
                <Textarea placeholder="Brief description of the material..." value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
              </div>
            </div>

            <Button onClick={handleGenerate} disabled={generating || !file || !title} className="w-full gap-2" size="lg">
              {generating ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating Quiz Questions...</> : 'Generate Quiz'}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
