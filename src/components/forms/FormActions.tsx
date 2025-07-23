import React from "react";
import { Save, Send, FileText } from "lucide-react";
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
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>Auto-saved</span>
        </div>
        <span className="text-slate-400">•</span>
        <span>Last saved 2 minutes ago</span>
      </div>

      <div className="flex items-center gap-3">
        {/* Save as Draft Button */}
        <Button
          type="button"
          variant="outline"
          className="border-slate-300 text-slate-700 hover:bg-slate-50"
          icon={<FileText className="w-4 h-4" />}
        >
          Save as Draft
        </Button>

        {/* Main Action Button */}
        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          className={`${
            saveDraft
              ? "bg-amber-500 hover:bg-amber-600 focus:ring-amber-500"
              : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/25"
          } px-8 py-3 font-semibold`}
          icon={
            saveDraft ? (
              <Save className="w-5 h-5" />
            ) : (
              <Send className="w-5 h-5" />
            )
          }
        >
          {saveDraft ? "Save Draft" : "Publish Event"}
        </Button>
      </div>
    </div>
  );
};
