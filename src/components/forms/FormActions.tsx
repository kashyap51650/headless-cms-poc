import React from "react";
import { Save } from "lucide-react";
import { Button } from "../ui/Button";

interface FormActionsProps {
  isLoading: boolean;
  saveDraft?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
  isLoading,
  saveDraft,
}) => {
  return (
    <div className="flex justify-end space-x-4">
      <Button
        type="submit"
        variant="primary"
        loading={isLoading}
        icon={<Save className="w-5 h-5" />}
      >
        {saveDraft ? "Save Draft" : "Publish Event"}
      </Button>
    </div>
  );
};
