import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mobile responsive utilities
export const mobileResponsive = {
  // Spacing utilities
  pMobile: "p-2 sm:p-3 md:p-4 lg:p-6",
  pFloatMobile: "p-3 sm:p-4 md:p-6",
  
  // Margin utilities
  mMobile: "m-2 sm:m-3 md:m-4 lg:m-6",
  
  // Font size utilities
  textMobileH1: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
  textMobileH2: "text-xl sm:text-2xl md:text-3xl",
  textMobileH3: "text-lg sm:text-xl md:text-2xl",
  textMobileBody: "text-xs sm:text-sm md:text-base",
  
  // Grid utilities for responsive layouts
  gridMobile: "grid grid-cols-1",
  gridTablet: "lg:grid-cols-2",
  gridDesktop: "xl:grid-cols-3",
  
  // Flex utilities
  flexMobile: "flex flex-col",
  flexDesktop: "lg:flex-row",
  
  // Button sizes
  btnMobile: "px-4 sm:px-5 py-2 text-[10px] sm:text-[11px] md:text-xs",
  btnDesktop: "px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 text-xs sm:text-sm lg:text-base",
  
  // Touch target support
  touchTarget: "min-w-[44px] min-h-[44px]",
  
  // Container optimizations
  containerMobile: "px-4 max-w-7xl mx-auto",
  containerTablet: "sm:px-6 lg:px-8 max-w-7xl mx-auto",
  containerDesktop: "max-w-7xl mx-auto px-6",
  
  // Border radius adjustments
  borderRadiusMobile: "rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl",
  
  // Shadow adjustments
  shadowMobile: "shadow-lg sm:shadow-xl md:shadow-2xl",
  
  // Gap utilities
  gapMobile: "gap-2 sm:gap-3 md:gap-4 lg:gap-6",
}

// Mobile responsive class combinations
export const mobileClasses = {
  sectionPadding: "py-6 sm:py-8 md:py-12 lg:py-16",
  sectionPaddingXL: "py-8 sm:py-12 md:py-16 lg:py-20",
  cardPadding: "p-4 sm:p-6 md:p-8 lg:p-10",
  sectionContainer: "px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto",
}

// Mobile optimization flags
export const isMobileDevice = () => {
  return window.innerWidth < 1024;
};
