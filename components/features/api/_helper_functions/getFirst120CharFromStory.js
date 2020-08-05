export const getFirst120CharsFromStory = (contentElements = []) => {
  const firstParagraph = contentElements.find((el = { type: '', content: '' }) => el.type === 'text' && el.content !== '<br/>');
  const { content = '' } = firstParagraph || {};
  const first120Chars = typeof content === 'string' && content.substring(0, 120);
  return first120Chars ? `<![CDATA[${first120Chars}...]]>` : '';
};

export default getFirst120CharsFromStory;
