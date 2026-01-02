// components/ui/ListCard.tsx
interface ListCardProps {
  title: string;
  items: string[];
  itemStyle?: 'badge' | 'plain'; // badge con borde, plain sin borde
  layout?: 'row' | 'column' | 'wrap'; // disposición
  emptyMessage?: string; // para "Sin servicios"
  className?: string;
}

export default function ListCard({
  title,
  items,
  itemStyle = 'plain',
  layout = 'wrap',
  emptyMessage = 'Sin elementos',
  className = ''
}: ListCardProps) {
const getLayoutClass = () => {
  switch (layout) {
    case 'row':
      return 'flex flex-row gap-2 list-none'; // Sin bullets para horizontal
    case 'column':
      return 'space-y-2 list-disc list-inside'; // Con bullets para vertical
    case 'wrap':
      return 'flex flex-wrap gap-2 list-none'; // Sin bullets para wrap
    default:
      return 'flex flex-wrap gap-2 list-none';
  }
};

  const getItemClass = () => {
    const baseClass = 'text-sm';
    if (itemStyle === 'badge') {
      return `${baseClass} px-2 py-1 bg-blue-50 text-blue-600 rounded-md border border-blue-200`;
    }
    return `${baseClass} text-gray-700`;
  };

  return (
    <div className={`${className}`}>
      <h4 className="text-sm font-medium text-gray-600 mb-2">
        {title}
      </h4>
      
      {items.length === 0 ? (
        <p className="text-sm text-gray-400">{emptyMessage}</p>
      ) : (
        <ul className={getLayoutClass()}>
        {items.map((item, index) => (
          <li key={index} className={getItemClass()}>
            {item}
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}