import React from 'react';
import { FixedLayout, Search, PanelHeaderContext } from '@vkontakte/vkui';

const BookmarksHeader = () => {
  return (
    <FixedLayout vertical="top">
      <Search />
    </FixedLayout>
  );
};

export default React.memo(BookmarksHeader);
