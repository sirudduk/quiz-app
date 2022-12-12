import React from 'react';
export default function Container(props: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex justify-center items-center overflow-hidden">
      {props.children}
    </div>
  );
}
