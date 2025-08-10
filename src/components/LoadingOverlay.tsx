import React from "react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm">
      <div className="text-center">
        <div className="w-16 h-16 mb-4 border-4 rounded-full border-primary border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
