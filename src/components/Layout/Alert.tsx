import { Alert as AntdAlert } from "antd";

interface AlertProps {
    title?: string | null;
    description: string;
    type: 'success' | 'info' | 'warning' | 'error';
    showIcon?: boolean;
    className?: string;
    actions?: React.ReactNode[]
}

export default function Alert({
    title, 
    description, 
    type, 
    showIcon = true, 
    className = "",
    actions = []
}: AlertProps) {
    const defaultTitles = {
        success: 'Éxito',
        error: 'Error',
        warning: 'Advertencia',
        info: 'Información'
    };

    return (
        <AntdAlert
            title={title || defaultTitles[type]}
            description={description}
            type={type}
            showIcon={showIcon}
            className={className}
        />
    )
}