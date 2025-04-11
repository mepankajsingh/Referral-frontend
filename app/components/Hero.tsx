import SearchBar from './SearchBar';

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find & Share Referral Codes
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Get discounts and rewards by using referral codes for your favorite apps and services
        </p>
        
        <div className="flex justify-center">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
