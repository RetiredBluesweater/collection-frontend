import React, { memo, useCallback, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import c from 'classnames';
import makeStyles from '@material-ui/styles/makeStyles';

import { Insets } from '@vkontakte/vk-bridge';

import Views from 'react-swipeable-views';
import { onboardingSlides } from './utils/slides';
import { Theme } from 'src/theme';
import { useInsets, Button } from '@vkontakte/vkui';
import { useStorageValue } from 'src/hooks';
import {
  registerMutation,
  RegisterMutation,
  StorageFieldEnum,
} from 'src/types';
import config from 'src/config';
import vkBridge from '@vkontakte/vk-bridge';
import clsx from 'clsx';
import useWindowSizes from 'src/hooks/useWindowSizes';

interface StylesProps {
  insets: Insets;
  innerWidth: number;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) => ({
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
    background: 'white',
  },
  logoContainer: {
    paddingTop: (props) => props.insets.top + 59,
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
    display: 'flex',
    alignItems: 'flex-end',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    height: '78%',
    background: 'no-repeat center',
    width: '80%',
    display: 'table',
    margin: '0 auto',
    backgroundPosition: 'bottom',
    backgroundSize: 'contain',
    zIndex: 1,
  },
  bottom: {
    flex: '0 0 auto',
    backgroundColor: 'white',
    padding: (props) => `30px 21px ${props.insets.bottom + 40}px`,
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
    fontWeight: 700,
    margin: 0,
    color: '#000000',
    textAlign: 'center',
    marginBottom: '-30px',
  },
  text: {
    textAlign: 'center',
    letterSpacing: -0.24,
    fontSize: 20,
    lineHeight: '22px',
    color: 'rgba(0, 0, 0, 0.8);',
    margin: 0,
    marginTop: 15,
    fontWeight: theme.typography.fontWeightRegular,
  },
  dots: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: (props) => props.insets.bottom + 15,
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
  image3: {
    backgroundPosition: 'right bottom',
  },
  imageCont1: {
    alignItems: 'center',
  },
  image1: {
    backgroundPosition: 'center',
    width: '40%',
  },
  line1: {
    backgroundColor: '#3F8AE0',
    height: 100,
    width: (props) => `${props.innerWidth + 100}px`,
    right: 0,
    left: 0,
    top: '78%',
    transform: 'rotate(-13.49deg) translateY(-50%)',
    position: 'absolute',
    overflow: 'hidden',
    transformOrigin: 'left',
  },
  line2: {
    backgroundColor: '#3F8AE0',
    height: 100,
    width: '300px',
    right: 0,
    top: '14%',
    left: '-39%',
    transform: 'rotate(27.91deg) translateY(-50%)',
    position: 'absolute',
    overflow: 'hidden',
    transformOrigin: 'left',
  },
  line3: {
    backgroundColor: '#3F8AE0',
    height: 151,
    width: '300px',
    right: '-27%',
    bottom: '-10%',
    transform: 'rotate(-18.56deg) translateY(-50%)',
    position: 'absolute',
    overflow: 'hidden',
    transformOrigin: 'left',
  },
}));

/**
 * Вью онбординга
 * @type {React.NamedExoticComponent<object>}
 */
const OnboardingPanel: React.FC<{ onStartApp(): void }> = memo(({ onStartApp }) => {
  const { innerWidth } = useWindowSizes();
  const insets = useInsets();
  const mc = useStyles({ insets, innerWidth });
  const [slide, setSlide] = useState(0);
  const setCompleted = useStorageValue(StorageFieldEnum.OnboardingCompleted)[1];
  const [registerRemote] = useMutation<RegisterMutation, RegisterMutation.Arguments>(registerMutation);

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

    if (slide === 3) {
      registerRemote();
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
              <div className={clsx(mc.imageContainer, idx === 0 && mc.imageCont1)}>
                <div
                  className={clsx(mc.image, idx === 2 && mc.image3, idx === 0 && mc.image1)}
                  style={{ backgroundImage: `url(${image})` }}
                ></div>
                {idx === 1 && <div className={mc.line1}></div>}
                {idx === 2 && <div className={mc.line2}></div>}
                {idx === 3 && <div className={mc.line3}></div>}
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
                  <Button
                    style={{ backgroundColor: '#3F8AE0', color: 'white' }}
                    size="m"
                    onClick={() => (idx === arr.length - 1 ? onStartClick() : onNextClick())}
                  >
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
