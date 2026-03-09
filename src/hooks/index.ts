/**
 * Shared React Hooks
 *
 * This directory contains hooks that are used across multiple features.
 * Feature-specific hooks should remain in their respective feature directories.
 *
 * Example usage:
 * import { useMediaQuery } from '@/hooks';
 */

// Re-export feature hooks that are commonly used across the app
export { useCart } from '@/features/cart/hooks/use-cart';

// Add shared hooks here as they are created
// export { useMediaQuery } from './use-media-query';
// export { useDebounce } from './use-debounce';
// export { useLocalStorage } from './use-local-storage';
