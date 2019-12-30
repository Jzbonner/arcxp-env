const paragraphTypes = ['text', 'video', 'image', 'raw_html', 'table', 'gallery', 'oembed_response'];

export default type => paragraphTypes.includes(type);
