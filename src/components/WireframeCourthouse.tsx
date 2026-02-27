export default function WireframeCourthouse() {
  return (
    <svg
      className="absolute top-1/2 left-1/2 w-[700px] h-[500px] opacity-45 z-0"
      style={{ transform: "translate(-50%, -45%) perspective(800px) rotateX(8deg) rotateY(-5deg)" }}
      viewBox="0 0 700 500"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="wireGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#7c3aed", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "#5eead4", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#3b82f6", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* All lines use gradient stroke with glow filter */}
      <g
        stroke="url(#wireGradient)"
        strokeWidth="1.5"
        fill="none"
        style={{ filter: "drop-shadow(0 0 8px rgba(94, 234, 212, 0.6)) drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))" }}
      >
        {/* Base/Steps */}
        <line x1="100" y1="400" x2="600" y2="400" strokeWidth="2.5" />
        <line x1="120" y1="385" x2="580" y2="385" />
        <line x1="140" y1="370" x2="560" y2="370" />
        {/* Step connections */}
        <line x1="100" y1="400" x2="120" y2="385" />
        <line x1="600" y1="400" x2="580" y2="385" />
        <line x1="120" y1="385" x2="140" y2="370" />
        <line x1="580" y1="385" x2="560" y2="370" />
        {/* Columns */}
        <line x1="175" y1="370" x2="175" y2="200" />
        <line x1="180" y1="370" x2="180" y2="200" />
        <line x1="260" y1="370" x2="260" y2="200" />
        <line x1="265" y1="370" x2="265" y2="200" />
        <line x1="345" y1="370" x2="345" y2="200" />
        <line x1="350" y1="370" x2="350" y2="200" />
        <line x1="435" y1="370" x2="435" y2="200" />
        <line x1="440" y1="370" x2="440" y2="200" />
        <line x1="520" y1="370" x2="520" y2="200" />
        <line x1="525" y1="370" x2="525" y2="200" />
        {/* Column capitals */}
        <line x1="168" y1="200" x2="187" y2="200" />
        <line x1="253" y1="200" x2="272" y2="200" />
        <line x1="338" y1="200" x2="357" y2="200" />
        <line x1="428" y1="200" x2="447" y2="200" />
        <line x1="513" y1="200" x2="532" y2="200" />
        {/* Entablature */}
        <line x1="140" y1="195" x2="560" y2="195" strokeWidth="2.5" />
        <line x1="140" y1="185" x2="560" y2="185" />
        {/* Pediment */}
        <polygon points="140,185 350,100 560,185" />
        <line x1="155" y1="180" x2="350" y2="110" />
        <line x1="350" y1="110" x2="545" y2="180" />
        <polygon points="200,180 350,125 500,180" opacity="0.4" />
        {/* 3D depth lines */}
        <line x1="100" y1="400" x2="80" y2="420" opacity="0.3" />
        <line x1="600" y1="400" x2="620" y2="420" opacity="0.3" />
        <line x1="80" y1="420" x2="620" y2="420" opacity="0.3" />
        <line x1="140" y1="185" x2="120" y2="175" opacity="0.3" />
        <line x1="560" y1="185" x2="580" y2="175" opacity="0.3" />
        <line x1="120" y1="175" x2="580" y2="175" opacity="0.3" />
        <line x1="350" y1="100" x2="340" y2="90" opacity="0.3" />
        <line x1="120" y1="175" x2="340" y2="90" opacity="0.3" />
        <line x1="580" y1="175" x2="340" y2="90" opacity="0.3" />
        {/* Scales of Justice */}
        <line x1="350" y1="145" x2="350" y2="175" opacity="0.6" />
        <line x1="320" y1="155" x2="380" y2="155" opacity="0.6" />
        <line x1="320" y1="155" x2="315" y2="170" opacity="0.6" />
        <line x1="380" y1="155" x2="385" y2="170" opacity="0.6" />
        <path d="M 305 170 Q 315 178 325 170" opacity="0.5" />
        <path d="M 375 170 Q 385 178 395 170" opacity="0.5" />
        {/* Door */}
        <rect x="315" y="290" width="70" height="80" opacity="0.4" />
        <path d="M 315 290 Q 350 265 385 290" opacity="0.4" />
      </g>
    </svg>
  );
}
