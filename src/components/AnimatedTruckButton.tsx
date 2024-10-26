import React from 'react';
import { Send } from 'lucide-react';

interface AnimatedTruckButtonProps {
  isLoading: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const AnimatedTruckButton: React.FC<AnimatedTruckButtonProps> = ({ isLoading, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`relative overflow-hidden w-64 h-20 bg-indigo-600 text-white rounded-md transition-all duration-300 ${
        isLoading ? 'bg-gray-200' : 'hover:bg-indigo-700'
      }`}
    >
      {isLoading ? (
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Enhanced Background with gradient sky */}
            <defs>
              <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="60">
                <stop offset="0%" stopColor="#87CEEB">
                  <animate
                    attributeName="stopColor"
                    values="#87CEEB;#64B5F6;#87CEEB"
                    dur="4s"
                    begin="3s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#E0F4FF">
                  <animate
                    attributeName="stopColor"
                    values="#E0F4FF;#BBE0FB;#E0F4FF"
                    dur="4s"
                    begin="3s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
              
              {/* Cloud Filter */}
              <filter id="cloudBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
              </filter>
            </defs>
            
            <rect width="240" height="80" fill="url(#skyGradient)" />
            
            {/* Sun with rays */}
            <g>
              <circle cx="200" cy="20" r="8" fill="#FFD700">
                <animate
                  attributeName="opacity"
                  values="0;1"
                  dur="0.5s"
                  begin="3s"
                  fill="freeze"
                />
              </circle>
              {/* Sun rays */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
                <line
                  key={angle}
                  x1="200"
                  y1="20"
                  x2="200"
                  y2="12"
                  stroke="#FFD700"
                  strokeWidth="1"
                  transform={`rotate(${angle} 200 20)`}
                  opacity="0"
                >
                  <animate
                    attributeName="opacity"
                    values="0;0.7;0"
                    dur="2s"
                    begin="3s"
                    repeatCount="indefinite"
                  />
                </line>
              ))}
            </g>

            {/* Animated Clouds */}
            <g filter="url(#cloudBlur)">
              {/* Cloud 1 */}
              <g opacity="0">
                <animate
                  attributeName="opacity"
                  values="0;0.8"
                  dur="0.5s"
                  begin="3s"
                  fill="freeze"
                />
                <animateMotion
                  path="M -50 20 L 290 20"
                  dur="20s"
                  begin="3s"
                  repeatCount="indefinite"
                >
                  <mpath href="#cloudPath" />
                </animateMotion>
                <circle cx="0" cy="0" r="5" fill="white" />
                <circle cx="5" cy="-2" r="4" fill="white" />
                <circle cx="8" cy="1" r="4" fill="white" />
                <circle cx="2" cy="3" r="3" fill="white" />
              </g>

              {/* Cloud 2 */}
              <g opacity="0">
                <animate
                  attributeName="opacity"
                  values="0;0.6"
                  dur="0.5s"
                  begin="4s"
                  fill="freeze"
                />
                <animateMotion
                  path="M -100 35 L 290 35"
                  dur="25s"
                  begin="4s"
                  repeatCount="indefinite"
                >
                  <mpath href="#cloudPath" />
                </animateMotion>
                <circle cx="0" cy="0" r="4" fill="white" />
                <circle cx="4" cy="-1" r="3" fill="white" />
                <circle cx="7" cy="1" r="3" fill="white" />
                <circle cx="2" cy="2" r="2" fill="white" />
              </g>

              {/* Cloud 3 */}
              <g opacity="0">
                <animate
                  attributeName="opacity"
                  values="0;0.7"
                  dur="0.5s"
                  begin="3.5s"
                  fill="freeze"
                />
                <animateMotion
                  path="M -30 10 L 290 10"
                  dur="22s"
                  begin="3.5s"
                  repeatCount="indefinite"
                >
                  <mpath href="#cloudPath" />
                </animateMotion>
                <circle cx="0" cy="0" r="6" fill="white" />
                <circle cx="6" cy="-2" r="5" fill="white" />
                <circle cx="10" cy="1" r="5" fill="white" />
                <circle cx="3" cy="3" r="4" fill="white" />
              </g>
            </g>

