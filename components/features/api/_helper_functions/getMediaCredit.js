export default function getMediaCredit(creditObject = {}) {
  return (
    creditObject?.affiliation?.[0]?.name
    || creditObject?.by?.[0]?.name
    || creditObject?.by?.[0]?.referent?.id
    || ''
  );
}
