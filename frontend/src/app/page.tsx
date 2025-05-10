import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Lock, Server } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0a1642] text-white font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 bg-[#0a1642]">
        <h1 className="text-3xl font-bold font-aclonica text-white">Ringi</h1>
        <ul className="flex space-x-8 text-sm font-medium">
          <li className="hover:text-cyan-300 cursor-pointer">
            <Link href="/">Home</Link>
          </li>
        </ul>
      </nav>

      {/* Login Section */}
      <section className="flex-1 flex items-center justify-center">
        <div className="bg-[#0f1f54] p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">Login</h2>
            <p className="text-sm text-gray-300">
              Enter your credentials to continue
            </p>
          </div>

          <div className="space-y-6">
            {/* Phone Number Field */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  className="pl-10 py-3 bg-[#0a1642] border-[#2d4483] rounded-lg w-full"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  className="pl-10 py-3 bg-[#0a1642] border-[#2d4483] rounded-lg w-full"
                />
              </div>
            </div>

            {/* Server IP Field */}
            <div className="space-y-2">
              <label htmlFor="server" className="block text-sm font-medium">
                IP Server
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Server className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="server"
                  type="text"
                  placeholder="e.g. 192.168.1.1"
                  className="pl-10 py-3 bg-[#0a1642] border-[#2d4483] rounded-lg w-full"
                />
              </div>
            </div>

            <Link href="/home">
              <Button className="w-full bg-[#00aaff] hover:bg-cyan-600 text-white py-3 rounded-lg transition">
                Login
              </Button>
            </Link>

            <div className="text-center text-sm">
              <p>
                Don't have an account?{" "}
                <Link href="#" className="text-[#00aaff] hover:underline">
                  Contact Admin
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
