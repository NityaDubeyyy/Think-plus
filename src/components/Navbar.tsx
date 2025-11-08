import { Menu, X, GraduationCap, LogOut, User, Settings as SettingsIcon, ChevronDown, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { useState } from 'react';
import { Settings } from './Settings';
import { useTheme } from '../lib/ThemeContext';
import { ProfileModal } from './ProfileModal';
import { LoginModal } from './LoginModal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isLoggedIn: boolean;
  onLogin: (userData: any) => void;
  onLogout: () => void;
}

export function Navbar({ activeSection, setActiveSection, isLoggedIn, onLogin, onLogout }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    ...(isLoggedIn ? [
      { id: 'study-materials', label: 'Study Materials' },
      { id: 'tests', label: 'Tests' },
      { id: 'progress', label: 'My Progress' },
    ] : []),
    { id: 'contact', label: 'Contact Us' },
  ];

  let userProfile = { name: 'John Doe', email: 'john.doe@example.com' } as { name: string; email: string };
  try {
    const raw = localStorage.getItem('userProfile');
    if (raw) userProfile = JSON.parse(raw);
  } catch (e) {
    // ignore malformed localStorage value and keep default
  }
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    onLogout();
    setShowLogoutDialog(false);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleLoginSuccess = (userData: any) => {
    onLogin(userData);
  };

  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2 cursor-pointer group" 
              onClick={() => setActiveSection('home')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <motion.div
                  whileHover={{ rotate: 12 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-500" />
                </motion.div>
                <div className="absolute inset-0 bg-blue-600 dark:bg-blue-500 blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="text-blue-600 dark:text-blue-500 transition-colors">Think Plus</span>
                <span className="text-xs text-gray-600 dark:text-gray-400 transition-colors">Education</span>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`relative transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-blue-600 dark:text-blue-500'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                      layoutId="activeIndicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
              
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button 
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Avatar className="w-8 h-8 ring-2 ring-blue-600 dark:ring-blue-500 ring-offset-2 dark:ring-offset-gray-900 transition-all">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
                          {getInitials(userProfile.name)}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                    <div className="px-3 py-2">
                      <p className="text-sm text-gray-900 dark:text-white">{userProfile.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{userProfile.email}</p>
                    </div>
                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-800" />
                    <DropdownMenuItem 
                      onClick={() => setShowProfile(true)}
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setShowSettings(true)}
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <SettingsIcon className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-800" />
                    <DropdownMenuItem 
                      onClick={handleLogoutClick}
                      className="cursor-pointer text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="sm" 
                    onClick={handleLoginClick} 
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all hover:shadow-lg hover:shadow-blue-500/50"
                  >
                    <User className="w-4 h-4" />
                    Login
                  </Button>
                </motion.div>
              )}
              {/* Theme toggle button */}
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-gray-700" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-400" />
                )}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-gray-900 dark:text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <motion.div 
                className="px-4 py-4 space-y-3"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
              >
                {isLoggedIn && (
                  <motion.div 
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg mb-3"
                    variants={{
                      hidden: { opacity: 0, y: -10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Avatar className="w-10 h-10 ring-2 ring-blue-600 dark:ring-blue-500">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {getInitials(userProfile.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">{userProfile.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{userProfile.email}</p>
                    </div>
                  </motion.div>
                )}
                
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-all ${
                      activeSection === item.id
                        ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-500 shadow-sm'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                
                {isLoggedIn && (
                  <>
                    <motion.button
                      onClick={() => {
                        setShowProfile(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <User className="w-4 h-4" />
                      My Profile
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setShowSettings(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <SettingsIcon className="w-4 h-4" />
                      Settings
                    </motion.button>
                  </>
                )}
                
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  {/* Mobile theme toggle */}
                  <div className="px-3 py-2">
                    <button
                      onClick={() => {
                        toggleTheme();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                      aria-label="Toggle theme"
                    >
                      {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-yellow-400" />}
                      Toggle theme
                    </button>
                  </div>
                  {isLoggedIn ? (
                    <Button 
                      variant="outline" 
                      className="w-full border-red-200 dark:border-red-900 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all" 
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLogoutClick();
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  ) : (
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all hover:shadow-lg" 
                      onClick={handleLoginClick}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <Settings open={showSettings} onOpenChange={setShowSettings} />
      <ProfileModal open={showProfile} onOpenChange={setShowProfile} />
      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} onSuccess={handleLoginSuccess} />
      
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="bg-white dark:bg-gray-900">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 dark:text-white">Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
              Are you sure you want to logout? You'll need to login again to access your courses and progress.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Cancel</AlertDialogCancel>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AlertDialogAction 
                onClick={confirmLogout}
                className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-all"
              >
                Logout
              </AlertDialogAction>
            </motion.div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}