import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
 