// app/error.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { AlertTriangle, RefreshCw, Home, ChevronDown, ChevronUp } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Log del error para debugging
    console.error('🚨 Application Error:', {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString()
    });

    // Enviar a servicio de monitoreo en producción
    if (process.env.NODE_ENV === 'production') {
      // Sentry.captureException(error);
      // LogRocket.captureException(error);
    }
  }, [error]);

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          
          {/* Icono de error */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-red-100 p-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>

          {/* Título principal */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Ups! Algo salió mal
            </h2>
            <p className="text-gray-600">
              Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado 
              y está trabajando para solucionarlo.
            </p>
          </div>

          {/* Mensaje de error simplificado */}
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-700">
              {error.message || 'Error desconocido'}
            </p>
          </div>

          {/* Detalles técnicos (solo en desarrollo) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Detalles técnicos
                {showDetails ? (
                  <ChevronUp className="h-4 w-4 ml-2" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-2" />
                )}
              </button>
              
              {showDetails && (
                <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-md">
                  <div className="space-y-2">
                    {error.digest && (
                      <div>
                        <span className="text-xs font-medium text-gray-500">Error ID:</span>
                        <p className="text-xs font-mono text-gray-700">{error.digest}</p>
                      </div>
                    )}
                    
                    <div>
                      <span className="text-xs font-medium text-gray-500">Mensaje:</span>
                      <p className="text-xs font-mono text-gray-700 break-words">
                        {error.message}
                      </p>
                    </div>
                    
                    {error.stack && (
                      <div>
                        <span className="text-xs font-medium text-gray-500">Stack Trace:</span>
                        <pre className="text-xs text-gray-600 mt-1 overflow-auto max-h-32 bg-white p-2 rounded border">
                          {error.stack}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Botones de acción */}
          <div className="space-y-3">
            {/* Botón principal - Reintentar */}
            <button
              onClick={reset}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Intentar de nuevo
            </button>
            
            {/* Botón secundario - Recargar página */}
            <button
              onClick={handleReload}
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Recargar página
            </button>
            
            {/* Botón terciario - Ir al inicio */}
            <button
              onClick={handleGoHome}
              className="w-full flex justify-center items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Home className="h-4 w-4 mr-2" />
              Volver al inicio
            </button>
          </div>

          {/* Información de contacto */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">
                Si el problema persiste, contacta al soporte técnico
              </p>
              <p className="text-xs text-gray-400">
                Error ID: {error.digest || 'N/A'} | {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}