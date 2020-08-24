import React, { useState, useCallback } from 'react';
import { FixedLayout, Search, Div } from '@vkontakte/vkui';
import { makeStyles } from '@material-ui/styles';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import { getSortName } from './utils';
import { throttle, debounce } from 'throttle-debounce';
import useThrottle from 'src/hooks/useThrottle';

const styles = makeStyles(
  {
    search: {
      paddingBottom: 23,
    },
    sortBlock: {
      paddingTop: 0,
      paddingBottom: 8,
      color: 'var(--attach_picker_tab_inactive_text)',
      fontSize: 15,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      background: 'var(--background_content)',
      '&:active': {
        '& $sortTitle, svg': {
          opacity: 0.7,
          zIndex: 1,
        },
      },
    },
    sortTitle: {
      marginRight: 5,
    },
  },
  { classNamePrefix: 'bookmarksHeader' },
);

export enum SORT_TYPE {
  NAME,
  DATE,
}
interface BookmarksHeaderProps {
  sortType?: SORT_TYPE;
  onSearchChange(q: string): void;
}
const BookmarksHeader: React.FC<BookmarksHeaderProps> = ({ onSearchChange }) => {
  const classes = styles();
  const [sortType, setSortType] = useState<SORT_TYPE>(SORT_TYPE.NAME);

  const throttledOnChange = useCallback(
    throttle(500, (q: string) => {
      onSearchChange(q);
    }),
    [],
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    throttledOnChange(e.target.value);
  };

  return (
    <FixedLayout vertical="top">
      <Search onChange={onChange} className={classes.search} />
      <Div className={classes.sortBlock}>
        <div className={classes.sortTitle}>{getSortName(sortType)}</div>
        <Icon16Dropdown />
      </Div>
    </FixedLayout>
  );
};

export default React.memo(BookmarksHeader);
