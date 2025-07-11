import React from "react";
import { Save } from "lucide-react";
import { Button } from "../ui/Button";

interface FormActionsProps {
  isValid: boolean;
  isLoading: boolean;
  onSaveDraft?: () => void;
}

export const FormActions: React.FC<FormActionsProps> = ({
  isValid,
  isLoading,
  onSaveDraft,
}) => {
  return (
    <div className="flex justify-end space-x-4">
      {onSaveDraft && (
        <Button
          type="button"
          variant="outline"
          onClick={onSaveDraft}
          disabled={isLoading}
        >
          Save as Draft
        </Button>
      )}
      <Button
        type="submit"
        variant="primary"
        loading={isLoading}
        disabled={!isValid}
        icon={<Save className="w-5 h-5" />}
      >
        {isLoading ? "Publishing..." : "Publish Event"}
      </Button>
    </div>
  );
};
