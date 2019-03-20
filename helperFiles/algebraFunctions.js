//rounds the input number to the given decimal places
function roundToFixed(number, precision) {
  var m = pow(10, precision);
  return round(number * m) / m;
}
