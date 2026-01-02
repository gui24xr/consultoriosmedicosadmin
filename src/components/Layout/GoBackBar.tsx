"use client";
import { ArrowLeft} from "lucide-react";

export default function GoBackBar({onBack}:{onBack: () => void}) {

  const handleOnBack = () => {
  onBack() 
  };

  return (
  <div className="bg-slate-600 text-white p-2 md:p-1 ">
    <div className="flex items-center justify-between">
        <button onClick={handleOnBack} className="flex items-center gap-2  hover:text-red-500 transition-colors text-sm cursor-pointer">
            <ArrowLeft size={20} />
            <span>Volver</span>
        </button>
    </div>
</div>
  );
}