            {/* Cloud Path (hidden) */}
            <path id="cloudPath" d="M0 0 H240" opacity="0" />

            {/* Road with perspective */}
            <path d="M0 60 L240 60 L240 80 L0 80 Z" fill="#2C3E50" />
            <path d="M0 69 L240 69 L240 70 L0 70 Z" fill="#FFFFFF" opacity="0.8" strokeDasharray="10 10">
              <animate
                attributeName="stroke-dashoffset"
                from="-240"
                to="0"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>

            {/* Modern Truck Group */}
            <g className="animate-[drive_4s_ease-in-out_3s_forwards]">
              {/* Truck Body - Modern Design */}
              <path 
                d="M10 35 L55 35 L55 60 L10 60 Z" 
                fill="#2563EB"
                filter="url(#shadow)"
              />
              {/* Cargo Container */}
              <rect x="12" y="37" width="41" height="21" fill="#1E40AF" rx="2"/>
              <rect x="12" y="37" width="41" height="2" fill="#60A5FA" />
              <rect x="13" y="40" width="39" height="16" fill="#1E3A8A" rx="1"/>
              
              {/* Modern Cabin */}
              <path 
                d="M55 40 L75 40 L72 55 L55 55 Z" 
                fill="#1E40AF"
                filter="url(#shadow)"
              />
              {/* Windshield */}
              <path 
                d="M58 42 L72 42 L70 53 L58 53 Z" 
                fill="#60A5FA" 
                opacity="0.9"
              />
              
              {/* Side Mirror */}
              <rect x="56" y="44" width="1" height="3" fill="#64748B" />
              <rect x="55" y="44" width="1" height="2" fill="#94A3B8" />

              {/* Grille and Details */}
              <rect x="71" y="48" width="2" height="5" fill="#CBD5E1" />
              <rect x="71" y="47" width="2" height="1" fill="#F59E0B" /> {/* Turn Signal */}
              <rect x="71" y="45" width="2" height="1" fill="#FCD34D" /> {/* Headlight */}

