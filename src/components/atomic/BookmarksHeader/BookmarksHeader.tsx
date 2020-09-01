import React, { useCallback } from 'react';
import { FixedLayout, Search, Div } from '@vkontakte/vkui';
import { makeStyles } from '@material-ui/styles';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import { getSortName } from './utils';
import { throttle } from 'throttle-debounce';
import { declOfNum } from 'src/utils/math';
import { usePrevious } from 'src/hooks/usePrevious';
import { useSelector } from 'src/hooks';

import useQueryFlag from 'src/hooks/useQueryFlag';
import { RootRoute } from 'src/router';

import SortPanel from '../actionSheets/SortPanel';

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
      justifyContent: 'space-between',
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
    sortContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    resultsTitle: {
      transition: 'all 0.3s',
      color: 'var(--text_primary)',
      fontSize: 17,
    },
  },
  { classNamePrefix: 'bookmarksHeader' },
);

export enum SORT_TYPE {
  DATE_NEW,
  DATE_OLD,
}
interface BookmarksHeaderProps {
  sortType?: SORT_TYPE;
  onSearchChange(q: string): void;
  resultsLength: number;
  rootRoute: RootRoute;
}
const BookmarksHeader: React.FC<BookmarksHeaderProps> = ({ onSearchChange, resultsLength, rootRoute }) => {
  const classes = styles();

  const [actionSheetOpened, openActionSheet, closeActionSheet] = useQueryFlag(rootRoute, 'actionSheet');

  const sortType = useSelector((state) => state.app.sortType);
  /*   const setActionSheet = useActions(appActions.setActionSheet); */

  const prevResultsLength = usePrevious(resultsLength);
  const throttledOnChange = useCallback(
    throttle(500, (q: string) => {
      onSearchChange(q);
    }),
    [],
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    throttledOnChange(e.target.value);
  };

  /*   useEffect(() => {
    if (actionSheetOpened) {
      setActionSheet({ status: actionSheetOpened, onClose: closeActionSheet });
    } else {
      setActionSheet({ status: actionSheetOpened, onClose: closeActionSheet });
    }
  }, [actionSheetOpened, openActionSheet, closeActionSheet, rootRoute, setActionSheet]); */

  return (
    <>
      <FixedLayout vertical="top">
        <Search onChange={onChange} className={classes.search} />
        <Div className={classes.sortBlock}>
          <div style={{ opacity: resultsLength > 0 ? 1 : 0 }} className={classes.resultsTitle}>
            {resultsLength > 0
              ? `${resultsLength} ${declOfNum(resultsLength, ['результат', 'результата', 'результатов'])}`
              : `${prevResultsLength || 0}  ${declOfNum(prevResultsLength || 0, [
                  'результат',
                  'результата',
                  'результатов',
                ])}`}
          </div>
          <div onClick={openActionSheet} className={classes.sortContainer}>
            <div className={classes.sortTitle}>{getSortName(sortType)}</div>
            <Icon16Dropdown />
          </div>
        </Div>
      </FixedLayout>
      <SortPanel onClose={closeActionSheet} open={actionSheetOpened} />
    </>
  );
};

export default React.memo(BookmarksHeader);
