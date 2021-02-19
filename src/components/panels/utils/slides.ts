import slide1 from '../../../assets/logo.svg';
import slide2 from '../../../assets/onboarding_robot.svg';
import slide3 from '../../../assets/onboarding_woman.svg';
import slide4 from '../../../assets/onboarding_people.svg';

interface Slide {
  title: string;
  image: string;
  description: string;
  buttonText: string;
}

export const onboardingSlides: Slide[] = [
  {
    title: 'Привет!',
    image: slide1,
    description: 'Linc поможет тебе удобно сохранять и сортировать закладки на контент со всего интернета.',
    buttonText: 'Продолжить',
  },
  {
    title: 'Добавляй',
    image: slide2,
    description: 'Разреши присылать уведомления, чтобы быстро сохранять контент через бота, со всего интернета.',
    buttonText: 'Продолжить',
  },
  {
    title: 'Управляй',
    image: slide3,
    description: 'Создавай тематические подборки и сортируй ссылки по ним.',
    buttonText: 'Продолжить',
  },

  {
    title: 'Находи',
    image: slide4,
    description:
      'Находи сохраненные ссылки с помощью поиска в приложении. Загляни в наш туториал, чтобы понять, как это работает.',
    buttonText: 'Погнали!',
  },
];
