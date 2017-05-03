export const stripScripts = function(a,b,c){b=new Option;b.innerHTML=a;for(a=b.getElementsByTagName('script');c=a[0];)c.parentNode.removeChild(c);return b.innerHTML;};
