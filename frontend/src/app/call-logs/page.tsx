import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Video, Filter, Download, Search } from "lucide-react";
import { CallLogItem } from "@/components/call-log-item";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { CallLog } from "@/types/call-log";

export default function CallLogsPage() {
  // Sample call log data with explicit type annotations
  const callLogs: CallLog[] = [
    {
      id: 1,
      phoneNumber: "+62 812-3456-7890",
      type: "voice" as const,
      direction: "incoming" as const,
      status: "missed" as const,
      duration: "0:00",
      timestamp: "2025-05-09 10:30 AM",
      callStatus: "Ended",
    },
    // ... other call logs
  ];

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-[#b2e0e5] to-[#8ecbd3] text-[#0d1a59] font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Call Logs Section */}
      <section className="flex-1 relative px-4 py-16 bg-gradient-to-b from-[#0d1a59] to-[#17285d] text-white">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Call History
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              View and manage your call logs with detailed information
            </p>
          </div>

          <Card className="bg-[#17285d]/80 backdrop-blur-sm border-[#2d4483]/30 text-white mb-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Call Logs</CardTitle>
                  <CardDescription className="text-gray-300">
                    Your complete call history
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search logs..."
                      className="pl-8 bg-[#0d1a59]/70 border-[#2d4483] w-full md:w-auto"
                    />
                  </div>

                  {/* Tooltip Provider around all tooltips */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-[#2d4483] text-white w-10 p-0"
                        >
                          <Filter className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Filter</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-[#2d4483] text-white w-10 p-0"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Export</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="bg-[#0d1a59] mb-4">
                  <TabsTrigger value="all">All Calls</TabsTrigger>
                  <TabsTrigger value="missed">Missed</TabsTrigger>
                  <TabsTrigger value="incoming">Incoming</TabsTrigger>
                  <TabsTrigger value="outgoing">Outgoing</TabsTrigger>
                </TabsList>

                {/* Display the call logs here */}
                <TabsContent value="all" className="space-y-3">
                  <div className="bg-[#0d1a59] p-3 rounded-lg grid grid-cols-12 text-sm font-medium text-gray-300 hidden md:grid">
                    <div className="col-span-1">Type</div>
                    <div className="col-span-3">Number</div>
                    <div className="col-span-2">Direction</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Duration</div>
                    <div className="col-span-2">Time</div>
                  </div>

                  {callLogs.map((log) => (
                    <CallLogItem key={log.id} log={log} />
                  ))}
                </TabsContent>
                {/* Other Tab Contents */}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
