import { isNumber } from '../utils/validators';

const latinToPersianMap = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];
const latinNumbers = [/1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g, /0/g];

// Latin to Persian
// (source: https://github.com/mohebifar/react-persian-datepicker/blob/master/src/utils/persian.js)
function prepareNumber(input) {
  let string;
  if (typeof input === 'number') {
    string = input.toString();
  } else if (typeof input === 'undefined') {
    string = '';
  } else {
    string = input;
  }

  return string;
}

// Change EN numbers to FA numbers
function latinToPersian(string) {
  let result = string;

  // Replace numbers
  for (let index = 0; index < 10; index++) {
    result = result.replace(latinNumbers[index], latinToPersianMap[index]);
  }

  // Replace `.` with `/`
  result = result.replace(/\./g, "/");

  return result;
}

export function toPersian(input, format = false) {
  let number = input;
  if (format)
    number = formatNumber(parseInt(number));
  return latinToPersian(prepareNumber(number));
}

// Check if number is in FA charaters
export function isPersian(number) {
  if (typeof input === 'number') {
    return false;
  } else if (typeof input === 'undefined') {
    return false;
  } else {
    for (let index = 0; index < number.length; index++) {
      for (let n = 0; n < 10; n++) {
        if (number[index].indexOf(latinToPersianMap[n])) {
          return true;
        }
      }
    }
  }

  return false;
}

// Add comma to every 3 number
export function formatNumber(number, dec = false) {
  number = number.toFixed(2) + '';
  let x = number.split('.');
  let x1 = x[0];
  let x2 = x.length > 1 ? '.' + x[1] : '';
  let rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + (dec ? x2 : '');
}
export function formatString(string, dec = false) {
  const numberString = isNumber(parseInt(string)) && string !== '' ? string : 0;
  return formatNumber(parseInt(numberString), dec) + '';
}

// Remove comma from number
export function removeCommas(n) {
  return prepareNumber(n).split(',').join('');
}

/// Convert to Words
// (source: https://github.com/mohebifar/react-persian/blob/master/src/PersianNumberWords.js)
const parts = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون', 'کوادریلیون', 'کویینتیلیون', 'سکستیلیون'];
const numbers = {
  0: ['', 'صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'],
  1: ['', 'ده', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'],
  2: ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'],
  two: ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'],
  zero: 'صفر',
};
const delimiter = ' و ';

export function convertToWords(input) {
  let string = input + '';

  string = string.split('')
    .reverse()
    .join('')
    .replace(/\d{3}(?=\d)/g, '$&,')
    .split('')
    .reverse()
    .join('')
    .split(',')
    .map((separated) => Array(4 - separated.length).join('0') + separated);

  let result = [];
  for (let iThree = 0; iThree < string.length; iThree++) {
    const three = string[iThree];
    let resultThree = [];

    for (let index = 0; index < three.length; index++) {
      const digit = three[index];
      if (index === 1 && digit === '1') {
        resultThree.push(numbers.two[three[2]]);
      } else if ((index !== 2 || three[1] !== '1') && numbers[index][digit] !== '') {
        resultThree.push(numbers[index][digit]);
      }
    }

    resultThree = resultThree.join(delimiter);
    result.push(resultThree + ' ' + parts[string.length - iThree - 1]);
  }

  result = result.filter(part => part.trim() !== '').join(delimiter).trim();

  if (result === '') {
    result = numbers.zero;
  }

  return result;
}

// Human file size
export function toHumanFileSize(size) {
    const mSize = prepareNumber(size);

    var i = Math.floor( Math.log(mSize) / Math.log(1024) );
    return ( mSize / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}
export function toHumanFileSizeFromMb(size) {
    const mSize = prepareNumber(size);

    var i = Math.floor( Math.log(mSize) / Math.log(1024) );
    return ( mSize / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['MB', 'GB', 'TB'][i];
}

// Card Number
export function readableCardNo(x) {
  return x.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1-$2-$3-$4");
}
