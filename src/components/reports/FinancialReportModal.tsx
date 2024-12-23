import React from 'react';
import { X } from 'lucide-react';
import FinancialReport from './financial/FinancialReport';

interface FinancialReportModalProps {
  onClose: () => void;
}

export default function FinancialReportModal({ onClose }: FinancialReportModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Estado Financiero</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          <FinancialReport />
        </div>
      </div>
    </div>
  );
}