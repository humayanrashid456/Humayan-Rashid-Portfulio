/**
 * Mobile Responsive Design Improvements
 * ======================================
 * This file contains specific mobile UI fixes for all portfolio sections
 */

export const mobileBreakpoints = {
  // Mobile breakpoints
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
}

export const mobileFontSizes = {
  hero: {
    mobile: '1.5rem',
    tablet: '2.5rem',
    desktop: '4rem',
  },
  heading: {
    mobile: '1.5rem',
    tablet: '2rem',
    desktop: '2.25rem',
  },
  body: {
    mobile: '0.8125rem',
    tablet: '0.9375rem',
    desktop: '1rem',
  },
  button: {
    mobile: '10px',
    tablet: '11px',
    desktop: '12px',
  },
}

export const mobileTapTargets = {
  minimum: '44px',
  comfortable: '48px',
  button: '12px', // padding
}

export const mobileSpacing = {
  sectionPadding: {
    mobile: '2rem',
    tablet: '3rem',
    desktop: '4rem',
  },
  cardPadding: {
    mobile: '1rem',
    tablet: '1.25rem',
    desktop: '1.5rem',
  },
}

export const mobileLayout = {
  grid: {
    mobile: 'grid-cols-1',
    tablet: 'grid-cols-2',
    desktop: 'grid-cols-3',
  },
  flexColumn: 'flex-col',
  alignItemsFlexStart: 'items-start',
}

export const mobileIssues = {
  overflow: [
    'Horizontal scrolling content',
    'Tables without overflow handling',
    'Large images without scaling',
    "Menus that don't close properly",
  ],
  touch: [
    'Buttons too small for fingers',
    'Not enough spacing between touch targets',
    'Content overlapping on touch',
    'Browser zoom interfering',
  ],
  readability: [
    'Text too small on mobile view',
    'Line height too tight',
    'Contrast issues on mobile',
    'Buttons blending into backgrounds',
  ],
}