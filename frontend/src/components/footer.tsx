import Link from "next/link";
import { Phone, Mail, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#17285d] text-white px-6 md:px-10 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Ringi</h3>
            <p className="text-sm text-gray-300">
              A modern VoIP communication platform powered by Kamailio, using
              UDP protocol for high-quality voice and video calls.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-cyan-300">
                <Link href="/home">Home</Link>
              </li>
              <li className="hover:text-cyan-300">
                <Link href="/dial-pad">Dial Pad</Link>
              </li>
              <li className="hover:text-cyan-300">
                <Link href="/call-logs">Call Logs</Link>
              </li>
              <li className="hover:text-cyan-300">
                <Link href="/about">About</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">Voice Calls</li>
              <li className="text-gray-300">Video Calls</li>
              <li className="text-gray-300">Call History</li>
              <li className="text-gray-300">Kamailio Integration</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-[#00aaff]" />
                <span className="text-gray-300">+62 812-3456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-[#00aaff]" />
                <span className="text-gray-300">contact@ringi.com</span>
              </li>
              <li className="flex items-center">
                <Github className="h-4 w-4 mr-2 text-[#00aaff]" />
                <span className="text-gray-300">github.com/ringi</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#2d4483] text-center">
          <p className="text-xs text-gray-300">
            © 2025 Ringi. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
