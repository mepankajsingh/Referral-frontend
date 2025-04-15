import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Privacy Policy - ReferralHub" },
    { name: "description", content: "ReferralHub's privacy policy explains how we collect, use, and protect your information." },
  ];
};

export default function Privacy() {
  return (
    <div className="bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-50 border-b border-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 mb-12">
          <div className="p-6 sm:p-8">
            <div className="prose prose-indigo max-w-none">
              <p className="text-sm text-gray-600 leading-relaxed">
                At ReferralHub, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our website.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h2 className="ml-4 text-base font-medium text-gray-900">Information We Collect</h2>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600"><strong>Personal Information:</strong> When you submit a referral code, we collect your email address.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600"><strong>Usage Data:</strong> We collect information about how you interact with our website, including pages visited and actions taken.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600"><strong>Device Information:</strong> We collect information about the device you use to access our website, including browser type and operating system.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h2 className="ml-4 text-base font-medium text-gray-900">How We Use Your Information</h2>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">Provide and maintain our services</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">Contact you regarding your referral code submissions</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">Improve our website and user experience</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">Monitor and analyze usage patterns</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <h2 className="text-base font-medium text-gray-900 mb-4">Cookies and Tracking Technologies</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 mb-8">
                <p className="text-sm text-gray-600 leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our website and hold certain information. 
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </div>
              
              <h2 className="text-base font-medium text-gray-900 mb-4">Data Security</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 mb-8">
                <p className="text-sm text-gray-600 leading-relaxed">
                  We implement appropriate security measures to protect your personal information. However, no method of transmission 
                  over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>
              
              <h2 className="text-base font-medium text-gray-900 mb-4">Third-Party Services</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 mb-8">
                <p className="text-sm text-gray-600 leading-relaxed">
                  We may employ third-party companies and individuals to facilitate our service, provide the service on our behalf, 
                  or assist us in analyzing how our service is used. These third parties have access to your personal information only 
                  to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                </p>
              </div>
              
              <h2 className="text-base font-medium text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 mb-8">
                <p className="text-sm text-gray-600 leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>
              </div>
              
              <div className="bg-indigo-600 text-white rounded-lg p-6 shadow-md">
                <h2 className="text-base font-medium mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Us
                </h2>
                <p className="mb-4 text-sm">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <a 
                  href="mailto:privacy@referralhub.com" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-gray-100 transition-colors"
                >
                  privacy@referralhub.com
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
