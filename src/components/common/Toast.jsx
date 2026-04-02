import { Toaster, toast } from "react-hot-toast";

import { 
  CheckCircleIcon, 
  XCircleIcon, 
  InformationCircleIcon, 
  ExclamationTriangleIcon 
} from "@heroicons/react/24/outline";


export const showToast = {

  success: (message) => {
    toast.custom((t) => (   
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            
            {/* Icon */}
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-6 w-6 text-green-400" />
            </div>

            {/* Text Content */}
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">Success!</p>
              <p className="mt-1 text-sm text-gray-500">{message}</p>
            </div>

          </div>
        </div>

        {/* Close Button */}
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}  // Close this toast
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-500 focus:outline-none"
          >
            Close
          </button>
        </div>

      </div>
    ));
  },


  // ❌ ERROR TOAST
  error: (message) => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">

            {/* Error Icon */}
            <div className="flex-shrink-0">
              <XCircleIcon className="h-6 w-6 text-red-400" />
            </div>

            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">Error!</p>
              <p className="mt-1 text-sm text-gray-500">{message}</p>
            </div>

          </div>
        </div>

        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-500 focus:outline-none"
          >
            Close
          </button>
        </div>

      </div>
    ));
  },


  // ℹ️ INFO TOAST
  info: (message) => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">

            {/* Info Icon */}
            <div className="flex-shrink-0">
              <InformationCircleIcon className="h-6 w-6 text-blue-400" />
            </div>

            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">Info</p>
              <p className="mt-1 text-sm text-gray-500">{message}</p>
            </div>

          </div>
        </div>

        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-500 focus:outline-none"
          >
            Close
          </button>
        </div>

      </div>
    ));
  },


  warning: (message) => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">

            {/* Warning Icon */}
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400" />
            </div>

            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">Warning</p>
              <p className="mt-1 text-sm text-gray-500">{message}</p>
            </div>

          </div>
        </div>

        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-500 focus:outline-none"
          >
            Close
          </button>
        </div>

      </div>
    ));
  }

};


// This component must be added once in your App
// It controls where and how toast messages appear
export const ToastContainer = () => (
  <Toaster
    position="top-right"     // Toast appears top right
    reverseOrder={false}
    gutter={8}
    containerClassName=""
    containerStyle={{}}
    toastOptions={{
      duration: 5000,        // Auto close after 5 seconds
      style: {
        background: '#363636',
        color: '#fff',
      },
    }}
  />
);
