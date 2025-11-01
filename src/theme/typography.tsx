// typography.ts
import palette from './palette';

const typography = {
  fontFamily: ['Inter', 'sans-serif'].join(','),
  h2: {
    color: palette.heading.light,
    fontWeight: 700,
    fontSize: '24px',
    letterSpacing: '-0.24px',
    lineHeight: '32px',
  },
  subtitleS1: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '24px',
    color: palette.text.secondary,
  },
  subtitle2: {
    color: palette.text.secondary,
    fontWeight: 500,
    fontSize: '14px',
    letterSpacing: '-0.05px',
    lineHeight: '20px',
  },
  subtitle3: {
    color: palette.text.light,
    fontWeight: 500,
    fontSize: '14px',
    letterSpacing: '-0.05px',
    lineHeight: '20px',
  },
  bodyB1: {
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',
    color: '#464F60',
  },
  bodyB2: {
    fontFamily: 'Inter',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '20px',
    textAlign: 'left',
    color: palette.text.primary,
  },
  overline: {
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '18px',
    letterSpacing: '3%',
    color: '#868FA0',
  },
  headerh3: {
    fontWeight: '700',
    fontSize: '20px',
    lineHeight: '28px',
    letterSpacing: '1%',
    color: palette.heading.default,
  },
  headerh4: {
    fontSize: '18px',
    fontWeight: '700',
    lineHeight: '19.36px',
    textAlign: 'left',
    color: '#585858',
  },
  headerh5: {
    fontWeight: '700',
    fontSize: '20px',
    lineHeight: '28px',
    color: palette.heading.grey,
  },
  caption: {
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '18px',
    letterSpacing: '0.03em',
    color: palette.text.light,
  },
  semibold: {
    fontFamily: 'Inter',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '20px',
    color: palette.black,
  }
};

export default typography;
