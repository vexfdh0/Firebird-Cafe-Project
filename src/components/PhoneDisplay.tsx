import { ReactNode } from "react";

interface PhoneDisplayProps {
  title: string;
  children: ReactNode;
  color?: string;
}

export default function PhoneDisplay({
  title,
  children,
  color = "bg-yellow-400",
}: PhoneDisplayProps) {
  return (
    <div className="flex flex-col items-center max-w-[360px] mx-auto">
      <h3
        className={`text-xl font-bold mb-2 ${color} px-4 py-1 rounded-full text-white`}
      >
        {title}
      </h3>
      <div className="relative border-8 border-stone-900 rounded-[40px] w-[320px] h-[640px] bg-stone-50 overflow-hidden shadow-xl">
        {/* Phone notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-stone-900 rounded-b-xl z-10"></div>
        {/* Phone screen */}
        <div className="w-full h-full pt-8 overflow-y-auto scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
}
