import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Phone, Code, Globe, Mail, Github, Linkedin } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-[#b2e0e5] to-[#8ecbd3] text-[#0d1a59] font-sans">
      {/* Navbar */}
      <Navbar />

      {/* About Section */}
      <section className="flex-1 relative px-4 py-16 bg-gradient-to-b from-[#0d1a59] to-[#17285d] text-white">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#2d00b3] rounded-full -translate-y-1/2 translate-x-1/4 opacity-50 blur-xl z-0"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00aaff] rounded-full translate-y-1/3 -translate-x-1/3 opacity-30 blur-xl z-0"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-aclonica">
              About Ringi
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A modern VoIP communication platform powered by Kamailio
            </p>
          </div>

          {/* Project Description */}
          <Card className="bg-[#17285d]/80 backdrop-blur-sm border-[#2d4483]/30 text-white mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Project Overview</CardTitle>
              <CardDescription className="text-gray-300">
                VoIP Communication Platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                This project aims to develop a website integrated with the
                Kamailio VoIP server, using UDP protocol for voice and video
                calls. Ringi provides a modern, user-friendly interface for
                making high-quality calls directly from your web browser.
              </p>
              <p>
                The platform leverages Kamailio's powerful SIP server
                capabilities to handle authentication and call routing, ensuring
                secure and reliable communication. Our implementation uses the
                UDP protocol for optimal real-time communication performance,
                minimizing latency and providing crystal-clear audio and video
                quality.
              </p>
              <p>
                With features like call history tracking, real-time call status
                updates, and support for both voice and video calls, Ringi
                offers a complete communication solution for personal and
                professional use.
              </p>
            </CardContent>
          </Card>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-[#17285d]/80 backdrop-blur-sm border-[#2d4483]/30 text-white">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-[#00aaff]/20 flex items-center justify-center mb-2">
                  <Phone className="h-6 w-6 text-[#00aaff]" />
                </div>
                <CardTitle>VoIP Calling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">
                  Make high-quality voice and video calls using Kamailio's VoIP
                  technology. Our platform supports HD audio and video
                  communication with minimal latency.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#17285d]/80 backdrop-blur-sm border-[#2d4483]/30 text-white">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-[#00aaff]/20 flex items-center justify-center mb-2">
                  <Code className="h-6 w-6 text-[#00aaff]" />
                </div>
                <CardTitle>UDP Protocol</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">
                  We use the UDP protocol for communication, optimizing for
                  real-time performance and low latency. This ensures your calls
                  remain clear and uninterrupted.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#17285d]/80 backdrop-blur-sm border-[#2d4483]/30 text-white">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-[#00aaff]/20 flex items-center justify-center mb-2">
                  <Globe className="h-6 w-6 text-[#00aaff]" />
                </div>
                <CardTitle>Browser-Based</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">
                  Access Ringi directly from your web browser without installing
                  additional software. Our platform works across devices and
                  operating systems.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Team Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Lovind Luthfan Hakeem F",
                  role: "VoIP Kamailio Server",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Lovind&gender=male",
                },
                {
                  name: "Hanif Athallah Wiharso",
                  role: "VoIP Kamailio Server",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Hanif&gender=male",
                },
                {
                  name: "Muhammad Lazuardi",
                  role: "Backend & Frontend Developer",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Muhammad&gender=male",
                },
                {
                  name: "Aurelia Aisya Rachma",
                  role: "UI/UX Design & Frontend",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Aurelia&gender=female",
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="bg-[#17285d]/80 backdrop-blur-sm rounded-xl p-6 text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-[#2d4483] mx-auto mb-4 overflow-hidden">
                    {/* Using DiceBear for placeholder avatars */}
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-[#00aaff] mb-4">{member.role}</p>
                  <div className="flex justify-center space-x-3">
                    <a href="#" className="text-gray-300 hover:text-white">
                      <Mail className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white">
                      <Github className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <Card className="bg-[#17285d]/80 backdrop-blur-sm border-[#2d4483]/30 text-white">
            <CardHeader>
              <CardTitle>Technology Stack</CardTitle>
              <CardDescription className="text-gray-300">
                The technologies powering Ringi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#0d1a59] p-4 rounded-lg text-center">
                  <h4 className="font-bold mb-1">Kamailio</h4>
                  <p className="text-sm text-gray-300">VoIP SIP Server</p>
                </div>
                <div className="bg-[#0d1a59] p-4 rounded-lg text-center">
                  <h4 className="font-bold mb-1">Next.js</h4>
                  <p className="text-sm text-gray-300">Frontend Framework</p>
                </div>
                <div className="bg-[#0d1a59] p-4 rounded-lg text-center">
                  <h4 className="font-bold mb-1">WebRTC</h4>
                  <p className="text-sm text-gray-300">
                    Real-time Communication
                  </p>
                </div>
                <div className="bg-[#0d1a59] p-4 rounded-lg text-center">
                  <h4 className="font-bold mb-1">UDP</h4>
                  <p className="text-sm text-gray-300">
                    Communication Protocol
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
