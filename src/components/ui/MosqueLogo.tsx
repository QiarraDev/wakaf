import React from 'react';

export const MosqueLogo: React.FC<{ className?: string, style?: React.CSSProperties }> = ({ className, style }) => (
  <svg 
    width="1em" 
    height="1em" 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    {/* Outer circle */}
    <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1.5" />
    
    <g fill="currentColor">
      {/* Minaret */}
      <path d="M11 23H16V34H11V23Z" />
      <path d="M13.5 16C12.5 16 11 19 11 21H16C16 19 14.5 16 13.5 16Z" />
      
      {/* Main Dome */}
      <path d="M26.5 16C22 16 17 21 17 25H36C36 21 31 16 26.5 16Z" />
      <path d="M26.5 11C25 15 26.5 16 26.5 16C26.5 16 28 15 26.5 11Z" />
      
      {/* Base of Mosque */}
      <path d="M17 26H36V34H33V31C33 29.5 31.5 29.5 31.5 29.5C31.5 29.5 30 29.5 30 31V34H26.5V31C26.5 29.5 25 29.5 25 29.5C25 29.5 23.5 29.5 23.5 31V34H20V31C20 29.5 18.5 29.5 18.5 29.5C18.5 29.5 17 29.5 17 31V34Z" fillRule="evenodd" />
    </g>
  </svg>
);
