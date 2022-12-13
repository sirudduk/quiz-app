import React from 'react';
export default function Container(props: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex justify-center items-center overflow-hidden bg-orange-50 flex-col text-gray-800">
      {props.children}
    </div>
  );
}
