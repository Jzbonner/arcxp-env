export default function (displayC) {
  switch (displayC) {
    case 'Top Photo':
      return 'top-photo-display-class';
    case 'Left Photo':
      return 'left-photo-display-class';
    case 'No Photo':
      return 'no-photo-display-class';
    case 'Center Lead Top Photo':
      return 'center-lead-display-class';
    case '1 or 2 Item Feature':
      return 'one-two-item-display-class';
    default:
      return 'top-photo-display-class';
  }
}
