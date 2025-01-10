import { UserRoleEnum } from '#shared/enums/userRole.enum';

export const COLOR_OPTIONS = [
  'Белый',
  'Бежевый',
  'Черный',
  'Зеленый',
  'Голубой',
  'Красный',
  'Синий',
  'Серый',
  'Розовый',
  'Коричневый',
  'Желтый',
  'Фиолетовый',
  'Бирюзовый',
  'Оранжевый',
];

export const MATERIAL_OPTIONS = ['Велюр', 'Рогожка', 'Текстиль'];

export const MANUFACTURERS_OPTIONS = [
  'Боровичи мебель',
  'Anderssen',
  'Пинскдрев',
  'Moon',
  'Ardoni',
  'Шатура',
  'MZ5 Group',
  'Rivalli',
  'Costa Bella',
  'Furman',
];

export const users = [
  {
    id: 1,
    role: UserRoleEnum.Admin,
    login: 'admin@mail.ru',
    password: '123',
    lastname: 'Микерин',
    patronymic: 'Александрович',
    firstname: 'Дмитрий',
  },
  {
    id: 2,
    role: UserRoleEnum.Buyer,
    login: 'buyer@mail.ru',
    password: '123',
    lastname: 'Акладский',
    patronymic: 'Вячеславович',
    firstname: 'Данила',
  },
];
