import React from 'react';

interface MiniGoogleLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withYear?: boolean;
  className?: string;
}

export const MiniGoogleLogo: React.FC<MiniGoogleLogoProps> = ({
  size = 'md',
  withYear = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl sm:text-5xl',
    xl: 'text-5xl sm:text-6xl md:text-7xl',
  }[size];

  return (
    <div className={`inline-flex items-baseline font-serif select-none tracking-tight ${className}`}>
      <span className={`${sizeClasses} font-extrabold text-[#4285F4] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]`}>
        M
      </span>
      <span className={`${sizeClasses} font-extrabold text-[#EA4335] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]`}>
        i
      </span>
      <span className={`${sizeClasses} font-extrabold text-[#FBBC05] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]`}>
        n
      </span>
      <span className={`${sizeClasses} font-extrabold text-[#34A853] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]`}>
        i
      </span>
      <span className={`${sizeClasses} font-extrabold text-[#4285F4] ml-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]`}>
        G
      </span>
      <span className={`${sizeClasses} font-extrabold text-[#EA4335] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]`}>
        o
      </span>
      <span className={`${sizeClasses} font-extrabold text-[#FBBC05] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]`}>
        o
      </span>
      <span className={`${sizeClasses} font-extrabold text-[#4285F4] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]`}>
        g
      </span>
      <span className={`${sizeClasses} font-extrabold text-[#34A853] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]`}>
        l
      </span>
      <span className={`${sizeClasses} font-extrabold text-[#EA4335] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]`}>
        e
      </span>
      <span className={`${sizeClasses} font-extrabold text-[#34A853] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]`}>
        !
      </span>
      {withYear && (
        <span className="ml-2 font-mono text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded bg-[#4285F4]/15 border border-[#4285F4]/30 text-[#4285F4] tracking-widest align-middle">
          1998
        </span>
      )}
    </div>
  );
};
