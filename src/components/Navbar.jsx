import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center gap-8">
        <Link to="/" className="flex items-center gap-2">
          <FileText className="text-blue-700" size={25} />
          <span className="text-2xl font-bold text-blue-700">HiForms</span>
        </Link>

        <ul className="flex gap-8 text-gray-700 font-medium">
          <li>
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>

          <li className="cursor-pointer hover:text-blue-600">About</li>

          <li className="cursor-pointer hover:text-blue-600">Features</li>

          <li className="cursor-pointer hover:text-blue-600">Dashboard</li>

          <li className="cursor-pointer hover:text-blue-600">Contact</li>
        </ul>

        <Link
          to="/user-auth"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Get started
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
