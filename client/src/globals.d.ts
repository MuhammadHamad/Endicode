declare global {
  interface Window {
    // Optional analytics shim. Code uses `typeof window._ffAnalytics === 'function'`
    // before calling, so it's safe whether or not anything sets it.
    _ffAnalytics?: (event: string, data?: unknown) => void;
    _endAnalytics?: (event: string, data?: unknown) => void;
  }
}

export {};
