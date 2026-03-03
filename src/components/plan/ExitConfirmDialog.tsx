import React from "react";
import AnimatedButton from "../ui/animated-button";

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const ExitConfirmDialog: React.FC<Props> = ({ open, onCancel, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md space-y-4 rounded-2xl border border-white/10 bg-[#0a0f1e] p-5 text-white shadow-[0_22px_80px_rgba(0,0,0,0.45)]">
        <div className="space-y-1">
          <p className="text-lg font-semibold">Exit Solar Navigator?</p>
          <p className="text-sm text-slate-200/80">Progress is saved. You can resume later.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <AnimatedButton variant="outline" onClick={onCancel} className="px-4 py-2">
            Stay
          </AnimatedButton>
          <AnimatedButton onClick={onConfirm} className="px-4 py-2">
            Exit
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default ExitConfirmDialog;
