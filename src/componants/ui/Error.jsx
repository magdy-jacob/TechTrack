
import React from 'react';

const ErrorMessage = ({ message }) => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <svg
                    className="mx-auto h-12 w-12 text-red-500 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
                <p className="text-red-600 text-lg font-semibold mb-4">
                    {message || "Something went wrong. Please try again."}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default ErrorMessage;