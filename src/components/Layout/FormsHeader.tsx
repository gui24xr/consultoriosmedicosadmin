import React from 'react'

export default function FormsHeader({icon, title}:{icon?: React.ReactNode, title: string}) {
    return (
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-2 py-1">
            <div className="flex items-center space-x-3">
                {icon &&
              <div className="p-1.5 bg-white/20 rounded-lg text-white">
                {icon}
              </div>
              }
              <div>
                <h2 className="text-md font-semibold text-white">{title}</h2>
                
              </div>
             
            </div>
          </div>
    )
}