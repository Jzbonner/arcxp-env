const schema = `
type Description {
  basic: String
}
type Headlines {
  basic: String
}

type Subheadlines {
  basic: String
}
type Data {
  type: String!
  _id: String
  canonical_url: String
  description: Description
  headlines: Headlines
  subheadlines: Subheadlines
}
type Query {
  data: [Data]
}
`;

export default schema;
