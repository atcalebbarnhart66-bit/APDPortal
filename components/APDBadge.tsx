export default function APDBadge({ size = 140 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer shield */}
      <path
        d="M70 8L18 28V68C18 96 40 118 70 132C100 118 122 96 122 68V28L70 8Z"
        fill="url(#shield-fill)"
        stroke="url(#shield-stroke)"
        strokeWidth="1.5"
      />

      {/* Inner shield */}
      <path
        d="M70 18L28 35V68C28 91 46 110 70 122C94 110 112 91 112 68V35L70 18Z"
        fill="url(#inner-fill)"
        stroke="rgba(200,151,42,0.3)"
        strokeWidth="0.5"
      />

      {/* Star shape */}
      <path
        d="M70 38L73.8 52.2H88.6L76.4 60.8L80.2 75L70 66.4L59.8 75L63.6 60.8L51.4 52.2H66.2L70 38Z"
        fill="url(#star-fill)"
      />

      {/* APD Text */}
      <text
        x="70"
        y="92"
        textAnchor="middle"
        fontFamily="Rajdhani, sans-serif"
        fontWeight="700"
        fontSize="13"
        letterSpacing="3"
        fill="url(#text-fill)"
      >
        APD
      </text>

      {/* Bottom text */}
      <text
        x="70"
        y="106"
        textAnchor="middle"
        fontFamily="Rajdhani, sans-serif"
        fontWeight="500"
        fontSize="6.5"
        letterSpacing="1.5"
        fill="rgba(168,197,232,0.5)"
      >
        ABILENE • TEXAS
      </text>

      {/* Badge number area */}
      <rect x="52" y="108" width="36" height="1" fill="rgba(200,151,42,0.3)" />

      <defs>
        <linearGradient id="shield-fill" x1="70" y1="8" x2="70" y2="132" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#0a1628" />
        </linearGradient>
        <linearGradient id="shield-stroke" x1="18" y1="8" x2="122" y2="132" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e8b84b" />
          <stop offset="50%" stopColor="#c8972a" />
          <stop offset="100%" stopColor="#8a6318" />
        </linearGradient>
        <linearGradient id="inner-fill" x1="70" y1="18" x2="70" y2="122" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1a2d4f" />
          <stop offset="100%" stopColor="#0d1b30" />
        </linearGradient>
        <linearGradient id="star-fill" x1="51" y1="38" x2="89" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e8b84b" />
          <stop offset="100%" stopColor="#c8972a" />
        </linearGradient>
        <linearGradient id="text-fill" x1="50" y1="80" x2="90" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e8b84b" />
          <stop offset="100%" stopColor="#c8972a" />
        </linearGradient>
      </defs>
    </svg>
  )
}
