const Sort = {
  numeric(a, b) {
    var valA = parseFloat(a.toString().replace(/,/g, ''));
    var valB = parseFloat(b.toString().replace(/,/g, ''));

    // Sort non-numeric values alphabetically at the bottom of the list
    if (isNaN(valA) && isNaN(valB)) {
      valA = a;
      valB = b;
    } else {
      if (isNaN(valA)) {
        return 1;
      }
      if (isNaN(valB)) {
        return -1;
      }
    }

    if (valA < valB) {
      return -1;
    }
    if (valA > valB) {
      return 1;
    }

    return 0;
  },

  caseInsensitive(a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  }
};

export default Sort;
