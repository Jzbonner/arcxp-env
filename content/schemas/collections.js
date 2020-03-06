const schema = `

type PinnedCount {
   count: Int
}

type Data {
    pinned_count : PinnedCount
}

type Query {
    data : Data!
}
`;

export default schema;
