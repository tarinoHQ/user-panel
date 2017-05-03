export function isRtl(string = '', def = true) {
  const trimmed = string.trim();

  if (trimmed === '')
    return def;

  var rtl = /[\u0600-\u06FF\u0750-\u077F\u0590-\u05FF\u0700-\u074F]/;
  return rtl.test(trimmed.substr(0, 1));
}

export function isEmail(string = '') {
  const trimmed = string.trim();

  if (trimmed.indexOf('@') !== -1 &&
      trimmed.indexOf('.') !== -1) {
    return true;
  }

  return false;
}

export function isNumber(string = '') {
  return typeof string === 'number';
}
