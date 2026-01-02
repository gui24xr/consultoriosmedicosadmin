import { ArrowRightCircle } from "lucide-react";

interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="my-4 lg:my-8 flex flex-col gap-2">
      <div className="flex items-baseline  gap-2">
        <span className="text-2xl font-bold text-heading text-gray-700">{title}</span>
        <ArrowRightCircle className="text-blue-400 flex-shrink-0" size={20} />
      </div>
       <hr className="w-full border-0.5 border-cyan-400 " />
    </div>
  );
}