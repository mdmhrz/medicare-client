const MedicalIllustration = () => {
    return (
        <svg
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-md"
        >
            {/* Circular background */}
            <circle cx="250" cy="250" r="200" fill="white" fillOpacity="0.08" />
            <circle cx="250" cy="250" r="160" fill="white" fillOpacity="0.06" />

            {/* Stethoscope */}
            <path
                d="M200 180 C200 140, 240 120, 260 140 C280 120, 320 140, 320 180 L320 260 C320 310, 280 340, 260 340 C240 340, 200 310, 200 260 Z"
                stroke="white"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
            />
            <circle cx="260" cy="350" r="18" stroke="white" strokeWidth="4" fill="white" fillOpacity="0.15" />
            <circle cx="260" cy="350" r="8" fill="white" fillOpacity="0.4" />

            {/* Earpieces */}
            <path d="M200 180 L180 140 L175 120" stroke="white" strokeWidth="4" strokeLinecap="round" />
            <path d="M320 180 L340 140 L345 120" stroke="white" strokeWidth="4" strokeLinecap="round" />
            <circle cx="175" cy="115" r="6" fill="white" fillOpacity="0.6" />
            <circle cx="345" cy="115" r="6" fill="white" fillOpacity="0.6" />

            {/* Heart rate line */}
            <path
                d="M100 400 L160 400 L180 380 L200 420 L220 370 L240 430 L260 390 L280 400 L400 400"
                stroke="white"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="0.5"
            />

            {/* Cross / Plus symbol */}
            <rect x="120" y="200" width="40" height="12" rx="3" fill="white" fillOpacity="0.3" />
            <rect x="134" y="188" width="12" height="40" rx="3" fill="white" fillOpacity="0.3" />

            {/* Small cross */}
            <rect x="360" y="240" width="28" height="8" rx="2" fill="white" fillOpacity="0.2" />
            <rect x="370" y="232" width="8" height="28" rx="2" fill="white" fillOpacity="0.2" />

            {/* Decorative dots */}
            <circle cx="130" cy="310" r="4" fill="white" fillOpacity="0.2" />
            <circle cx="380" cy="170" r="5" fill="white" fillOpacity="0.25" />
            <circle cx="150" cy="150" r="3" fill="white" fillOpacity="0.15" />
            <circle cx="370" cy="320" r="3.5" fill="white" fillOpacity="0.2" />
        </svg>
    );
};

export default MedicalIllustration;
