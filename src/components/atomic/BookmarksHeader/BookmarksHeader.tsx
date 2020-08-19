import React, { useState } from 'react';
import { FixedLayout, Search, Div } from '@vkontakte/vkui';
import { makeStyles } from '@material-ui/styles';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import { getSortName } from './utils';

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
  sortType: SORT_TYPE;
}
const BookmarksHeader: React.FC<any> = () => {
  const classes = styles();
  const [sortType, setSortType] = useState<SORT_TYPE>(SORT_TYPE.NAME);

  return (
    <FixedLayout vertical="top">
      <Search className={classes.search} />
      <Div className={classes.sortBlock}>
        <div className={classes.sortTitle}>{getSortName(sortType)}</div>
        <Icon16Dropdown />
      </Div>
    </FixedLayout>
  );
};

export default React.memo(BookmarksHeader);
