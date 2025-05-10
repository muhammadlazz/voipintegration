import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Video, User } from "lucide-react";
import DialPad from "@/components/dial-pad";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DialPadPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-[#b2e0e5] to-[#8ecbd3] text-[#0d1a59] font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Dial Pad Section */}
      <section className="flex-1 relative px-4 py-16 bg-gradient-to-b from-[#0d1a59] to-[#17285d] text-white">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#2d00b3] rounded-full -translate-y-1/2 translate-x-1/4 opacity-50 blur-xl z-0"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00aaff] rounded-full translate-y-1/3 -translate-x-1/3 opacity-30 blur-xl z-0"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Dial Pad</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Enter a phone number to make a call or select from your quick
              contacts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dial Pad */}
            <div className="md:col-span-2">
              <Card className="bg-[#17285d]/80 backdrop-blur-sm border-[#2d4483]/30 text-white">
                <CardHeader>
                  <CardTitle>Enter Number</CardTitle>
                  <CardDescription className="text-gray-300">
                    Dial a phone number to call
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DialPad />
                </CardContent>
              </Card>
            </div>

            {/* Quick Contacts */}
            <div>
              <Card className="bg-[#17285d]/80 backdrop-blur-sm border-[#2d4483]/30 text-white mb-6">
                <CardHeader>
                  <CardTitle>Quick Contacts</CardTitle>
                  <CardDescription className="text-gray-300">
                    Your favorite contacts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "John Doe", number: "+62 812-3456-7890" },
                    { name: "Jane Smith", number: "+62 812-3456-7891" },
                    { name: "Alex Johnson", number: "+62 812-3456-7892" },
                  ].map((contact, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-[#0d1a59] rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-[#2d4483] flex items-center justify-center mr-3">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-gray-300">
                            {contact.number}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/call?number=${encodeURIComponent(
                            contact.number
                          )}`}
                        >
                          <Button
                            size="icon"
                            className="h-8 w-8 rounded-full bg-green-500 hover:bg-green-600"
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link
                          href={`/call?number=${encodeURIComponent(
                            contact.number
                          )}&type=video`}
                        >
                          <Button
                            size="icon"
                            className="h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600"
                          >
                            <Video className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-[#17285d]/80 backdrop-blur-sm border-[#2d4483]/30 text-white">
                <CardHeader>
                  <CardTitle>Recent Calls</CardTitle>
                  <CardDescription className="text-gray-300">
                    Your recent call history
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { number: "+62 812-3456-7890", time: "10:30 AM" },
                    { number: "+62 812-3456-7891", time: "Yesterday" },
                  ].map((call, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-[#0d1a59] rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{call.number}</p>
                        <p className="text-sm text-gray-300">{call.time}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/call?number=${encodeURIComponent(
                            call.number
                          )}`}
                        >
                          <Button
                            size="icon"
                            className="h-8 w-8 rounded-full bg-green-500 hover:bg-green-600"
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                  <Link
                    href="/call-logs"
                    className="block text-center text-sm text-[#00aaff] hover:underline mt-2"
                  >
                    View all call history
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-12 bg-[#17285d]/80 backdrop-blur-sm border border-[#2d4483]/30 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">How to Make a Call</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#00aaff]/20 flex items-center justify-center mb-3">
                  <span className="text-xl font-bold text-[#00aaff]">1</span>
                </div>
                <p className="text-sm text-gray-300">
                  Enter the phone number using the dial pad or select a contact
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#00aaff]/20 flex items-center justify-center mb-3">
                  <span className="text-xl font-bold text-[#00aaff]">2</span>
                </div>
                <p className="text-sm text-gray-300">
                  Choose between voice call or video call
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#00aaff]/20 flex items-center justify-center mb-3">
                  <span className="text-xl font-bold text-[#00aaff]">3</span>
                </div>
                <p className="text-sm text-gray-300">
                  Wait for the connection and enjoy your conversation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
