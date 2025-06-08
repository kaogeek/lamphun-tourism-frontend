import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from './context/LanguageContext';
import Admin from './pages/Admin';
import Attractions from './pages/Attractions';
import AttractionsDetail from './pages/AttractionsDetail';
import EventDetail from './pages/EventDetail';
import EventsCalendar from './pages/EventsCalendar';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import PlaceMap from './pages/PlaceMap';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/attractions" element={<Attractions />} />
            <Route path="/attractions/:id" element={<AttractionsDetail />} />
            <Route path="/events" element={<EventsCalendar />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/map" element={<PlaceMap />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
