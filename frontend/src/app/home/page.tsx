import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Video,
  Info,
  Clock,
  User,
  Settings,
  Headphones,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-[#b2e0e5] to-[#8ecbd3] text-[#0d1a59] font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative px-4 py-16 bg-gradient-to-b from-[#0d1a59] to-[#17285d] text-white">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#2d00b3] rounded-full -translate-y-1/2 translate-x-1/4 opacity-50 blur-xl z-0"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-aclonica">
              Welcome to Ringi
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your complete VoIP solution powered by Kamailio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dial Pad Card */}
            <Card className="bg-[#17285d]/80 backdrop-blur-sm border-[#2d4483]/30 text-white hover:shadow-lg hover:shadow-[#00aaff]/20 transition-all">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-[#00aaff]/20 flex items-center justify-center mb-2">
                  <Phone className="h-6 w-6 text-[#00aaff]" />
                </div>
                <CardTitle>Dial Pad</CardTitle>
                <CardDescription className="text-gray-300">
                  Make calls to any number
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-4">
                  Enter any phone number and make high-quality voice calls
                  directly from your browser.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/dial-pad" className="w-full">
                  <Button className="w-full bg-[#00aaff] hover:bg-cyan-600">
                    Open Dial Pad
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Call Card */}
            <Card className="bg-[#17285d]/80 backdrop-blur-sm border-[#2d4483]/30 text-white hover:shadow-lg hover:shadow-[#00aaff]/20 transition-all">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-[#00aaff]/20 flex items-center justify-center mb-2">
                  <Video className="h-6 w-6 text-[#00aaff]" />
                </div>
                <CardTitle>Call</CardTitle>
                <CardDescription className="text-gray-300">
                  Voice & Video Communication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-4">
                  Make crystal-clear voice calls or face-to-face video calls
                  using our advanced VoIP technology.
                </p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Link href="/call" className="flex-1">
                  <Button className="w-full bg-green-500 hover:bg-green-600">
                    <Phone className="h-4 w-4 mr-2" /> Voice
                  </Button>
                </Link>
                <Link href="/call?type=video" className="flex-1">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    <Video className="h-4 w-4 mr-2" /> Video
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* About Card */}
            <Card className="bg-[#17285d]/80 backdrop-blur-sm border-[#2d4483]/30 text-white hover:shadow-lg hover:shadow-[#00aaff]/20 transition-all">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-[#00aaff]/20 flex items-center justify-center mb-2">
                  <Info className="h-6 w-6 text-[#00aaff]" />
                </div>
                <CardTitle>About</CardTitle>
                <CardDescription className="text-gray-300">
                  Information & Profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-4">
                  Learn more about Ringi, view your profile information, and
                  discover the team behind this platform.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/about" className="w-full">
                  <Button className="w-full bg-[#00aaff] hover:bg-cyan-600">
                    View About
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0d1a59]">
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#00aaff]/20 flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-[#00aaff]" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#0d1a59]">
                HD Voice Calls
              </h3>
              <p className="text-gray-600">
                Crystal-clear audio quality for all your voice communications
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#00aaff]/20 flex items-center justify-center mx-auto mb-4">
                <Video className="h-8 w-8 text-[#00aaff]" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#0d1a59]">
                Video Conferencing
              </h3>
              <p className="text-gray-600">
                Face-to-face communication with high-quality video
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#00aaff]/20 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-[#00aaff]" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#0d1a59]">
                Call History
              </h3>
              <p className="text-gray-600">
                Detailed logs of all your communications
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#00aaff]/20 flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-[#00aaff]" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#0d1a59]">
                Kamailio Integration
              </h3>
              <p className="text-gray-600">
                Powered by industry-standard VoIP technology
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="px-4 py-16 bg-gradient-to-b from-[#f0f9fa] to-[#b2e0e5]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#0d1a59]">
            Quick Access
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/dial-pad">
              <Button className="w-full h-20 bg-[#17285d] hover:bg-[#0d1a59]">
                <Phone className="h-6 w-6 mr-2" /> Dial Pad
              </Button>
            </Link>

            <Link href="/call-logs">
              <Button className="w-full h-20 bg-[#17285d] hover:bg-[#0d1a59]">
                <Clock className="h-6 w-6 mr-2" /> Call Logs
              </Button>
            </Link>

            <Link href="/call">
              <Button className="w-full h-20 bg-[#17285d] hover:bg-[#0d1a59]">
                <Headphones className="h-6 w-6 mr-2" /> New Call
              </Button>
            </Link>

            <Link href="/about">
              <Button className="w-full h-20 bg-[#17285d] hover:bg-[#0d1a59]">
                <User className="h-6 w-6 mr-2" /> Profile
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
