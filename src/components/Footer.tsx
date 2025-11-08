import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 dark:text-gray-400 transition-colors border-t border-gray-800 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-8 h-8 text-blue-500" />
              <div className="flex flex-col">
                <span className="text-white">Think Plus</span>
                <span className="text-xs">Education</span>
              </div>
            </div>
            <p className="text-sm mb-4">
              Empowering students to achieve their dreams through quality education and personalized guidance.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 bg-gray-800 dark:bg-gray-900 rounded-full flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-500 transition-all hover:scale-110 hover:shadow-lg">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 dark:bg-gray-900 rounded-full flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-500 transition-all hover:scale-110 hover:shadow-lg">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 dark:bg-gray-900 rounded-full flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-500 transition-all hover:scale-110 hover:shadow-lg">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 dark:bg-gray-900 rounded-full flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-500 transition-all hover:scale-110 hover:shadow-lg">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 dark:bg-gray-900 rounded-full flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-500 transition-all hover:scale-110 hover:shadow-lg">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-white mb-4">Courses</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white dark:hover:text-blue-400 transition-all hover:translate-x-1 inline-block">CAT Preparation</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-blue-400 transition-all hover:translate-x-1 inline-block">IPMAT Coaching</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-blue-400 transition-all hover:translate-x-1 inline-block">CLAT Training</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-blue-400 transition-all hover:translate-x-1 inline-block">MBA Entrance</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-blue-400 transition-all hover:translate-x-1 inline-block">All Courses</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Faculty</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 Think Plus Education. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
