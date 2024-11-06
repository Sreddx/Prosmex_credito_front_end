import React from 'react';
import './PaginatedDropDrown.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

const PaginatedDropDown: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="pagination-controls">
      <button onClick={onPrevious} disabled={currentPage === 1}>
        Anterior
      </button>
      <span>
        Página {currentPage} de {totalPages}
      </span>
      <button onClick={onNext} disabled={currentPage === totalPages}>
        Siguiente
      </button>
    </div>
  );
};

export default PaginatedDropDown;
