import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/common/LoadingScreen';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/common/ScrollToTop';

// Lazy loaded pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const VehiclesPage = React.lazy(() => import('./pages/VehiclesPage'));
const RoutesPage = React.lazy(() => import('./pages/RoutesPage'));
const BookingPage = React.lazy(() => import('./pages/BookingPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="vehicles" element={<VehiclesPage />} />
            <Route path="routes" element={<RoutesPage />} />
            <Route path="booking" element={<BookingPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;