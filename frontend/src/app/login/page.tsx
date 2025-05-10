import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Shield, Globe, Lock, Server } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { redirect } from "next/navigation";

export default function LoginPage() {
  redirect("/");
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-[#b2e0e5] to-[#8ecbd3] text-[#0d1a59] font-sans">
      {/* Navbar */}
      <Navbar showLoginOnly={true} />

      {/* Login Section */}
      <section className="flex-1 flex items-center justify-center relative px-4 py-20 bg-gradient-to-b from-[#0d1a59] to-[#17285d] text-white">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#2d00b3] rounded-full -translate-y-1/2 translate-x-1/4 opacity-50 blur-xl z-0"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00aaff] rounded-full translate-y-1/3 -translate-x-1/3 opacity-30 blur-xl z-0"></div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full relative z-10">
          {/* Left Side - Login Form */}
          <div className="bg-[#17285d]/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-[#2d4483]/30">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Login</h2>
              <p className="text-sm text-gray-300">
                Enter your registered credentials
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
                    placeholder="Enter your phone number"
                    className="pl-10 py-3 bg-[#0d1a59]/70 border-[#2d4483] rounded-lg w-full"
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
                    placeholder="Enter your password"
                    className="pl-10 py-3 bg-[#0d1a59]/70 border-[#2d4483] rounded-lg w-full"
                  />
                </div>
              </div>

              {/* Server IP Field */}
              <div className="space-y-2">
                <label htmlFor="server" className="block text-sm font-medium">
                  Server IP
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Server className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="server"
                    type="text"
                    placeholder="Enter server IP address"
                    className="pl-10 py-3 bg-[#0d1a59]/70 border-[#2d4483] rounded-lg w-full"
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

          {/* Right Side - Information */}
          <div className="bg-[#17285d]/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-[#2d4483]/30 flex flex-col">
            <h3 className="text-2xl font-bold mb-4 text-[#00aaff]">
              Welcome to Ringi
            </h3>

            <div className="space-y-6 flex-1">
              <div className="flex items-start space-x-3">
                <Phone className="h-6 w-6 text-[#00aaff] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Kamailio-Powered VoIP</h4>
                  <p className="text-sm text-gray-300">
                    Ringi uses Kamailio server for secure and reliable voice and
                    video communication over the internet.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Shield className="h-6 w-6 text-[#00aaff] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Secure Communication</h4>
                  <p className="text-sm text-gray-300">
                    Your calls are secured with industry-standard encryption
                    protocols, ensuring your conversations remain private.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Globe className="h-6 w-6 text-[#00aaff] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">UDP Protocol</h4>
                  <p className="text-sm text-gray-300">
                    We use UDP protocol for low-latency, real-time
                    communication, providing you with crystal-clear voice and
                    video quality.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#2d4483]">
              <p className="text-sm text-gray-300 italic">
                "Simplify Your Communication with Kamailio-Powered VoIP
                Platform. Real-time voice and video calls, right from your
                browser."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
