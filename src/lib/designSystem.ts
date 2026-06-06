/**
 * Unified Design System for Humayan Rashid's Portfolio
 * ================================================
 * This file defines a consistent color palette, spacing system, and
 * design tokens that apply to both the public-facing website and
 * the admin panel for easy maintenance and visual consistency.
 */

export const colors = {
  // Primary Colors - Dark Theme Foundation
  primaryDark: '#061910',
  primaryMid: '#0b2b1d',
  primaryLight: '#133c31',
  
  // Accent Colors - Lime Green Brightens
  primaryVibrant: '#cbf341',
  primarySaturated: '#b2d932',
  primaryFaded: 'rgba(203, 243, 65, 0)',
  primaryGlow: 'rgba(203, 243, 65, 0.2)',
  
  // Functional Colors
  accent: '#14b8a6',
  secondary: '#6366f1',
  bright: '#ffffff',
  muted: '#a1a1aa',
  
  // Borders & Transitions
  border: 'rgba(203, 243, 65, 0.15)',
  borderHover: 'rgba(203, 243, 65, 0.3)',
  glowShadow: '0 0 20px rgba(203, 243, 65, 0.3)',
  hoverShadow: '0 0 30px rgba(203, 243, 65, 0.4)',
}

export const spacing = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
  '2xl': '4rem',
}

export const typography = {
  display: {
    font: 'Space Grotesk, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
    },
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    tracking: {
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    }
  },
  body: {
    font: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    sizes: {
      xs: '0.6875rem',
      sm: '0.8125rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    }
  },
  mono: {
    font: 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace',
    sizes: {
      xs: '0.6875rem',
      sm: '0.8125rem',
      base: '1rem',
      lg: '1.125rem',
    }
  }
}

export const borders = {
  radius: {
    none: '0',
    sm: '0.375rem',
    base: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    full: '9999px',
  },
  width: {
    thin: '1px',
    medium: '2px',
    thick: '3px',
  }
}

export const shadows = {
  none: '0',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  glow: '0 0 20px rgba(203, 243, 65, 0.3)',
  'glow-strong': '0 0 30px rgba(203, 243, 65, 0.4)',
  accent: '0 0 15px rgba(203, 243, 65, 0.2)',
  'accent-strong': '0 0 25px rgba(203, 243, 65, 0.3)',
}

export const animations = {
  transition: {
    fast: '150ms ease-in-out',
    base: '200ms ease-in-out',
    slow: '300ms ease-in-out',
    duration400: '400ms ease-in-out',
    duration600: '600ms ease-in-out',
    duration800: '800ms ease-in-out',
    duration1200: '1200ms ease-in-out',
  },
  keyframes: {
    fadeIn: {
      from: { opacity: '0' } as const,
      to: { opacity: '1' } as const,
    },
    fadeOut: {
      from: { opacity: '1' } as const,
      to: { opacity: '0' } as const,
    },
    slideIn: {
      from: { opacity: '0', transform: 'translateY(-10px)' } as const,
      to: { opacity: '1', transform: 'translateY(0)' } as const,
    },
    slideOut: {
      from: { opacity: '1', transform: 'translateY(0)' } as const,
      to: { opacity: '0', transform: 'translateY(10px)' } as const,
    },
    scaleIn: {
      from: { opacity: '0', transform: 'scale(0.95)' } as const,
      to: { opacity: '1', transform: 'scale(1)' } as const,
    },
    scaleOut: {
      from: { opacity: '1', transform: 'scale(1)' } as const,
      to: { opacity: '0', transform: 'scale(0.95)' } as const,
    },
    pulse: {
      '0%, 100%': { opacity: '1' } as const,
      '50%': { opacity: '0.7' } as const,
    },
    pulseGlow: {
      '0%, 100%': { opacity: '0.4', transform: 'scale(1)', filter: 'blur(60px)' } as const,
      '50%': { opacity: '0.7', transform: 'scale(1.15)', filter: 'blur(80px)' } as const,
    },
    rotate: {
      from: { transform: 'rotate(0deg)' } as const,
      to: { transform: 'rotate(360deg)' } as const,
    },
  }
}

// Helper functions for consistent implementation
export const cn = (...classes: (string | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ')
}

export const getGradient = (direction: 'from' | 'to' = 'to'): string => {
  return direction === 'to'
    ? 'linear-gradient(135deg, var(--color-primary-vibrant) 0%, var(--color-primary-saturated) 100%)'
    : 'linear-gradient(135deg, var(--color-primary-saturated) 0%, var(--color-primary-vibrant) 100%)'
}

export const getActiveColor = (isActive: boolean): string => {
  return isActive ? 'text-[#cbf341]' : 'text-white/70'
}