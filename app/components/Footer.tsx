import { Link } from "@remix-run/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/featured" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                  Featured
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase mb-4">
              Connect
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span className="ml-2 text-lg font-bold text-indigo-600">ReferralHub</span>
            </div>
            <p className="text-sm text-gray-500">
              The platform for sharing and discovering the best referral codes.
            </p>
          </div>
        </div>
        
        {/* Sanskrit Sloka Section */}
        <div className="border-t border-gray-200 pt-6 pb-4">
          <div className="flex flex-col items-center text-center">
            <p className="text-xs text-gray-500 italic mb-2">
              "विद्या ददाति विनयं विनयाद्याति पात्रताम् |<br />
              पात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम् ||"
            </p>
            <p className="text-xs text-gray-600 mb-4">
              "Knowledge gives humility, from humility comes worthiness, from worthiness one gets wealth, from wealth good deeds, and from that happiness."
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center text-sm text-gray-500">
              &copy; {currentYear} ReferralHub. All rights reserved.
            </p>
            
            <div className="flex items-center mt-4 md:mt-0">
              <div className="flex items-center mr-2">
                {/* Indian Flag */}
                <div className="w-6 h-4 mr-2 flex flex-col overflow-hidden border border-gray-300 rounded-sm">
                  <div className="h-1/3 bg-[#FF9933]"></div>
                  <div className="h-1/3 bg-white flex justify-center items-center">
                    <div className="w-[6px] h-[6px] rounded-full border border-[#000080]"></div>
                  </div>
                  <div className="h-1/3 bg-[#138808]"></div>
                </div>
                <span className="text-xs text-gray-500 font-medium">Made in India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
