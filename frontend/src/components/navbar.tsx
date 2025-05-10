import Link from "next/link";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

type NavbarProps = {
  showLoginOnly?: boolean;
};

export default function Navbar({ showLoginOnly = false }: NavbarProps) {
  return (
    <nav className="flex justify-between items-center px-6 md:px-10 py-4 bg-[#17285d] text-white sticky top-0 z-50 shadow-md">
      <Link href="/home" className="flex items-center">
        <h1 className="text-2xl md:text-3xl font-bold font-aclonica">Ringi</h1>
      </Link>

      {!showLoginOnly && (
        <ul className="hidden md:flex space-x-8 text-sm font-medium">
          <li className="hover:text-cyan-300 cursor-pointer">
            <Link href="/home">Home</Link>
          </li>
          <li className="hover:text-cyan-300 cursor-pointer">
            <Link href="/dial-pad">Dial Pad</Link>
          </li>
          <li className="hover:text-cyan-300 cursor-pointer">
            <Link href="/call-logs">Call Logs</Link>
          </li>
          <li className="hover:text-cyan-300 cursor-pointer">
            <Link href="/about">About</Link>
          </li>
        </ul>
      )}

      {!showLoginOnly && (
        <div className="flex items-center space-x-2">
          <Link href="/about">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-9 w-9 bg-[#2d4483] hover:bg-[#3d5493]"
            >
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
