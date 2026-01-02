// config/medicActions.ts
import { 
  LucideIcon,
  Eye, 
  UserPlus, 
  Trash2, 
  PencilLine, 
  ClipboardList, 
  CalendarCheck, 
  UserCheck,
  XCircle 
} from 'lucide-react';

type ActionConfig = {
  Icon: LucideIcon;
  label: string;
  color: string;
};

export const MEDIC_ACTIONS: Record<string, ActionConfig> = {
  SPECIALTY_EDIT: {
    Icon: Trash2,
    label: 'Editar',
    color: 'text-blue-500 hover:text-blue-600'
  },
  SPECIALTY_DELETE: {
    Icon: Trash2,
    label: 'Eliminar',
    color: 'text-red-600 hover:text-red-700'
  },
  MEDIC_DETAILS: {
    Icon: Eye,
    label: 'Detalles',
    color: 'text-red-500 hover:text-red-600'
  },
  MEDIC_CREATE: {
    Icon: UserPlus,
    label: 'Nuevo Médico',
    color: 'text-emerald-600 hover:text-emerald-700'
  },
  MEDIC_DELETE: {
    Icon: Trash2,
    label: 'Eliminar',
    color: 'text-red-600 hover:text-red-700'
  },
  MEDIC_EDIT: {
    Icon: PencilLine,
    label: 'Editar',
    color: 'text-blue-500 hover:text-blue-600'
  },
  MEDIC_VIEW_CONSULTATIONS: {
    Icon: ClipboardList,
    label: 'Consultas',
    color: 'text-purple-600 hover:text-purple-700'
  },
  MEDIC_VIEW_SHEDULE: {
    Icon: CalendarCheck,
    label: 'Agenda',
    color: 'text-orange-500 hover:text-orange-600'
  },
  MEDIC_SYSTEM_USER: {
    Icon: UserCheck,
    label: 'Usuario',
    color: 'text-cyan-600 hover:text-cyan-700'
  },

  //---------- Consultation Service --------------
  CONSULTATION_SERVICE_ADMIN_SHEDULE: {
    Icon: CalendarCheck,
    label: 'Agenda',
    color: 'text-orange-500 hover:text-orange-600'
  },
  CONSULTATION_SERVICE_NEXT_BOOKINS: {
    Icon: CalendarCheck,
    label: 'Proximas Reservas',
    color: 'text-orange-500 hover:text-orange-600'
  },
  CONSULTATION_SERVICE_CONSULTATIONS: {
    Icon: ClipboardList,
    label: 'Consultas',
    color: 'text-purple-600 hover:text-purple-700'
  },
  CONSULTATION_SERVICE_EDIT: {
    Icon: Trash2,
    label: 'Editar',
    color: 'text-blue-500 hover:text-blue-600'
  },
  CONSULTATION_SERVICE_DELETE: {
    Icon: Trash2,
    label: 'Eliminar',
    color: 'text-red-600 hover:text-red-700'
  },
} as const;



export type MedicActionType = keyof typeof MEDIC_ACTIONS;

// Fallback por si el iconType no existe
export const DEFAULT_ACTION: ActionConfig = {
  Icon: XCircle,
  label: 'Desconocido',
  color: 'text-gray-500'
};

interface RapidActionButtonProps {
  onClick: () => void;
  iconType: string;
}

export default function RapidActionButton({ onClick, iconType }: RapidActionButtonProps) {
  const action = MEDIC_ACTIONS[iconType] || DEFAULT_ACTION;
  const { Icon, label, color } = action;

  return (
   <button 
      onClick={onClick}
      // 1. Le damos un tamaño fijo y centrado todo el contenido
      className="flex flex-col items-center justify-center w-16 h-16 group border border-gray-300 rounded-lg transition-all duration-200 hover:shadow-md hover:border-blue-400 cursor-pointer"
    >
      <div className={`p-1 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200 ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      {/* 2. Aseguramos que el texto se centre y se corte si es muy largo */}
      <span className="text-xs font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-200 text-center truncate w-full">
        {label}
      </span>
    </button>
  );
}