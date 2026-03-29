const ShieldIllustration = () => {
    return (
        <svg
            viewBox="0 0 400 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-[280px]"
        >
            {/* Outer glow rings */}
            <circle cx="200" cy="200" r="190" stroke="white" strokeOpacity="0.04" strokeWidth="1" />
            <circle cx="200" cy="200" r="170" stroke="white" strokeOpacity="0.06" strokeWidth="1" />

            {/* Shield body */}
            <path
                d="M200 40 L320 90 C320 90 330 200 300 270 C270 340 200 380 200 380 C200 380 130 340 100 270 C70 200 80 90 80 90 Z"
                fill="white"
                fillOpacity="0.08"
                stroke="white"
                strokeWidth="2.5"
                strokeLinejoin="round"
            />

            {/* Inner shield */}
            <path
                d="M200 70 L296 110 C296 110 304 200 280 258 C256 316 200 350 200 350 C200 350 144 316 120 258 C96 200 104 110 104 110 Z"
                fill="white"
                fillOpacity="0.05"
                stroke="white"
                strokeOpacity="0.3"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />

            {/* Medical cross on shield */}
            <rect x="178" y="160" width="44" height="14" rx="4" fill="white" fillOpacity="0.7" />
            <rect x="193" y="145" width="14" height="44" rx="4" fill="white" fillOpacity="0.7" />

            {/* Heart shape below cross */}
            <path
                d="M200 230 C200 230 175 215 175 200 C175 192 182 186 190 186 C196 186 200 190 200 190 C200 190 204 186 210 186 C218 186 225 192 225 200 C225 215 200 230 200 230Z"
                fill="white"
                fillOpacity="0.4"
            />

            {/* Pulse line at bottom */}
            <path
                d="M80 395 L140 395 L155 382 L168 408 L182 375 L195 412 L208 388 L220 395 L320 395"
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="0.35"
            />

            {/* Decorative small elements */}
            <circle cx="340" cy="150" r="3" fill="white" fillOpacity="0.2" />
            <circle cx="60" cy="180" r="4" fill="white" fillOpacity="0.15" />
            <circle cx="350" cy="280" r="2.5" fill="white" fillOpacity="0.18" />
            <circle cx="55" cy="300" r="3.5" fill="white" fillOpacity="0.12" />

            {/* Small plus signs */}
            <g opacity="0.2">
                <rect x="340" y="210" width="16" height="4" rx="2" fill="white" />
                <rect x="346" y="204" width="4" height="16" rx="2" fill="white" />
            </g>
            <g opacity="0.15">
                <rect x="48" y="240" width="14" height="3.5" rx="1.5" fill="white" />
                <rect x="53.25" y="234.75" width="3.5" height="14" rx="1.5" fill="white" />
            </g>
        </svg>
    );
};

export default ShieldIllustration;
