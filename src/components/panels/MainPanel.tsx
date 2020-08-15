import React from 'react';
import { PanelHeader, FixedLayout } from '@vkontakte/vkui';
import { ReactComponent as PlusBtnSVG } from '../../assets/plus_btn.svg';
import AddBtn from '../atomic/AddBtn';

const MainPanel = () => {
  return (
    <>
      <PanelHeader>Мои статьи</PanelHeader>
      <AddBtn />
    </>
  );
};

export default React.memo(MainPanel);
