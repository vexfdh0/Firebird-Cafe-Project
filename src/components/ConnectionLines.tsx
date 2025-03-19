import React from "react";

const ConnectionLines = () => {
  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block">
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Line from Student to Staff with label */}
        <path
          d="M400 250 L600 250"
          stroke="#92400E"
          strokeWidth="3"
          strokeDasharray="6 4"
        />
        <polygon
          points="600,250 590,245 590,255"
          fill="#92400E"
          transform="translate(0, 0)"
        />
        <rect
          x="460"
          y="230"
          width="80"
          height="20"
          rx="10"
          fill="#1C1917"
          stroke="#92400E"
        />
        <text x="500" y="244" textAnchor="middle" fill="#F59E0B" fontSize="12">
          Orders
        </text>

        {/* Line from Staff to Review with label */}
        <path
          d="M800 250 L1000 250"
          stroke="#57534E"
          strokeWidth="3"
          strokeDasharray="6 4"
        />
        <polygon
          points="1000,250 990,245 990,255"
          fill="#57534E"
          transform="translate(0, 0)"
        />
        <rect
          x="860"
          y="230"
          width="80"
          height="20"
          rx="10"
          fill="#1C1917"
          stroke="#57534E"
        />
        <text x="900" y="244" textAnchor="middle" fill="#D6D3D1" fontSize="12">
          Reviews
        </text>

        {/* Line from Review to Student with label */}
        <path
          d="M1000 300 C900 380, 500 380, 400 300"
          stroke="#44403C"
          strokeWidth="3"
          strokeDasharray="6 4"
        />
        <polygon
          points="400,300 410,295 410,305"
          fill="#44403C"
          transform="rotate(180 400 300)"
        />
        <rect
          x="660"
          y="350"
          width="80"
          height="20"
          rx="10"
          fill="#1C1917"
          stroke="#44403C"
        />
        <text x="700" y="364" textAnchor="middle" fill="#A8A29E" fontSize="12">
          Feedback
        </text>
      </svg>
    </div>
  );
};

export default ConnectionLines;
