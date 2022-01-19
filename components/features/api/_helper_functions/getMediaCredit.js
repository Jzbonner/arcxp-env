export default function getMediaCredit(creditObject = {}) {
  // eslint-disable-next-line
  return (
    creditObject?.affiliation[0]?.name
    || creditObject?.by[0]?.name
    || creditObject?.by[0]?.referent?.id
    || ''
  );
}
