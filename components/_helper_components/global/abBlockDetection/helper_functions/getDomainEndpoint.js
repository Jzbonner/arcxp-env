export default function getDomainEndpoint(arcSite) {
  let domain = '';

  switch (arcSite) {
    case 'ajc':
      domain = 'rtwa.ajc.com';
      break;
    case 'daytondaily':
      domain = 'rtwa.daytondailynews.com';
      break;
    case 'springfieldnews':
      domain = 'rtwa.springfieldnewssun.com';
      break;
    case 'daytondotcom':
      domain = 'rtwa.dayton.com';
      break;
    case 'journalnews':
      domain = 'rtwa.journal-news.com';
      break;
    default:
      break;
  }

  return domain;
}
