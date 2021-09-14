import isNotBR from '../BR';

let numberOfElements = 0;
const filterContentElements = ({ contentElements, elementToRemove, indexToStartRemoving = 1 }) => {
  const newContentElements = contentElements.filter((element) => {
    // we reconstruct contentElements to remove any extraneous elements (e.g. Divider), per the logic in APD-96

    if (element.type === elementToRemove) {
      numberOfElements += 1; // it's a removable content type, increment the total count
    }
    return (element.type !== elementToRemove // it's not a removable content type, OR
      || (element.type === elementToRemove // it IS a removable content type, AND
        && numberOfElements < indexToStartRemoving + 1)) // the removable content index is LESS than the cutoff (plus 1)
      && isNotBR(element) // it's not a content element containing only an empty BR
      ? element
      : null; // then include the content element in the (new) array of elements to be passed back for rendering
  });
  return newContentElements;
};

export default filterContentElements;
