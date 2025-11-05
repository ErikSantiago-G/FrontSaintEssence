import { Plus } from 'lucide-react';

interface AdminHeaderProps {
    title: string;
    textButton?: string;
    onAdd?: () => void;
}

export function AdminHeader({ title, textButton, onAdd }: AdminHeaderProps) {
    return (
        <header className="section-header">
            <h2>{title}</h2>
            {textButton && <button className="btn-primary" onClick={onAdd}>
                <Plus size={20} /> Añadir {textButton}
            </button>}
        </header>
    );
}