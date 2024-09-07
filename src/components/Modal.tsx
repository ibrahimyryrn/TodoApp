import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        onClick={onClose}
      >
        <div
          className="bg-white p-4 rounded shadow-lg max-w-[500px] w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="absolute top-2 right-2 text-2xl" onClick={onClose}>
            &times; {/* X işareti */}
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
