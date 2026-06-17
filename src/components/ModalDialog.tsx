import { ReactNode, RefObject, useId } from "react";
import { createPortal } from "react-dom";
import { FocusTrap } from "./FocusTrap";

interface ModalDialogProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  triggerRef?: RefObject<HTMLElement | null>;
  children: ReactNode;
}

export function ModalDialog({ isOpen, title, onClose, triggerRef, children }: ModalDialogProps) {
  const titleId = useId();

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" role="presentation">
      <button
        type="button"
        className="modal-backdrop"
        aria-hidden="true"
        tabIndex={-1}
        onClick={onClose}
      />
      <FocusTrap onEscape={onClose} triggerRef={triggerRef}>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <header className="modal-header">
            <h2 id={titleId}>{title}</h2>
            <button type="button" className="modal-close" onClick={onClose} aria-label="Zamknij okno">
              ×
            </button>
          </header>
          <div className="modal-body">{children}</div>
        </div>
      </FocusTrap>
    </div>,
    document.body,
  );
}
