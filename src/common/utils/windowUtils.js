export function isBrowser() {
  return typeof __BROWSER__ !== 'undefined';
}

export function hasWindow() {
  return typeof window !== 'undefined';
}

export function hasLocalStorage() {
  let isAvailable = false;
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem('feature_test', 'yes');
      if (localStorage.getItem('feature_test') === 'yes') {
        localStorage.removeItem('feature_test');
        isAvailable = true;
      } else {
        isAvailable = false;
      }
    } catch (e) {
      isAvailable = false;
    }
  } else {
    isAvailable = false;
  }

  return isAvailable;
}

export function getPixelRatio() {
  return window.devicePixelRatio;
}

export function isRetina() {
  if (hasWindow()) {
    return ((window.devicePixelRatio || 1) === 1) ? false : true;
  }

  return false;
}

/**
 * documentMode is an IE-only property
 * http://msdn.microsoft.com/en-us/library/ie/cc196988(v=vs.85).aspx
 */
export function getIEVersion(){
  return document.documentMode;
}
