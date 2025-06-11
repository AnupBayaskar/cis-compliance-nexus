
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ModernSidebar } from "@/components/layout/ModernSidebar";
import { ModernNavbar } from "@/components/layout/ModernNavbar";
import Footer from "@/components/layout/Footer";
import Home from "./pages/Home";
import Benchmarks from "./pages/Benchmarks";
import Compliance from "./pages/Compliance";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex w-full bg-background">
              <ModernSidebar />
              <div className="flex-1 flex flex-col ml-16">
                <ModernNavbar />
                <main className="flex-1 pt-16 relative">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/benchmarks" element={<Benchmarks />} />
                    <Route path="/compliance" element={<Compliance />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
