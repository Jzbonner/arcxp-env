export const getFirst120CharsFromStory = (contentElements = []) => {
  const firstParagraph = contentElements.find((el = { type: '', content: '' }) => el.type === 'text' && el.content !== '<br/>');
  const { content = '' } = firstParagraph || {};
  let first120Chars = typeof content === 'string' && content;
  first120Chars = first120Chars.replace(/<[^>]*>/gi, '');
  first120Chars = first120Chars.substring(0, 120);
  return first120Chars ? `<![CDATA[${first120Chars}...]]>` : '';
};

export default getFirst120CharsFromStory;
