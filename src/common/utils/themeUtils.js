import { toPersian } from './numberUtils';
import map from 'lodash/map';


export const translateLang = (lang) => ({ 
  'fa': 'فارسی',
  'en': 'انگلیسی',
  'ar': 'عربی',
}[lang]);

export const translateColumns = (columns) => map(columns, cl => 
  cl === '1' 
    ? 'تک ستونه' 
    : `${toPersian(cl)} ستونه`
);