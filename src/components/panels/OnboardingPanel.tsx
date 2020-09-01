import React, { memo, useCallback, useState } from 'react';
import c from 'classnames';
import makeStyles from '@material-ui/styles/makeStyles';

import { Insets } from '@vkontakte/vk-bridge';

import Views from 'react-swipeable-views';
import { onboardingSlides } from './utils/slides';
import { Theme } from 'src/theme';
import { useInsets, Button } from '@vkontakte/vkui';
import { useStorageValue } from 'src/hooks';
import { StorageFieldEnum } from 'src/types';
import config from 'src/config';
import vkBridge from '@vkontakte/vk-bridge';

const useStyles = makeStyles<Theme, Insets>((theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 0,
    background: 'var(--background_content)',
  },
  logoContainer: {
    paddingTop: (props) => props.top + 59,
  },
  logo: {
    display: 'table',
    flex: '0 0 auto',
    margin: 'auto',
    width: 241,
  },
  views: {
    flex: '1 0 0',

    '& .react-swipeable-view-container': {
      height: '100%',
    },
  },
  slide: {
    height: '100%',
    flex: '1 0 0',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  imageContainer: {
    flex: '1 0 0',
    padding: '20px 0 0px',
  },
  image: {
    height: '100%',
    background: 'no-repeat center',
    backgroundSize: 'contain',
    width: 305,
    display: 'table',
    margin: 'auto',
    backgroundPosition: 'bottom',
  },
  bottom: {
    flex: '0 0 auto',
    backgroundColor: 'white',
    padding: (props) => `30px 21px ${props.bottom + 40}px`,
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.07);',
    display: 'flex',
    flexDirection: 'column',
    borderTop: '1px solid #EEEEEE',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    height: 210,
  },
  title: {
    fontSize: 30,
    lineHeight: '31px',
    fontWeight: 600,
    margin: 0,
    color: '#4D4D4D',
    textAlign: 'center',
    marginBottom: '-30px',
  },
  text: {
    textAlign: 'center',
    letterSpacing: -0.24,
    fontSize: 20,
    lineHeight: '22px',
    color: '#A8A7A7',
    margin: 0,
    marginTop: 15,
    fontWeight: theme.typography.fontWeightRegular,
  },
  dots: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: (props) => props.bottom + 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    borderRadius: '50%',
    background: '#DEDFE0',
    overflow: 'hidden',
    height: 7,
    width: 7,

    '&:before': {
      content: '""',
      display: 'block',
      transition: '200ms all',
      opacity: 0,
      height: '100%',
      width: '100%',
      borderRadius: '50%',
    },

    '& + &': {
      marginLeft: 11,
    },
  },
  dotActive: {
    '&:before': {
      opacity: 1,
      background: '#3F8AE0',
    },
  },
  button: {
    background: 'linear-gradient(180deg, #6CC584 0%, #71CC8B 100%)',
    borderRadius: '15px',
    color: 'white',
    border: 'none',
    outline: 'none',
    fontSize: 21,
    padding: '0px 15px',
    lineHeight: '48px',
    width: '100%',
    height: '100%',
    '&:active': {
      opacity: 0.7,
    },
  },
}));

/**
 * Вью онбординга
 * @type {React.NamedExoticComponent<object>}
 */
const OnboardingPanel: React.FC<{ onStartApp(): void }> = memo(({ onStartApp }) => {
  const insets = useInsets();
  const mc = useStyles(insets);
  const [slide, setSlide] = useState(0);
  const setCompleted = useStorageValue(StorageFieldEnum.OnboardingCompleted)[1];

  const askForGroupMessages = () => {
    vkBridge
      .send('VKWebAppAllowMessagesFromGroup', {
        group_id: config.groupId,
      })
      .then((data) => {
        setSlide((slide) => slide + 1);
      })
      .catch((e) => {
        setSlide((slide) => slide + 1);
      });
  };

  const onNextClick = useCallback(() => {
    if (slide === 1) {
      askForGroupMessages();
      return;
    }

    setSlide((slide) => slide + 1);
  }, [slide]);

  const onStartClick = useCallback(() => {
    onStartApp();
    setCompleted(true);
  }, [setCompleted]);

  return (
    <div className={mc.root}>
      <Views className={mc.views} onChangeIndex={setSlide} index={slide}>
        {onboardingSlides.map((s, idx, arr) => {
          const { title, buttonText, description, image } = s;

          return (
            <div className={mc.slide} key={idx}>
              <div className={mc.imageContainer}>
                <div className={mc.image} style={{ backgroundImage: `url(${image})` }} />
              </div>
              <div className={mc.bottom}>
                <p className={mc.title}>{title}</p>
                <p className={mc.text}>{description}</p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: 45,
                  }}
                >
                  <Button size="xl" onClick={() => (idx === arr.length - 1 ? onStartClick() : onNextClick())}>
                    {buttonText}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </Views>

      <div className={mc.dots}>
        {onboardingSlides.map((s, idx) => (
          <div className={c(mc.dot, { [mc.dotActive]: idx === slide })} key={idx} />
        ))}
      </div>
    </div>
  );
});

export default OnboardingPanel;
