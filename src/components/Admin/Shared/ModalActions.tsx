interface ModalActionsProps {
  onCancel: () => void;
  submitLabel: string;
  isSubmitting?: boolean;
}

export function ModalActions({ onCancel, submitLabel, isSubmitting = false }: ModalActionsProps) {
  return (
    <section className="modal-actions">
      <button type="button" className="btn-secondary" onClick={onCancel} disabled={isSubmitting}>
        Cancelar
      </button>
      <button type="submit" className="btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Guardando...' : submitLabel}
      </button>
    </section>
  );
}