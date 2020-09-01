import slide1 from '../../../assets/emoji-sad.png';
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
    description: 'Linc поможет сохранить контент со всего интернета, к которыму ты хочешь вернутся позже.',
    buttonText: 'Далее',
  },
  {
    title: 'Добавляй',
    image: slide1,
    description: 'Быстро сохраняй контент через бота, со всего интернета. ',
    buttonText: 'Разрешить',
  },
  {
    title: 'Управляй',
    image: slide1,
    description: 'Создавай тематические подборки и сортируй ссылки по ним.',
    buttonText: 'Далее',
  },

  {
    title: 'Находи',
    image: slide1,
    description:
      'Находи сохраненные ссылки с помощью поиска и приложении. Загляни в наш туториал, чтобы понять как это работает.',
    buttonText: 'Начать!',
  },
];
