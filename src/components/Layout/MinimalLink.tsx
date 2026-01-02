
import Link from "next/link";


export default function MinimalLink ({ href, label, variant = 'primary' }: { href: string, label:string, variant?: 'primary' | 'secondary' | 'outline' | 'minimal' }) {
   {
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300",
    outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
    minimal: "text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium underline-offset-4 hover:underline"
  };

  return (
    <Link 
      href={href}
      className={`inline-block px-6 py-1.5 rounded-lg transition-all duration-200 transform ${variants[variant]}`}
    >
      {label}
    </Link>
  );
};

}
