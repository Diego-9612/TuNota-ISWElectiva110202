// src/Components/Modal/Modal.jsx
import { useEffect } from "react";

export function CrearExamenModal({ show, onClose, title, children }) {
    // Evitar scroll del fondo cuando el modal está abierto
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [show]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div 
                className="relative w-full max-w-md bg-white rounded-lg shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <button
                        onClick={onClose}
                        className="absolute text-gray-400 top-3 right-3 hover:text-gray-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}