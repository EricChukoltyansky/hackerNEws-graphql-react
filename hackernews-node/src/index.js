const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  Mutation: {
    // 2
    post: (parent, args) => {
      console.log("post args", args);
      let idCount = links.length;
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    deleteLink: (parent, args) => {
      console.log("args", args);
      let linkId = parseInt(args.id);
      console.log("linkId", linkId);
      const filteredLinks = links.filter((item) => {
        item.id != linkId;
      });
      return filteredLinks
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
