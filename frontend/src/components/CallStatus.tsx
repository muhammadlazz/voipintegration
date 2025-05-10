"use client";

import { useEffect, useState } from "react";
import { useCallSocket } from "@/hooks/useCallSocket";
import { Button } from "@/components/ui/button";
import { Phone, Video, Mic, MicOff, VideoOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDuration } from "@/lib/utils";

interface CallStatusProps {
  callId: string;
  phoneNumber: string;
  callType: 'audio' | 'video';
}

export default function CallStatus({ callId, phoneNumber, callType }: CallStatusProps) {
  const router = useRouter();
  const { activeCall, callStatus, endCall } = useCallSocket();
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  // Start timer when call is active
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (callStatus === 'start') {
      timer = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [callStatus]);

  // Handle end call and navigation
  const handleEndCall = async () => {
    try {
      await endCall();
      router.push('/dashboard');
    } catch (error) {
      console.error('Error ending call:', error);
    }
  };

  // Get human-readable status text
  const getStatusText = () => {
    switch (callStatus) {
      case 'calling': return 'Calling...';
      case 'ringing': return 'Ringing...';
      case 'start': return 'In Call';
      case 'end': return 'Call Ended';
      default: return callStatus || 'Connecting...';
    }
  };

  // Toggle mute
  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    // Here you would implement actual audio muting logic with your SIP implementation
  };

  // Toggle video
  const handleToggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    // Here you would implement actual video toggling logic with your SIP implementation
  };

  // If call has ended, show simplified view
  if (callStatus === 'end') {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 h-full">
        <h2 className="text-2xl font-semibold text-gray-200">Call Ended</h2>
        <p className="text-gray-400">Duration: {formatDuration(duration)}</p>
        <Button 
          onClick={() => router.push('/dashboard')}
          className="mt-6 bg-[#2d4483] hover:bg-[#3d5493]"
        >
          Return to Dial Pad
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Call info */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        <div className="h-32 w-32 bg-[#2d4483] rounded-full flex items-center justify-center">
          <span className="text-4xl font-bold text-white">{phoneNumber.charAt(0).toUpperCase()}</span>
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-200">{phoneNumber}</h2>
        
        <div className="flex flex-col items-center">
          <p className="text-gray-400">{getStatusText()}</p>
          {callStatus === 'start' && (
            <p className="text-gray-500 mt-1">{formatDuration(duration)}</p>
          )}
        </div>

        {/* Video container would go here for video calls */}
        {callType === 'video' && !isVideoOff && callStatus === 'start' && (
          <div className="relative w-full max-w-lg h-64 bg-gray-800 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-400">Video stream would appear here</p>
            </div>
          </div>
        )}
      </div>

      {/* Call controls */}
      <div className="bg-[#0d1a59] p-6 rounded-t-xl">
        <div className="flex justify-center items-center space-x-8">
          {/* Mute button */}
          <Button
            onClick={handleToggleMute}
            variant="ghost"
            className="h-14 w-14 rounded-full bg-gray-700 hover:bg-gray-600"
          >
            {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </Button>

          {/* End call button */}
          <Button
            onClick={handleEndCall}
            className="h-16 w-16 rounded-full bg-red-600 hover:bg-red-700"
          >
            <Phone className="h-8 w-8 transform rotate-135" />
          </Button>

          {/* Video toggle button (only for video calls) */}
          {callType === 'video' && (
            <Button
              onClick={handleToggleVideo}
              variant="ghost"
              className="h-14 w-14 rounded-full bg-gray-700 hover:bg-gray-600"
            >
              {isVideoOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}