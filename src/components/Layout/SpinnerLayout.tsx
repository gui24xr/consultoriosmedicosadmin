'use client'
import { Spin } from "antd";

export default function SpinnerLayout  ({message}: {message: string}) {
    return (
        <div className="flex justify-center p-12">
            <div className="flex flex-col items-center gap-4">
                
            <div className="mt-4 font-bold text-gray-700">{message}</div>
               <Spin />
            </div>
        </div>
    );
};