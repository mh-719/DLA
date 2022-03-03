import Point from './Point';

export const attractorTypes = [
  {
    label: 'Point',
    item: {
      model: Point,
    },
  },
];

export const particleSizes = [
  {
    label: 'Small',
    item: {
      size: 'small',
      radius: 1,
    },
  },
  {
    label: 'Medium',
    item: {
      size: 'medium',
      radius: 2,
    },
  },
  {
    label: 'Large',
    item: {
      size: 'large',
      radius: 3,
    },
  },
  {
    label: 'Increasing',
    item: {
      size: 'increasing',
      radius: 1,
    },
  },
  {
    label: 'Decreasing',
    item: {
      size: 'decreasing',
      radius: 6,
    },
  },
];
