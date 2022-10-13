import React from 'react';

interface HeadingProps {
  children: React.ReactNode;
}
const Heading = ({ children }: HeadingProps) => {
  return (
    <h1
      className="font-semibold text-5xl text-transparent animate-gradient-x bg-gradient-to-r from-primary-black via-white to-primary-red tracking-tight"
      style={{
        // Work-around for electron
        WebkitBackgroundClip: 'text',
      }}
    >
      {children}
    </h1>
  );
};

export default Heading;
