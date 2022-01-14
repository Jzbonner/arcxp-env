export default function getMediaCredit(creditObject = {}) {
  // eslint-disable-next-line
  return creditObject && creditObject.affiliation && creditObject.affiliation[0] && creditObject.affiliation[0].name && creditObject.affiliation[0].name !== '' ? creditObject.affiliation[0].name : creditObject && creditObject.by && creditObject.by[0] && creditObject.by[0].name && creditObject.by[0].name !== '' ? creditObject.by[0].name : creditObject && creditObject.by && creditObject.by[0] && creditObject.by[0].referent && creditObject.by[0].referent.id && creditObject.by[0].referent.id !== '' ? creditObject.by[0].referent.id : '';
}
