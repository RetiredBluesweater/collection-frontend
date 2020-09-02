import slide1 from '../../../assets/onboarding_robot.svg';
import slide2 from '../../../assets/onboarding_woman.svg';
import slide3 from '../../../assets/onboarding_people.svg';

interface Slide {
  title: string;
  image: string;
  description: string;
  buttonText: string;
}

export const onboardingSlides: Slide[] = [
  /*  {
    title: 'Привет!',
    image: slide1,
    description: 'Linc поможет сохранить контент со всего интернета, к которыму ты хочешь вернутся позже.',
    buttonText: 'Продолжить',
  }, */
  {
    title: 'Добавляй',
    image: slide1,
    description: 'Разреши присылать уведомления,чтобы быстро сохранять контент через бота, со всего интернета.',
    buttonText: 'Продолжить',
  },
  {
    title: 'Управляй',
    image: slide2,
    description: 'Создавай тематические подборки и сортируй ссылки по ним.',
    buttonText: 'Продолжить',
  },

  {
    title: 'Находи',
    image: slide3,
    description:
      'Находи сохраненные ссылки с помощью поиска и приложении. Загляни в наш туториал, чтобы понять как это работает.',
    buttonText: 'Погнали!',
  },
];
