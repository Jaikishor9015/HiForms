import { FileText } from "lucide-react";

function AuthNavbar() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-2">
          <FileText className="text-blue-700" size={25} />

          <span className="text-2xl font-bold text-blue-700">HiForms</span>
        </div>
      </div>
    </nav>
  );
}

export default AuthNavbar;