              {/* Modern Wheels */}
              <g>
                {/* Rear Wheels */}
                <circle cx="25" cy="60" r="6" fill="#1F2937" />
                <circle cx="25" cy="60" r="4" fill="#374151" />
                <circle cx="25" cy="60" r="2" fill="#4B5563" />
                {/* Wheel Spokes */}
                <g>
                  {[0, 60, 120, 180, 240, 300].map((angle) => (
                    <line
                      key={angle}
                      x1="25"
                      y1="56"
                      x2="25"
                      y2="64"
                      stroke="#6B7280"
                      strokeWidth="0.5"
                      transform={`rotate(${angle} 25 60)`}
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`${angle} 25 60`}
                        to={`${angle - 360} 25 60`}
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </line>
                  ))}
                </g>

                {/* Front Wheels */}
                <circle cx="55" cy="60" r="6" fill="#1F2937" />
                <circle cx="55" cy="60" r="4" fill="#374151" />
                <circle cx="55" cy="60" r="2" fill="#4B5563" />
                {/* Wheel Spokes */}
                <g>
                  {[0, 60, 120, 180, 240, 300].map((angle) => (
                    <line
                      key={angle}
                      x1="55"
                      y1="56"
                      x2="55"
                      y2="64"
                      stroke="#6B7280"
                      strokeWidth="0.5"
                      transform={`rotate(${angle} 55 60)`}
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from={`${angle} 55 60`}
                        to={`${angle - 360} 55 60`}
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </line>
                  ))}
                </g>
              </g>

              {/* Underbody Details */}
              <rect x="20" y="58" width="40" height="1" fill="#1F2937" />
              <path d="M15 58 L65 58 L63 59 L17 59 Z" fill="#374151" />
            </g>

            {/* Modern Cargo Boxes */}
            <g>
              {/* Box 1 - Modern Package */}
              <g>
                <rect width="12" height="12" fill="#C4B5FD" rx="2">
                  <animate
                    attributeName="x"
                    values="0;30;15"
                    dur="1s"
                    begin="0s"
                    fill="freeze"
                  />
                  <animate
                    attributeName="y"
                    values="40;40;40"
                    dur="1s"
                    begin="0s"
                    fill="freeze"
                  />
                  <animate
                    attributeName="opacity"
                    values="1;1;0"
                    dur="1s"
                    begin="0.8s"
                    fill="freeze"
                  />
                </rect>
                {/* Package Details */}
                <rect width="8" height="1" fill="#A78BFA" rx="0.5">
                  <animate
                    attributeName="x"
                    values="2;32;17"
                    dur="1s"
                    begin="0s"
                    fill="freeze"
                  />
                  <animate
                    attributeName="y"
                    values="43;43;43"
                    dur="1s"
                    begin="0s"
                    fill="freeze"
                  />
                  <animate
                    attributeName="opacity"
                    values="1;1;0"
                    dur="1s"
                    begin="0.8s"
                    fill="freeze"
                  />
                </rect>
              </g>

              {/* Box 2 - Modern Package */}
              <g>
                <rect width="12" height="12" fill="#818CF8" rx="2">
                  <animate
                    attributeName="x"
                    values="0;30;25"
                    dur="1s"
                    begin="1s"
                    fill="freeze"
                  />
                  <animate
                    attributeName="y"
                    values="40;40;40"
                    dur="1s"
                    begin="1s"
                    fill="freeze"
                  />
                  <animate
                    attributeName="opacity"
                    values="1;1;0"
                    dur="1s"
                    begin="1.8s"
                    fill="freeze"
                  />
                </rect>
                {/* Package Details */}
                <rect width="8" height="1" fill="#6366F1" rx="0.5">
                  <animate
                    attributeName="x"
                    values="2;32;27"
                    dur="1s"
                    begin="1s"
                    fill="freeze"
                  />
                  <animate
                    attributeName="y"
                    values="43;43;43"
                    dur="1s"
                    begin="1s"
                    fill="freeze"
                  />
                  <animate
                    attributeName="opacity"
                    values="1;1;0"
                    dur="1s"
                    begin="1.8s"
                    fill="freeze"
                  />
                </rect>
              </g>

              {/* Box 3 - Modern Package */}
              <g>
                <rect width="12" height="12" fill="#6366F1" rx="2">
                  <animate
                    attributeName="x"
                    values="0;30;35"
                    dur="1s"
                    begin="2s"
                    fill="freeze"
                  />
                  <animate
                    attributeName="y"
                    values="40;40;40"
                    dur="1s"
                    begin="2s"
                    fill="freeze"
                  />
                  <animate
                    attributeName="opacity"
                    values="1;1;0"
                    dur="1s"
                    begin="2.8s"
                    fill="freeze"
                  />
                </rect>
                {/* Package Details */}
                <rect width="8" height="1" fill="#4F46E5" rx="0.5">
                  <animate
                    attributeName="x"
                    values="2;32;37"
                    dur="1s"
                    begin="2s"
                    fill="freeze"
                  />
                  <animate
                    attributeName="y"
                    values="43;43;43"
                    dur="1s"
                    begin="2s"
                    fill="freeze"
                  />
                  <animate
                    attributeName="opacity"
                    values="1;1;0"
                    dur="1s"
                    begin="2.8s"
                    fill="freeze"
                  />
                </rect>
              </g>
            </g>

            {/* Shadows and Effects */}
            <defs>
              <filter id="shadow" x="-2" y="-2" width="110%" height="110%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3"/>
              </filter>
            </defs>
          </svg>
        </div>
      ) : (
        <span className="flex items-center justify-center">
          <Send className="mr-2 h-5 w-5" />
          Request Quote
        </span>
      )}
    </button>
  );
};

export default AnimatedTruckButton;
