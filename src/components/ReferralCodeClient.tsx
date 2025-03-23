import { useState } from 'react';

interface ReferralCodeClientProps {
  code: string;
}

export default function ReferralCodeClient({ code }: ReferralCodeClientProps) {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  
  return (
    <div className="flex">
      <div className="bg-gray-100 px-2 py-1 rounded text-gray-800 font-mono text-sm flex-grow">
        {code}
      </div>
      <button 
        className={`ml-2 px-2 py-1 ${copied ? 'bg-green-600' : 'bg-primary-600'} text-white rounded text-sm hover:${copied ? 'bg-green-700' : 'bg-primary-700'} transition-colors`}
        onClick={copyToClipboard}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
