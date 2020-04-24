export default function (columnsC) {
  switch (parseInt(columnsC, 10)) {
    case 1:
      return 'one-column';
    case 2:
      return 'two-columns';
    case 3:
      return 'three-columns';
    case 4:
      return 'four-columns';
    default:
      return 'one-column';
  }
}
