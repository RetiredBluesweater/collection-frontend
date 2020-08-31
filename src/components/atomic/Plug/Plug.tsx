import React from 'react';
import { ReactComponent as PlugSVG } from '../../../assets/plug-image.svg';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@vkontakte/vkui';
import { Insets } from '@vkontakte/vk-bridge';
import { useSelector } from 'src/hooks';

const TOP_SAFE_AREA = 145;
const BOTTOM_SAFE_AREA = 105;

interface PlugProps {
  text: any;
  btnText: string;
  onClick(): void;
}

const styles = makeStyles(
  {
    root: {
      paddingTop: (props: { insets: Insets }) => `${TOP_SAFE_AREA + props.insets.top}px`,
      paddingBottom: (props: { insets: Insets }) =>
        `${BOTTOM_SAFE_AREA + (props.insets.bottom >= 150 ? 0 : props.insets.bottom)}px`,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      bottom: 0,
    },
  },
  { classNamePrefix: 'plug' },
);
const Plug: React.FC<PlugProps> = ({ text, btnText, onClick }) => {
  const insets = useSelector((state) => state.device.currentInsets);

  const classes = styles({ insets });
  return (
    <div className={classes.root}>
      <PlugSVG />
      <div
        style={{
          padding: '0 20px',
          textAlign: 'center',
          marginTop: 8,
          marginBottom: 24,
          lineHeight: '20px',
          color: 'var(--attach_picker_tab_inactive_text)',
        }}
      >
        {text}
      </div>
      <Button onClick={onClick}>{btnText}</Button>
    </div>
  );
};

export default React.memo(Plug);
