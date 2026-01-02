import { ArrowRightCircle } from "lucide-react";

interface SectionTitleProps {
  title: string;
 descripcion ?: string;
}

export default function LayoutTitle({ title, descripcion }: SectionTitleProps) {
  return (
      <div className="">
        <div className='container mx-auto '>
          
    <div className="flex flex-col gap-2 p-2">
      <div className="flex items-center justify-center  gap-2">
       
        <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading text-gray-700">{title}</span>
         <ArrowRightCircle className="text-blue-400 flex-shrink-0" size={32} />
      </div>
     
    </div>
    {descripcion  && <p className="text-center text-lg text-gray-800">{descripcion}</p>}
      <hr className="w-full border-0.5 border-cyan-400 mt-2" />
          </div>
         
        </div>
  );
}