
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-riverguard-50 to-riverguard-100">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-bold text-riverguard-800 mb-4">404</h1>
        <div className="w-24 h-1 mx-auto bg-riverguard-500 mb-6"></div>
        <p className="text-xl text-riverguard-700 mb-6">The page you are looking for might have been removed or is temporarily unavailable.</p>
        <Button asChild>
          <Link to="/" className="text-white bg-riverguard-600 hover:bg-riverguard-700">
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
