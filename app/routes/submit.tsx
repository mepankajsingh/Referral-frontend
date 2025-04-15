import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Submit Referral Code - ReferralHub" },
    { name: "description", content: "Share your referral code with the ReferralHub community." },
  ];
};

export default function Submit() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Submit Your Referral Code
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          Share your referral code with our community
        </p>
      </div>
      
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
        <div className="mb-8">
          <p className="text-gray-700">
            Thank you for sharing your referral code with the ReferralHub community! Please fill out the form below with accurate information.
            Our team will review your submission and publish it if it meets our guidelines.
          </p>
        </div>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="service_name" className="block text-sm font-medium text-gray-700">
                Service Name *
              </label>
              <input
                type="text"
                name="service_name"
                id="service_name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="e.g. Dropbox, Uber, Airbnb"
                required
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category *
              </label>
              <select
                id="category"
                name="category"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                <option value="">Select a category</option>
                <option value="finance">Finance</option>
                <option value="travel">Travel</option>
                <option value="food">Food & Delivery</option>
                <option value="shopping">Shopping</option>
                <option value="tech">Technology</option>
                <option value="entertainment">Entertainment</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Referral Code *
            </label>
            <input
              type="text"
              name="code"
              id="code"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Your referral code"
              required
            />
          </div>
          
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
              Referral Link
            </label>
            <input
              type="url"
              name="url"
              id="url"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="https://example.com/referral"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Brief description of the service"
              required
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="user_benefit" className="block text-sm font-medium text-gray-700">
                What New Users Get *
              </label>
              <textarea
                id="user_benefit"
                name="user_benefit"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="e.g. $10 credit, free month, etc."
                required
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="referrer_benefit" className="block text-sm font-medium text-gray-700">
                What You (Referrer) Get *
              </label>
              <textarea
                id="referrer_benefit"
                name="referrer_benefit"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="e.g. $10 credit, free month, etc."
                required
              ></textarea>
            </div>
          </div>
          
          <div>
            <label htmlFor="terms" className="block text-sm font-medium text-gray-700">
              Terms & Conditions
            </label>
            <textarea
              id="terms"
              name="terms"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Any specific terms or conditions for using this referral code"
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="logo_url" className="block text-sm font-medium text-gray-700">
              Logo URL
            </label>
            <input
              type="url"
              name="logo_url"
              id="logo_url"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="https://example.com/logo.png"
            />
          </div>
          
          <div>
            <label htmlFor="screenshot_url" className="block text-sm font-medium text-gray-700">
              Screenshot URL
            </label>
            <input
              type="url"
              name="screenshot_url"
              id="screenshot_url"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="https://example.com/screenshot.png"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Your Email *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="email@example.com"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              We'll only use this to contact you about your submission if needed.
            </p>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms_agree"
                name="terms_agree"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms_agree" className="font-medium text-gray-700">
                I agree to the terms and conditions
              </label>
              <p className="text-gray-500">
                I confirm that this is a legitimate referral code and I have the right to share it.
              </p>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Referral Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
