import { FileText, Mail, ShieldCheck, CircleHelp } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <FileText size={24} />
            <span className="text-xl font-bold">HiForms</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#" className="flex items-center gap-1 hover:text-white">
              <CircleHelp size={16} />
              Help
            </a>

            <a href="#" className="flex items-center gap-1 hover:text-white">
              <ShieldCheck size={16} />
              Privacy
            </a>

            <a href="#" className="flex items-center gap-1 hover:text-white">
              <Mail size={16} />
              Contact
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-5 pt-4 text-center">
          <p className="text-sm text-gray-500">
            © 2026 HiForms. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
