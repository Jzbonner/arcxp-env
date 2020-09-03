export default (tree, treeFeatureName, treeSectionId) => {
  return tree.children.find(el => {
    if (el.props.id === treeSectionId) {
      return el.children.find(childEl => childEl.type === treeFeatureName);
    }
  });
  return null;
};
