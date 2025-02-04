import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

// Public components (Header, Hero, Courses, etc.)
import Header from "./components/Header";
import WhatsAppButton from "./components/WhatsAppButton";
import ChatbotComponent from "./components/ChatbotComponent";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Courses from "./components/Courses";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import About from "./components/About";
import CertificationsSection from "./components/CertificationsSection";
import ReservationSection from "./components/Reservation";
import DrivingSchoolForm from "./components/dd";
import BranchMap from "./components/map";

// Dashboard components (Navbar, Sidebar, Dashboard pages)
import Navbar from "./Backend/Navbar";
import Sidebar from "./Backend/Sidebar";
import Dashboard from "./Backend/Dashboard";
import Clients from "./Backend/pages/Clients";
import Categories from "./Backend/pages/Categories";
import Moniteure from "./Backend/pages/Moniteure";
import Vihucule from "./Backend/pages/Vihucule";
import Deponses from "./Backend/pages/Deponses";
import DemoApp from "./Backend/Calendar/DemoApp";
import Statistiques from "./Backend/pages/statistics/Statistiques";
import StatisticsPage from "./Backend/pages/statistics/Statistiques";

// Custom hook to check the current route inside the BrowserRouter
const useIsDashboardRoute = () => {
  const location = useLocation();
  return location.pathname.startsWith("/dashboard");
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </div>
  );
}

function Main() {
  const isDashboardRoute = useIsDashboardRoute(); // Now inside Router context

  return (
    <>
      {/* Conditionally render public components */}
      {!isDashboardRoute && (
        <>
          <Header />
          <WhatsAppButton />
          <ChatbotComponent />
        </>
      )}

      <Routes>
        {/* Public Routes (non-dashboard) */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Courses />
              <ReservationSection />
              <CertificationsSection />
              <Testimonials />
              <BranchMap />
            </>
          }
        />
        <Route path="/courses" element={<Courses />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/reservation" element={<DrivingSchoolForm />} />

        {/* Dashboard Routes */}
        <Route
          path="/dashboard/*" // This will match /dashboard and its child routes
          element={
            <div style={{ display: "flex" }}>
              <Sidebar /> {/* Sidebar for dashboard */}
              <div style={{ flex: 1 }}>
                <Navbar /> {/* Navbar for dashboard */}
                <Routes>
                  <Route path="/" element={<StatisticsPage />} />
                  <Route path="/statistiques" element={<StatisticsPage />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/moniteure" element={<Moniteure />} />
                  <Route path="/vihucule" element={<Vihucule />} />
                  <Route path="/deponses" element={<Deponses />} />
                  <Route path="/calendar" element={<DemoApp />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>

      {/* Footer (only shown on public pages) */}
      {!isDashboardRoute && <Footer />}
    </>
  );
}

export default App;
