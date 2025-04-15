import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Privacy Policy - ReferralHub" },
    { name: "description", content: "ReferralHub's privacy policy explains how we collect, use, and protect your information." },
  ];
};

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
      
      <div className="prose prose-indigo max-w-none">
        <p>
          At ReferralHub, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our website.
        </p>
        
        <h2>Information We Collect</h2>
        <p>
          We collect the following types of information:
        </p>
        
        <ul>
          <li><strong>Personal Information:</strong> When you submit a referral code, we collect your email address.</li>
          <li><strong>Usage Data:</strong> We collect information about how you interact with our website, including pages visited and actions taken.</li>
          <li><strong>Device Information:</strong> We collect information about the device you use to access our website, including browser type and operating system.</li>
        </ul>
        
        <h2>How We Use Your Information</h2>
        <p>
          We use the information we collect to:
        </p>
        
        <ul>
          <li>Provide and maintain our services</li>
          <li>Contact you regarding your referral code submissions</li>
          <li>Improve our website and user experience</li>
          <li>Monitor and analyze usage patterns</li>
        </ul>
        
        <h2>Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to track activity on our website and hold certain information. 
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>
        
        <h2>Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal information. However, no method of transmission 
          over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>
        
        <h2>Third-Party Services</h2>
        <p>
          We may employ third-party companies and individuals to facilitate our service, provide the service on our behalf, 
          or assist us in analyzing how our service is used. These third parties have access to your personal information only 
          to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
        </p>
        
        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
        
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@referralhub.com">privacy@referralhub.com</a>.
        </p>
      </div>
    </div>
  );
}
