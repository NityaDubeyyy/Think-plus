import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Courses } from './components/Courses';
import { Features } from './components/Features';
import { StudyMaterials } from './components/StudyMaterials';
import { TestSection } from './components/TestSection';
import { ProgressDashboard } from './components/ProgressDashboard';
import { ContactUs } from './components/ContactUs';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { PaymentModal } from './components/PaymentModal';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './lib/ThemeContext';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    // Check if user is logged in (mock)
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = (userData: any) => {
    localStorage.setItem('isLoggedIn', 'true');
    if (userData) {
      localStorage.setItem('userProfile', JSON.stringify(userData));
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setActiveSection('home');
  };

  const handleEnrollCourse = (course: any) => {
    setSelectedCourse(course);
    setShowPayment(true);
  };

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
        <Navbar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
        
        <AnimatePresence mode="wait">
          {activeSection === 'home' && (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Hero />
              <Features />
              <Courses onEnroll={handleEnrollCourse} />
              <ContactUs />
            </motion.div>
          )}

          {activeSection === 'courses' && (
            <motion.div
              key="courses"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-20"
            >
              <Courses onEnroll={handleEnrollCourse} />
            </motion.div>
          )}

          {activeSection === 'study-materials' && isLoggedIn && (
            <motion.div
              key="study-materials"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-20"
            >
              <StudyMaterials />
            </motion.div>
          )}

          {activeSection === 'tests' && isLoggedIn && (
            <motion.div
              key="tests"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-20"
            >
              <TestSection />
            </motion.div>
          )}

          {activeSection === 'progress' && isLoggedIn && (
            <motion.div
              key="progress"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-20"
            >
              <ProgressDashboard />
            </motion.div>
          )}

          {activeSection === 'contact' && (
            <motion.div
              key="contact"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-20"
            >
              <ContactUs />
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
        <Chatbot />
        <Toaster />

        {showPayment && selectedCourse && (
          <PaymentModal
            course={selectedCourse}
            onClose={() => setShowPayment(false)}
            onSuccess={() => {
              setShowPayment(false);
              handleLogin();
              setActiveSection('study-materials');
            }}
          />
        )}
      </div>
    </ThemeProvider>
  );
}