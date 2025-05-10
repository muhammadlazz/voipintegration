export type CallType = "voice" | "video";
export type CallDirection = "incoming" | "outgoing";
export type CallStatus = "missed" | "completed";
export type CallProgressStatus = "calling" | "ringing" | "in-call" | "ended";

export interface CallLog {
  id: number;
  phoneNumber: string;
  type: CallType;
  direction: CallDirection;
  status: CallStatus;
  callStatus: string;
  duration: string;
  timestamp: string;
}
