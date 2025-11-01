// Animation Duration Tokens
export const DURATION = {
  fast: '150ms',
  standard: '250ms',
  long: '350ms',
} as const;

// Custom Easing Curves (inspired by shadcn and Emil's recommendations)
export const EASING = {
  // For entering elements - starts fast, feels responsive
  easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  // For exiting elements - starts fast
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  // For elements that both enter and exit
  easeInOut: 'cubic-bezier(0.45, 0, 0.15, 1)',
} as const;

// Scale values
export const SCALE = {
  buttonActive: 0.97,
  initial: 0.93,
  full: 1,
} as const;

// Entering Animation Mixins
export const enteringMixins = {
  // Fade + Scale in (for modals, dropdowns, popovers)
  fadeScaleIn: {
    initial: {
      opacity: 0,
      transform: `scale(${SCALE.initial})`,
    },
    animate: {
      opacity: 1,
      transform: `scale(${SCALE.full})`,
    },
    transition: `opacity ${DURATION.fast} ${EASING.easeOut}, transform ${DURATION.fast} ${EASING.easeOut}`,
  },

  // Slide from right (for drawers)
  slideInRight: {
    initial: {
      transform: 'translateX(100%)',
      opacity: 0,
    },
    animate: {
      transform: 'translateX(0)',
      opacity: 1,
    },
    transition: `transform ${DURATION.standard} ${EASING.easeOut}, opacity ${DURATION.standard} ${EASING.easeOut}`,
  },

  // Fade in only (for subtle appearances)
  fadeIn: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    transition: `opacity ${DURATION.fast} ${EASING.easeOut}`,
  },
} as const;

// Exiting Animation Mixins
export const exitingMixins = {
  // Fade + Scale out
  fadeScaleOut: {
    initial: {
      opacity: 1,
      transform: `scale(${SCALE.full})`,
    },
    animate: {
      opacity: 0,
      transform: `scale(${SCALE.initial})`,
    },
    transition: `opacity ${DURATION.fast} ${EASING.easeIn}, transform ${DURATION.fast} ${EASING.easeIn}`,
  },

  // Slide out to right
  slideOutRight: {
    initial: {
      transform: 'translateX(0)',
      opacity: 1,
    },
    animate: {
      transform: 'translateX(100%)',
      opacity: 0,
    },
    transition: `transform ${DURATION.standard} ${EASING.easeIn}, opacity ${DURATION.standard} ${EASING.easeIn}`,
  },

  // Fade out only
  fadeOut: {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 0,
    },
    transition: `opacity ${DURATION.fast} ${EASING.easeIn}`,
  },
} as const;

// CSS Helper to generate transition string
export const generateTransition = (
  properties: string[],
  duration: keyof typeof DURATION,
  easing: keyof typeof EASING,
) => {
  return properties.map(prop => `${prop} ${DURATION[duration]} ${EASING[easing]}`).join(', ');
};
