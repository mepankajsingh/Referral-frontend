import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Terms of Service - ReferralHub" },
    { name: "description", content: "ReferralHub's terms of service outline the rules and guidelines for using our platform." },
  ];
};

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
      
      <div className="prose prose-indigo max-w-none">
        <p>
          Welcome to ReferralHub. By accessing or using our website, you agree to be bound by these Terms of Service.
        </p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using ReferralHub, you agree to be bound by these Terms of Service and all applicable laws and regulations. 
          If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>
        
        <h2>2. Use of the Service</h2>
        <p>
          ReferralHub provides a platform for users to share and discover referral codes. Users may:
        </p>
        
        <ul>
          <li>Browse and search for referral codes</li>
          <li>Submit their own referral codes</li>
          <li>Copy and use referral codes according to the terms of each service</li>
        </ul>
        
        <h2>3. User Submissions</h2>
        <p>
          When submitting referral codes, you agree that:
        </p>
        
        <ul>
          <li>You have the right to share the referral code</li>
          <li>The information provided is accurate and complete</li>
          <li>You will comply with the terms and conditions of the service offering the referral program</li>
          <li>You will not submit fraudulent, misleading, or spam content</li>
        </ul>
        
        <h2>4. Content Moderation</h2>
        <p>
          ReferralHub reserves the right to review, edit, or remove any content that violates these terms or that we find objectionable. 
          We are not obligated to monitor all content but may do so at our discretion.
        </p>
        
        <h2>5. Intellectual Property</h2>
        <p>
          The ReferralHub name, logo, website design, and content created by our team are protected by intellectual property laws. 
          You may not use, reproduce, or distribute our content without permission.
        </p>
        
        <h2>6. Third-Party Links and Content</h2>
        <p>
          Our website may contain links to third-party websites or services. We are not responsible for the content, 
          policies, or practices of any third-party websites or services linked to on our site.
        </p>
        
        <h2>7. Disclaimer of Warranties</h2>
        <p>
          ReferralHub is provided "as is" without any warranties, expressed or implied. We do not guarantee the accuracy, 
          completeness, or reliability ofany content on our site.
        </p>
        
        <h2>8. Limitation of Liability</h2>
        <p>
          ReferralHub and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
          resulting from your use of or inability to use the service.
        </p>
        
        <h2>9. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. We will notify users of any significant changes by posting the new 
          Terms of Service on this page.
        </p>
        
        <h2>10. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which ReferralHub operates, 
          without regard to its conflict of law provisions.
        </p>
        
        <h2>11. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at <a href="mailto:terms@referralhub.com">terms@referralhub.com</a>.
        </p>
      </div>
    </div>
  );
}
