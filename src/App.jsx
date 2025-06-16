
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ModernNavbar from "@/components/layout/ModernNavbar";
import ModernSidebar from "@/components/layout/ModernSidebar";
import Footer from "@/components/layout/Footer";
import Home from "./pages/Home";
import Benchmarks from "./pages/Benchmarks";
import Compliance from "./pages/Compliance";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="d-flex min-vh-100">
            <ModernSidebar />
            <div className="flex-grow-1 d-flex flex-column">
              <ModernNavbar />
              <main className="flex-grow-1 main-content">
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
  </QueryClientProvider>
);

export default App;
