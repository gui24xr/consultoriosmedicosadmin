'use client'
import React,{ useState } from "react"
import { ChevronDown } from "lucide-react"
import { Badge } from 'antd'

export default function EntityCard({ title, subtitle, icon, sections, expanded=false }: { title: string, subtitle?: string, icon?: React.ReactNode, sections: React.ReactNode[], expanded?: boolean }) {

 

    const [isExpanded, setIsExpanded] = useState(expanded)
    return (
    <div className="bg-white border border-emerald-300 rounded-xl hover:shadow-md  " >
        <button
            onClick={() => setIsExpanded(!isExpanded)} 
            
            className="w-full overflow-hidden ">

         
                <div className="flex items-center justify-between p-4  ">
                    <div className="flex items-center gap-3">
                        {icon &&
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-md shrink-0 text-white">
                            {icon}
                        </div>}
                        <div className="flex flex-col items-start min-w-0">
                            <h3 className="sm:text-sm font-bold uppercase leading-tight truncate text-gray-900">
                            {title}
                            </h3>
                            {subtitle && <p className="text-xs sm:text-sm text-gray-600">{subtitle}</p>}
                        </div>
                        </div>
                    <div className="flex items-center gap-2">
                        {sections.length > 0 &&
                        <ChevronDown
                            className={`h-5 w-5 text-gray-500 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                        }
                    </div>
            </div>
        </button>
        { isExpanded && (
        <div>
            {sections.map((Section, index) => (
                <div key={index} className="p-4 border-b border-gray-200">
                    {Section}
                </div>
            ))}
            
        </div>
        )}
            
           
            
        
    </div>
    )

}