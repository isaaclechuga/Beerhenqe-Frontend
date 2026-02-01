export const getListOfYears = () => {
  var years = [];
  var actualYear = new Date().getFullYear() - 1;
  var actualYearMin = actualYear;
  for (var i = 0; i < 2; i++) {
    years[i] = actualYearMin - i;
  }
  return years;
};
export function removeItem(arr) {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax = arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
}
