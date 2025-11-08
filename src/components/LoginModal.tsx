import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Mail, Lock, User, Eye, EyeOff, GraduationCap } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (userData: any) => void;
}

export function LoginModal({ open, onOpenChange, onSuccess }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Check credentials (demo: any email with password "password123")
      if (loginData.password === 'password123') {
        const userData = {
          name: loginData.email.split('@')[0],
          email: loginData.email,
          phone: '+91-98765-43210',
          location: 'Mumbai, India',
          dateOfBirth: '1999-05-15',
          avatar: '',
          bio: 'Aspiring MBA student preparing for CAT 2026'
        };
        
        localStorage.setItem('userProfile', JSON.stringify(userData));
        toast.success('Login successful!');
        onSuccess(userData);
        onOpenChange(false);
      } else {
        toast.error('Invalid credentials. Use password: password123');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (signupData.password.length < 6) {
      toast.error('Password must be at least 6 characters!');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        name: signupData.name,
        email: signupData.email,
        phone: '',
        location: '',
        dateOfBirth: '',
        avatar: '',
        bio: ''
      };

      localStorage.setItem('userProfile', JSON.stringify(userData));
      toast.success('Account created successfully!');
      onSuccess(userData);
      onOpenChange(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = () => {
    setLoginData({ email: 'demo@thinkplus.edu', password: 'password123' });
    setTimeout(() => {
      const userData = {
        name: 'Demo User',
        email: 'demo@thinkplus.edu',
        phone: '+91-98765-43210',
        location: 'Mumbai, India',
        dateOfBirth: '1999-05-15',
        avatar: '',
        bio: 'Aspiring MBA student preparing for CAT 2026'
      };
      
      localStorage.setItem('userProfile', JSON.stringify(userData));
      toast.success('Logged in as Demo User!');
      onSuccess(userData);
      onOpenChange(false);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 transition-colors overflow-hidden p-0">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl">Think Plus</h2>
              <p className="text-sm text-white/80">Education Platform</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all focus:scale-[1.01]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                      className="dark:bg-gray-800 dark:border-gray-700 dark:text-white pr-10 transition-all focus:scale-[1.01]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <input type="checkbox" className="rounded" />
                    Remember me
                  </label>
                  <button type="button" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 transition-all hover:scale-[1.02] hover:shadow-lg"
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t dark:border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">Or</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDemoLogin}
                  className="w-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all hover:scale-[1.02]"
                >
                  Try Demo Account
                </Button>

                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                  Demo credentials: demo@thinkplus.edu / password123
                </p>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <User className="w-4 h-4" />
                    Full Name
                  </Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    required
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all focus:scale-[1.01]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all focus:scale-[1.01]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <Input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password (min 6 characters)"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all focus:scale-[1.01]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm" className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <Lock className="w-4 h-4" />
                    Confirm Password
                  </Label>
                  <Input
                    id="signup-confirm"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    required
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all focus:scale-[1.01]"
                  />
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <input type="checkbox" required className="mt-1 rounded" />
                  <label className="text-gray-600 dark:text-gray-400">
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 transition-all hover:scale-[1.02] hover:shadow-lg"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
