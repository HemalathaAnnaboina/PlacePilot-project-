import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-6 px-6 text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-amber-400 flex items-center justify-center font-black text-slate-950 text-xs">
            P
          </div>
          <span className="font-bold text-slate-800">PlacePilot</span>
          <span>— AI-Powered Smart College Placement Management System</span>
        </div>
        <p className="text-slate-400">
          Built for production excellence. Designed for Embarko Student Challenge.
        </p>
      </div>
    </footer>
  );
};

