import React from 'react';

interface SortDropDownProps {
  open: boolean;
}

const SortDropdown: React.FC<SortDropDownProps> = () => {
  return <div>dropdown</div>;
};

export default React.memo(SortDropdown);
