import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "../ui/Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "default";
  isLoading?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  isLoading = false,
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          headerBg: "bg-gradient-to-r from-red-500 to-red-600",
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          confirmButton:
            "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
        };
      case "warning":
        return {
          headerBg: "bg-gradient-to-r from-amber-500 to-orange-600",
          iconBg: "bg-amber-100",
          iconColor: "text-amber-600",
          confirmButton:
            "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700",
        };
      default:
        return {
          headerBg: "bg-gradient-to-r from-primary-500 to-primary-600",
          iconBg: "bg-primary-100",
          iconColor: "text-primary-600",
          confirmButton:
            "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700",
        };
    }
  };

  const styles = getVariantStyles();

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] animate-in fade-in duration-200">
      {/* Overlay */}
      <button
        className="absolute inset-0 w-full h-full bg-black/60 backdrop-blur-sm cursor-default"
        onClick={handleOverlayClick}
        disabled={isLoading}
        aria-label="Close modal"
        tabIndex={-1}
      />

      {/* Modal Content */}
      <div className="relative flex items-center justify-center min-h-full p-4">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-200"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          {/* Header */}
          <div className={`${styles.headerBg} px-6 py-4 rounded-t-2xl`}>
            <div className="flex items-center justify-between">
              <h2 id="modal-title" className="text-xl font-bold text-white">
                {title}
              </h2>
              <button
                onClick={onClose}
                disabled={isLoading}
                className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors disabled:opacity-50"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div
                className={`w-12 h-12 rounded-full ${styles.iconBg} flex items-center justify-center flex-shrink-0`}
              >
                <AlertTriangle
                  className={`w-6 h-6 ${styles.iconColor}`}
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1">
                <p
                  id="modal-description"
                  className="text-slate-700 leading-relaxed"
                >
                  {message}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                {cancelText}
              </Button>
              <Button
                type="button"
                onClick={onConfirm}
                disabled={isLoading}
                className={`${styles.confirmButton} text-white`}
              >
                {isLoading ? "Processing..." : confirmText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render modal using React Portal
  return createPortal(modalContent, document.body);
};
