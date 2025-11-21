import React from 'react';

const Badge = React.forwardRef(({ className = '', variant = 'default', ...props }, ref) => {
  const variants = {
    default: 'bg-primary text-white',
    secondary: 'bg-gray-200 text-gray-900',
    outline: 'border border-gray-300 text-gray-900'
  };

  return (
    <div
      ref={ref}
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}
      {...props}
    />
  );
});

Badge.displayName = 'Badge';

export { Badge };
