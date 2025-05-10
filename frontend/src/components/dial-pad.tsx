"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SkipBackIcon as Backspace, Phone, Video } from "lucide-react";
import Link from "next/link";

export default function DialPad() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleNumberClick = (num: string) => {
    setPhoneNumber((prev) => prev + num);
  };

  const handleBackspace = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPhoneNumber("");
  };

  return (
    <div className="space-y-6">
      <Input
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="text-center text-xl py-4 bg-[#0d1a59]/70 border-[#2d4483] rounded-lg"
        placeholder="Enter phone number"
      />

      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((num) => (
          <Button
            key={num}
            onClick={() => handleNumberClick(num.toString())}
            className="bg-[#2d4483] hover:bg-[#3d5493] h-14 text-xl font-medium rounded-full"
          >
            {num}
          </Button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <Button
          onClick={handleClear}
          variant="ghost"
          className="text-gray-300 hover:text-white hover:bg-transparent"
        >
          Clear
        </Button>

        <Button
          onClick={handleBackspace}
          variant="ghost"
          className="text-gray-300 hover:text-white hover:bg-transparent"
        >
          <Backspace className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex space-x-4 mt-6">
        <Link
          href={`/call?number=${encodeURIComponent(phoneNumber)}`}
          className="flex-1"
        >
          <Button
            disabled={!phoneNumber}
            className="w-full bg-green-500 hover:bg-green-600 h-14 rounded-full flex items-center justify-center"
          >
            <Phone className="h-6 w-6 mr-2" /> Call
          </Button>
        </Link>

        <Link
          href={`/call?number=${encodeURIComponent(phoneNumber)}&type=video`}
          className="flex-1"
        >
          <Button
            disabled={!phoneNumber}
            className="w-full bg-blue-500 hover:bg-blue-600 h-14 rounded-full flex items-center justify-center"
          >
            <Video className="h-6 w-6 mr-2" /> Video
          </Button>
        </Link>
      </div>
    </div>
  );
}
