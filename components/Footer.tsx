import React from "react";

const Footer = () => {
  return (
    <div>
      <>
      <footer className="fixed inset-x-0 bottom-0 flex flex-col items-center bg-neutral-900 text-center text-white">
        <div className="w-full p-4 text-center" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          @2024 Unique Force
        </div>
      </footer>
      </>
    </div>
  );
};

export default Footer;
