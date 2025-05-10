"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CallInterface from "@/components/call-interface";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function CallPage() {
  const searchParams = useSearchParams();
  const callType = searchParams.get("type") || "voice";
  const [showUI, setShowUI] = useState(false);

  // Hide navbar and footer during active call
  useEffect(() => {
    setShowUI(true);
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-[#0d1a59] to-[#17285d] text-white font-sans">
      {/* Only show navbar when not in active call */}
      {showUI && <Navbar />}

      {/* Call Interface */}
      <CallInterface initialCallType={callType as "voice" | "video"} />

      {/* Only show footer when not in active call */}
      {showUI && <Footer />}
    </main>
  );
}
