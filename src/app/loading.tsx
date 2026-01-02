import React from 'react'

export default function Loading(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Spinner principal */}
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner animado */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
          <div className="w-8 h-8 border-2 border-gray-300 rounded-full animate-ping absolute top-2 left-2 opacity-75"></div>
        </div>
        
        {/* Texto de carga */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Cargando página...
          </h2>
          <p className="text-gray-500 text-sm">
            Esto puede tomar unos segundos
          </p>
        </div>
      </div>

      {/* Skeleton loader */}
      <div className="w-full max-w-md mt-8 space-y-4">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
          
          {/* Content skeleton */}
          <div className="space-y-2">
            <div className="h-3 bg-gray-300 rounded w-full"></div>
            <div className="h-3 bg-gray-300 rounded w-5/6"></div>
            <div className="h-3 bg-gray-300 rounded w-4/6"></div>
          </div>
          
          {/* Card skeletons */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="h-20 bg-gray-300 rounded"></div>
            <div className="h-20 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      {/* Progreso animado */}
      <div className="w-full max-w-xs mt-8">
        <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
          <div className="bg-blue-600 h-2 rounded-full w-3/5 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
