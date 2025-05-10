"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Video,
  Mic,
  MicOff,
  PhoneOff,
  Camera,
  CameraOff,
  Phone,
  Volume2,
  VolumeX,
} from "lucide-react";
import Link from "next/link";

type CallStatus = "calling" | "ringing" | "in-call" | "ended";

type CallInterfaceProps = {
  initialCallType?: "voice" | "video";
};

export default function CallInterface({
  initialCallType = "voice",
}: CallInterfaceProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("number") || "+62 812-3456-7890";

  const [callStatus, setCallStatus] = useState<CallStatus>("calling");
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callType, setCallType] = useState<"voice" | "video">(initialCallType);

  // Simulate call progress
  useEffect(() => {
    const timer = setTimeout(() => {
      if (callStatus === "calling") {
        setCallStatus("ringing");
      } else if (callStatus === "ringing") {
        setCallStatus("in-call");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [callStatus]);

  // Call timer
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (callStatus === "in-call") {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callStatus]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleEndCall = () => {
    setCallStatus("ended");

    // Log the call to database (would be implemented with actual backend)
    console.log("Call ended and logged to database", {
      phoneNumber,
      type: callType,
      duration: formatDuration(duration),
      status: callStatus,
    });
  };

  const getStatusText = () => {
    switch (callStatus) {
      case "calling":
        return "Calling...";
      case "ringing":
        return "Ringing...";
      case "in-call":
        return formatDuration(duration);
      case "ended":
        return "Call Ended";
      default:
        return "";
    }
  };

  const getStatusColor = () => {
    switch (callStatus) {
      case "calling":
        return "text-yellow-400";
      case "ringing":
        return "text-blue-400";
      case "in-call":
        return "text-green-400";
      case "ended":
        return "text-red-400";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-[#0d1a59] to-[#17285d] p-6">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#2d00b3] rounded-full -translate-y-1/2 translate-x-1/4 opacity-30 blur-xl z-0"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00aaff] rounded-full translate-y-1/3 -translate-x-1/3 opacity-20 blur-xl z-0"></div>

      {/* Call Header */}
      <div className="w-full flex justify-between items-center relative z-10">
        <Link href="/dial-pad">
          <Button variant="ghost" className="text-white hover:bg-[#17285d]">
            Back
          </Button>
        </Link>
        <div className="text-center">
          <h2 className="text-xl font-bold">
            {callType === "voice" ? "Voice Call" : "Video Call"}
          </h2>
          <p className={`text-sm ${getStatusColor()}`}>
            Using UDP protocol via Kamailio
          </p>
        </div>
        <div className="w-16"></div> {/* Spacer for alignment */}
      </div>

      {/* Call Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md relative z-10">
        {callType === "video" && isVideoEnabled ? (
          <div className="bg-[#17285d]/80 backdrop-blur-sm border border-[#2d4483]/30 rounded-xl w-full aspect-video mb-8 flex items-center justify-center relative overflow-hidden">
            {/* Video would be rendered here with WebRTC */}
            <p className="text-gray-400">Video Preview</p>

            {/* Self view for video call */}
            <div className="absolute bottom-4 right-4 w-32 h-24 bg-[#0d1a59] rounded-lg border border-[#2d4483] flex items-center justify-center">
              <p className="text-xs text-gray-400">Your Camera</p>
            </div>
          </div>
        ) : (
          <div className="bg-[#17285d]/80 backdrop-blur-sm border border-[#2d4483]/30 rounded-full w-32 h-32 flex items-center justify-center mb-8">
            <span className="text-4xl">👤</span>
          </div>
        )}

        <h3 className="text-2xl font-bold mb-2">{phoneNumber}</h3>
        <div className="flex flex-col items-center">
          <p className={`text-lg ${getStatusColor()} font-medium`}>
            {getStatusText()}
          </p>
          <p className="text-sm text-gray-300 mt-1">
            {callStatus === "in-call" && "Secure connection established"}
            {callStatus === "calling" && "Initiating connection..."}
            {callStatus === "ringing" && "Waiting for answer..."}
            {callStatus === "ended" && "Connection terminated"}
          </p>
        </div>

        {/* Call quality indicator */}
        {callStatus === "in-call" && (
          <div className="mt-4 flex items-center">
            <div className="flex space-x-1 mr-2">
              <div className="w-1 h-3 bg-green-500 rounded"></div>
              <div className="w-1 h-4 bg-green-500 rounded"></div>
              <div className="w-1 h-5 bg-green-500 rounded"></div>
              <div className="w-1 h-6 bg-green-500 rounded"></div>
            </div>
            <span className="text-xs text-gray-300">Excellent connection</span>
          </div>
        )}
      </div>

      {/* Call Controls */}
      <div
        className={`w-full max-w-md relative z-10 ${
          callStatus === "ended" ? "hidden" : "block"
        }`}
      >
        <div className="bg-[#17285d]/80 backdrop-blur-sm border border-[#2d4483]/30 rounded-xl p-6">
          <div className="grid grid-cols-3 gap-4">
            <Button
              onClick={() => setIsMuted(!isMuted)}
              className={`rounded-full h-16 w-16 flex items-center justify-center mx-auto ${
                isMuted
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-[#2d4483] hover:bg-[#3d5493]"
              }`}
            >
              {isMuted ? (
                <MicOff className="h-6 w-6" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </Button>

            <Button
              onClick={handleEndCall}
              className="bg-red-600 hover:bg-red-700 rounded-full h-16 w-16 flex items-center justify-center mx-auto"
            >
              <PhoneOff className="h-6 w-6" />
            </Button>

            {callType === "video" ? (
              <Button
                onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                className={`rounded-full h-16 w-16 flex items-center justify-center mx-auto ${
                  isVideoEnabled
                    ? "bg-[#2d4483] hover:bg-[#3d5493]"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isVideoEnabled ? (
                  <Camera className="h-6 w-6" />
                ) : (
                  <CameraOff className="h-6 w-6" />
                )}
              </Button>
            ) : (
              <Button
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                className={`rounded-full h-16 w-16 flex items-center justify-center mx-auto ${
                  isSpeakerOn
                    ? "bg-[#2d4483] hover:bg-[#3d5493]"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isSpeakerOn ? (
                  <Volume2 className="h-6 w-6" />
                ) : (
                  <VolumeX className="h-6 w-6" />
                )}
              </Button>
            )}
          </div>

          {/* Additional controls */}
          <div className="flex justify-center mt-6">
            {callType === "voice" && (
              <Button
                onClick={() => setCallType("video")}
                variant="outline"
                className="text-white border-[#2d4483] hover:bg-[#2d4483]"
              >
                <Video className="h-4 w-4 mr-2" /> Switch to Video
              </Button>
            )}
            {callType === "video" && (
              <Button
                onClick={() => setCallType("voice")}
                variant="outline"
                className="text-white border-[#2d4483] hover:bg-[#2d4483]"
              >
                <Phone className="h-4 w-4 mr-2" /> Switch to Voice
              </Button>
            )}
          </div>
        </div>

        {/* Call information */}
        <div className="mt-4 text-center text-xs text-gray-300">
          <p>Using Kamailio VoIP Server • UDP Protocol</p>
          <p>End-to-end encrypted communication</p>
        </div>
      </div>

      {/* Call Ended Actions */}
      {callStatus === "ended" && (
        <div className="w-full max-w-md relative z-10">
          <div className="bg-[#17285d]/80 backdrop-blur-sm border border-[#2d4483]/30 rounded-xl p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">Call Summary</h3>
              <p className="text-gray-300">
                {callType === "voice" ? "Voice call" : "Video call"} to{" "}
                {phoneNumber}
              </p>
              <p className="text-lg font-medium mt-2">
                Duration: {formatDuration(duration)}
              </p>
            </div>

            <div className="flex flex-col space-y-3">
              <Link href="/dial-pad">
                <Button className="w-full bg-[#00aaff] hover:bg-cyan-600">
                  <Phone className="h-4 w-4 mr-2" /> New Call
                </Button>
              </Link>
              <Link href="/call-logs">
                <Button
                  variant="outline"
                  className="w-full border-white text-white hover:bg-[#17285d]"
                >
                  View Call Logs
                </Button>
              </Link>
              <Link href="/home">
                <Button
                  variant="ghost"
                  className="w-full text-white hover:bg-[#17285d]"
                >
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
