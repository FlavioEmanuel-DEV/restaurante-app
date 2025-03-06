// components/EditModal.tsx
import { ReactNode } from 'react';
import { FiX } from 'react-icons/fi';

interface EditModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const EditModal = ({ title, isOpen, onClose, children }: EditModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};