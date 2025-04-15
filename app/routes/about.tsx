import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "About ReferralHub - Share and Discover Referral Codes" },
    { name: "description", content: "Learn more about ReferralHub, the platform for sharing and discovering referral codes." },
  ];
};

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          About ReferralHub
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          Connecting people through referrals and shared rewards
        </p>
      </div>
      
      <div className="prose prose-indigo max-w-none">
        <p>
          ReferralHub was created with a simple mission: to help people discover and share referral codes for their favorite services, 
          creating a win-win situation where both parties benefit from the referral rewards.
        </p>
        
        <h2>Our Mission</h2>
        <p>
          Many companies offer referral programs that reward both the referrer and the new customer, but finding these codes 
          can be challenging. ReferralHub aims to solve this problem by creating a centralized platform where users can:
        </p>
        
        <ul>
          <li>Discover referral codes for services they're interested in</li>
          <li>Share their own referral codes with a wider audience</li>
          <li>Learn about the benefits offered by different referral programs</li>
          <li>Find the best deals across various categories</li>
        </ul>
        
        <h2>How It Works</h2>
        <p>
          Using ReferralHub is simple:
        </p>
        
        <ol>
          <li>Browse referral codes by category or search for specific services</li>
          <li>View detailed information about each referral offer, including what both parties receive</li>
          <li>Copy the referral code with one click</li>
          <li>Use the code when signing up for the service</li>
          <li>Submit your own referral codes to share with others</li>
        </ol>
        
        <h2>Community Guidelines</h2>
        <p>
          To maintain a high-quality platform, we ask all users to follow these guidelines:
        </p>
        
        <ul>
          <li>Only submit genuine referral codes for legitimate services</li>
          <li>Provide accurate information about referral benefits</li>
          <li>Respect the terms and conditions of each referral program</li>
          <li>Be considerate of other users and avoid spamming</li>
        </ul>
        
        <h2>Contact Us</h2>
        <p>
          Have questions, suggestions, or feedback? We'd love to hear from you! 
          Please contact us at <a href="mailto:contact@referralhub.com">contact@referralhub.com</a>.
        </p>
      </div>
    </div>
  );
}
