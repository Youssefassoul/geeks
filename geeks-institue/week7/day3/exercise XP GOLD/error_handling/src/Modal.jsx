import React from "react";

class Modal extends React.Component {
  render() {
    const { message, onClose, children } = this.props;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-2xl shadow-lg w-96 p-6 text-center animate-fadeIn">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error: {message}
          </h2>

          <details className="bg-gray-100 rounded-md text-sm p-2 mb-3 text-left">
            {children}
          </details>

          <p className="text-gray-600 mb-4">Please try it again</p>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default Modal;