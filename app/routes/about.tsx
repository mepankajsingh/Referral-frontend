import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "About ReferralHub - Share and Discover Referral Codes" },
    { name: "description", content: "Learn more about ReferralHub, the platform for sharing and discovering referral codes." },
  ];
};

export default function About() {
  return (
    <div className="bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-50 border-b border-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About ReferralHub
          </h1>
          <p className="mt-4 text-base text-gray-600">
            Connecting people through referrals and shared rewards
          </p>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 mb-12">
          <div className="p-6 sm:p-8">
            <div className="prose prose-indigo max-w-none">
              <p className="text-sm text-gray-600 leading-relaxed">
                ReferralHub was created with a simple mission: to help people discover and share referral codes for their favorite services, 
                creating a win-win situation where both parties benefit from the referral rewards.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h2 className="ml-4 text-base font-medium text-gray-900">Our Mission</h2>
                  </div>
                  <p className="text-sm text-gray-600">
                    Many companies offer referral programs that reward both the referrer and the new customer, but finding these codes 
                    can be challenging. ReferralHub aims to solve this problem by creating a centralized platform where users can discover and share referral codes.
                  </p>
                </div>
                
                <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h2 className="ml-4 text-base font-medium text-gray-900">Community Guidelines</h2>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">Only submit genuine referral codes</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">Provide accurate information about benefits</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">Respect each program's terms and conditions</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <h2 className="text-base font-medium text-gray-900 mb-4">How It Works</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 mb-8">
                <ol className="space-y-6 text-sm">
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 text-white font-bold">
                        1
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">Browse referral codes</h3>
                      <p className="mt-1 text-sm text-gray-600">Search by category or look for specific services you're interested in.</p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 text-white font-bold">
                        2
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">View detailed information</h3>
                      <p className="mt-1 text-sm text-gray-600">See what benefits both parties receive from using the referral.</p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 text-white font-bold">
                        3
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">Copy and use the code</h3>
                      <p className="mt-1 text-sm text-gray-600">With one click, copy the referral code and use it when signing up.</p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 text-white font-bold">
                        4
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">Enjoy the benefits</h3>
                      <p className="mt-1 text-sm text-gray-600">Both you and the referrer receive the promised rewards.</p>
                    </div>
                  </li>
                </ol>
              </div>
              
              <div className="bg-indigo-600 text-white rounded-lg p-6 shadow-md">
                <h2 className="text-base font-medium mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Us
                </h2>
                <p className="mb-4 text-sm">
                  Have questions, suggestions, or feedback? We'd love to hear from you!
                </p>
                <a 
                  href="mailto:contact@referralhub.com" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-gray-100 transition-colors"
                >
                  contact@referralhub.com
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
