
import { Link } from 'react-router-dom';

const Notfound = () => {
    return (
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors">
            Back to Home
          </Link>
        </div>
      );
}

export default Notfound