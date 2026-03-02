import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import SubjectDetail from "./pages/SubjectDetail";
import Insights from "./pages/Insights";
import QuizConfigure from "./pages/QuizConfigure";
import ActiveQuiz from "./pages/ActiveQuiz";
import QuizResults from "./pages/QuizResults";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/upload" element={<Upload />} />
          <Route path="/dashboard/subjects/:id" element={<SubjectDetail />} />
          <Route path="/dashboard/subjects/:id/insights" element={<Insights />} />
          <Route path="/dashboard/quiz/configure" element={<QuizConfigure />} />
          <Route path="/dashboard/quiz/:sessionId" element={<ActiveQuiz />} />
          <Route path="/dashboard/quiz/:sessionId/results" element={<QuizResults />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
