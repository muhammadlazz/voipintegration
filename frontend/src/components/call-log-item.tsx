import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Video, ArrowDownLeft, ArrowUpRight, X } from "lucide-react";

type CallLog = {
  id: number;
  phoneNumber: string;
  type: "voice" | "video";
  direction: "incoming" | "outgoing";
  status: "missed" | "completed";
  duration: string;
  timestamp: string;
  callStatus: string;
};

type CallLogItemProps = {
  log: CallLog;
};

export function CallLogItem({ log }: CallLogItemProps) {
  const getStatusColor = () => {
    if (log.status === "missed") return "text-red-500";
    return "text-green-500";
  };

  const getDirectionIcon = () => {
    if (log.direction === "incoming") {
      return log.status === "missed" ? (
        <X className="h-4 w-4 text-red-500" />
      ) : (
        <ArrowDownLeft className="h-4 w-4 text-green-500" />
      );
    }
    return <ArrowUpRight className="h-4 w-4 text-blue-500" />;
  };

  const getTypeIcon = () => {
    if (log.type === "voice") {
      return <Phone className="h-5 w-5" />;
    }
    return <Video className="h-5 w-5" />;
  };

  return (
    <div className="bg-[#0d1a59] rounded-lg hover:bg-[#1a2a6a] transition-colors">
      {/* Mobile view */}
      <div className="flex flex-col p-4 md:hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="bg-[#2d4483] p-2 rounded-full mr-3">
              {getTypeIcon()}
            </div>
            <div>
              <p className="font-medium">{log.phoneNumber}</p>
              <div className="flex items-center space-x-1 text-xs text-gray-300">
                {getDirectionIcon()}
                <span>{log.timestamp}</span>
              </div>
            </div>
          </div>
          <Link
            href={`/call?number=${encodeURIComponent(log.phoneNumber)}&type=${
              log.type
            }`}
          >
            <Button
              size="icon"
              className="h-8 w-8 rounded-full bg-green-500 hover:bg-green-600"
            >
              <Phone className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-300">Status:</p>
            <p className={getStatusColor()}>
              {log.status === "missed" ? "Missed" : "Completed"}
            </p>
          </div>
          <div>
            <p className="text-gray-300">Call Status:</p>
            <p>{log.callStatus}</p>
          </div>
          <div>
            <p className="text-gray-300">Duration:</p>
            <p>{log.duration}</p>
          </div>
          <div>
            <p className="text-gray-300">Type:</p>
            <p>{log.type === "voice" ? "Voice Call" : "Video Call"}</p>
          </div>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden md:grid md:grid-cols-12 md:items-center p-3">
        <div className="col-span-1 flex items-center">
          <div className="bg-[#2d4483] p-1.5 rounded-full">{getTypeIcon()}</div>
        </div>
        <div className="col-span-3">{log.phoneNumber}</div>
        <div className="col-span-2 flex items-center">
          {getDirectionIcon()}
          <span className="ml-1">
            {log.direction === "incoming" ? "Incoming" : "Outgoing"}
          </span>
        </div>
        <div className={`col-span-2 ${getStatusColor()}`}>
          {log.callStatus} ({log.status === "missed" ? "Missed" : "Completed"})
        </div>
        <div className="col-span-2">{log.duration}</div>
        <div className="col-span-2 flex items-center justify-between">
          <span className="text-sm text-gray-300">{log.timestamp}</span>
          <Link
            href={`/call?number=${encodeURIComponent(log.phoneNumber)}&type=${
              log.type
            }`}
          >
            <Button
              size="icon"
              className="h-7 w-7 rounded-full bg-green-500 hover:bg-green-600"
            >
              <Phone className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
