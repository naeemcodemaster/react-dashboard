import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react'; // Added useRef import
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';

function App() {
  // Initialize darkMode based on localStorage or default to dark mode
  const getInitialDarkMode = () => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode !== null) {
      return storedDarkMode === 'true';
    } else {
      return true; 
    }
  };

  const [darkMode, setDarkMode] = useState(getInitialDarkMode);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null); // Create a reference for the sidebar

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    // Save the darkMode preference to localStorage
    localStorage.setItem('darkMode', newDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false); // Close the sidebar if clicked outside
      }
    };

    // Adding the click event listener for detecting clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-[#1c1c1c] transition-colors w-[100%]">
          {/* Pass sidebarRef to Sidebar component */}
          <Sidebar 
            toggleDarkMode={toggleDarkMode} 
            isMobile={isSidebarOpen} 
            toggleSidebar={toggleSidebar} 
            darkMode={darkMode} 
            ref={sidebarRef} // Attach ref to Sidebar
          />

          <div className="flex md:w-[calc(100%-16rem)] md:ml-[16rem] mx-auto" onClick={toggleSidebar}>
            <div className="flex-1 py-6 md:pr-4">
              <Routes>
                <Route path="/" element={<Dashboard darkMode={darkMode} toggleSidebar={toggleSidebar} />} />
                <Route path="/:section" element={<Dashboard />} />
              </Routes>
              <Outlet />
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
