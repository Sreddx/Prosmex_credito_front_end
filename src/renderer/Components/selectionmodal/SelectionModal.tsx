import React from 'react';
import PaginatedDropDown from '../paginateddropdown/PaginatedDropDown';

interface SelectionModalProps<T> {
  isOpen: boolean;
  title: string;
  items: T[];
  currentPage: number;
  totalPages: number;
  onClose: () => void;
  onSelect: (item: T) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  renderItem: (item: T) => React.ReactNode;
}

function SelectionModal<T>({
  isOpen,
  title,
  items,
  currentPage,
  totalPages,
  onClose,
  onSelect,
  onPreviousPage,
  onNextPage,
  renderItem,
}: SelectionModalProps<T>) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <div className="modal-list">
          {items.map((item) => (
            <button key={item.id} className="modal-list-item-button" onClick={() => onSelect(item)}>
              {renderItem(item)}
            </button>
          ))}
        </div>
        <PaginatedDropDown
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={onPreviousPage}
          onNext={onNextPage}
        />
        <button className="close-button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default SelectionModal;
