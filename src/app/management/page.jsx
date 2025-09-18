import React from "react";

const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl h-[80vh] rounded-2xl shadow-lg overflow-hidden border border-gray-300">
        <iframe
          src="https://audit.iamadityaranjan.com/"
          title="Embedded Website"
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default Page;
