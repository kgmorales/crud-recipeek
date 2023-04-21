import { Recipe } from '@client/app/core/interfaces';

export function getMultipleRandom(arr: Recipe[], num = 1) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}
