import { useEffect, useState } from "react";
import { useNavigation } from "@remix-run/react";

export default function TopProgressBar() {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show the progress bar when navigation starts
    if (navigation.state === "loading") {
      setVisible(true);
      
      // Reset progress and start animation
      setProgress(0);
      
      // Quickly move to 30%
      const timer1 = setTimeout(() => setProgress(30), 50);
      
      // Then slowly progress to 70%
      const timer2 = setTimeout(() => setProgress(70), 300);
      
      // Clean up timers
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
    
    // When navigation is complete
    if (navigation.state === "idle" && visible) {
      // Quickly complete the progress bar
      setProgress(100);
      
      // Then hide it after animation completes
      const timer = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [navigation.state, visible]);

  if (!visible && navigation.state === "idle") {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
      <div 
        className="h-full bg-indigo-600 transition-all duration-200 ease-out"
        style={{ 
          width: `${progress}%`,
          opacity: visible ? 1 : 0
        }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
