import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Terms of Service - ReferralHub" },
    { name: "description", content: "ReferralHub's terms of service outline the rules and guidelines for using our platform." },
  ];
};

export default function Terms() {
  return (
    <div className="bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-50 border-b border-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-base text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 mb-12">
          <div className="p-6 sm:p-8">
            <div className="prose prose-indigo max-w-none">
              <p className="text-sm text-gray-600 leading-relaxed">
                Welcome to ReferralHub. By accessing or using our website, you agree to be bound by these Terms of Service.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="ml-4 text-base font-medium text-gray-900">Acceptance of Terms</h2>
                  </div>
                  <p className="text-sm text-gray-600">
                    By accessing or using ReferralHub, you agree to be bound by these Terms of Service and all applicable laws and regulations. 
                    If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                  </p>
                </div>
                
                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    <h2 className="ml-4 text-base font-medium text-gray-900">Use of the Service</h2>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">Browse and search for referral codes</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">Submit your own referral codes</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">Copy and use referral codes according to the terms of each service</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <h2 className="text-base font-medium text-gray-900 mb-4">User Submissions</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 mb-8">
                <p className="text-sm text-gray-600 mb-3 font-medium">When submitting referral codes, you agree that:</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">You have the right to share the referral code</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">The information provided is accurate and complete</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">You will comply with the terms and conditions of the service offering the referral program</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">You will not submit fraudulent, misleading, or spam content</span>
                  </li>
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h2 className="ml-4 text-base font-medium text-gray-900">Content Moderation</h2>
                  </div>
                  <p className="text-sm text-gray-600">
                    ReferralHub reserves the right to review, edit, or remove any content that violates these terms or that we find objectionable. 
                    We are not obligated to monitor all content but may do so at our discretion.
                  </p>
                </div>
                
                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    </div>
                    <h2 className="ml-4 text-base font-medium text-gray-900">Intellectual Property</h2>
                  </div>
                  <p className="text-sm text-gray-600">
                    The ReferralHub name, logo, website design, and content created by our team are protected by intellectual property laws. 
                    You may not use, reproduce, or distribute our content without permission.
                  </p>
                </div>
              </div>
              
              <h2 className="text-base font-medium text-gray-900 mb-4">Disclaimers and Limitations</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 mb-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Third-Party Links and Content</h3>
                    <p className="text-sm text-gray-600">
                      Our website may contain links to third-party websites or services. We are not responsible for the content, 
                      policies, or practices of any third-party websites or services linked to on our site.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Disclaimer of Warranties</h3>
                    <p className="text-sm text-gray-600">
                      ReferralHub is provided "as is" without any warranties, expressed or implied. We do not guarantee the accuracy, 
                      completeness, or reliability of any content on our site.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Limitation of Liability</h3>
                    <p className="text-sm text-gray-600">
                      ReferralHub and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
                      resulting from your use of or inability to use the service.
                    </p>
                  </div>
                </div>
              </div>
              
              <h2 className="text-base font-medium text-gray-900 mb-4">Changes and Governing Law</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 mb-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Changes to Terms</h3>
                    <p className="text-sm text-gray-600">
                      We reserve the right to modify these terms at any time. We will notify users of any significant changes by posting the new 
                      Terms of Service on this page.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Governing Law</h3>
                    <p className="text-sm text-gray-600">
                      These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which ReferralHub operates, 
                      without regard to its conflict of law provisions.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-600 text-white rounded-lg p-6 shadow-md">
                <h2 className="text-base font-medium mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Us
                </h2>
                <p className="mb-4 text-sm">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <a 
                  href="mailto:terms@referralhub.com" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-gray-100 transition-colors"
                >
                  terms@referralhub.com
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
