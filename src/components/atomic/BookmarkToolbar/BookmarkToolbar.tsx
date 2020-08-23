import React, { useLayoutEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { ReactComponent as EditSVG } from '../../../assets/edit.svg';
import { ReactComponent as FolderArrowSVG } from '../../../assets/folder_arrow.svg';
import { ReactComponent as DeleteSVG } from '../../../assets/deleteSVG.svg';
import { ReactComponent as SelectSVG } from '../../../assets/select.svg';
import { ReactComponent as ShareSVG } from '../../../assets/share.svg';

const styles = makeStyles(
  {
    root: {
      position: 'absolute',
      top: (props: { isOutOfWindow: boolean }) => (props.isOutOfWindow ? 'unset' : 'calc(100% + 20px)'),
      bottom: (props: { isOutOfWindow: boolean }) => (props.isOutOfWindow ? 'calc(100% + 20px)' : 'unset'),
      left: 0,
      width: 250,
      background: 'rgba(249, 249, 249, 0.78)',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      color: '#000000',
    },
    item: {
      padding: '11px 16px',
      display: 'flex',
      justifyContent: 'space-between',
      lineHeight: '22px',
      fontSize: '17px',
      borderBottom: '0.5px solid rgba(60, 60, 67, 0.29)',
      '&:active': {
        background: '#a5a5a58f',
      },
      '&:first-child': {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
      '&:last-child': {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      },
      '& svg': {
        width: 22,
      },
    },
  },
  { classNamePrefix: 'bookmark-toolbar' },
);

interface BookmarkToolbarProps {
  onDelete?: () => void;
  onEdit?(): void;
}
const BookmarkToolbar: React.FC<BookmarkToolbarProps> = ({ onDelete, onEdit }) => {
  const ref = useRef<any>(null);
  const [isOutOfWindow, setIsOutOfWindow] = useState(false);

  const classes = styles({ isOutOfWindow });

  useLayoutEffect(() => {
    const rect = ref.current.getBoundingClientRect();

    const isOut = rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
    if (!isOut) {
      setIsOutOfWindow(true);
    }
  }, []);

  const onItemClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log('hey');
  };

  return (
    <div ref={ref} className={classes.root}>
      <div onClick={onEdit} className={classes.item}>
        <div>Редактировать</div>
        <EditSVG />
      </div>
      <div className={classes.item}>
        <div>Переместить</div>
        <FolderArrowSVG style={{ height: 22 }} />
      </div>
      <div className={classes.item}>
        <div>Выбрать</div>
        <SelectSVG />
      </div>
      <div className={classes.item}>
        <div>Поделиться</div>
        <ShareSVG />
      </div>
      <div onClick={onDelete} className={classes.item}>
        <div style={{ color: '#E64646' }}>Удалить</div>
        <DeleteSVG />
      </div>
    </div>
  );
};

export default React.memo(BookmarkToolbar);
