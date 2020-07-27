export const getFirstSentenceFromStory = (contentElements = []) => {
  const firstParagraph = contentElements.find((el = { type: '', content: '' }) => el.type === 'text' && el.content !== '<br/>');
  const { content = '' } = firstParagraph || {};
  const contentArray = content.split('.');
  const [firstSentence] = contentArray;
  return firstSentence ? `<![CDATA[${firstSentence}]]>` : '';
};

export default getFirstSentenceFromStory;
