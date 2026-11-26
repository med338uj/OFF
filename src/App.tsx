import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    {/* Single-file export: opened from file:// the URL path is the file location,
        so render the home page for any path (the server build keeps its 404 page). */}
    <Route
      path="*"
      element={import.meta.env.VITE_ROUTER === 'single' ? <Index /> : <NotFound />}
    />
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
export { AppRoutes };
