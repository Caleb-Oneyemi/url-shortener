const { GraphQLObjectType, GraphQLSchema, GraphQLNonNull, GraphQLString } = require('graphql');
const getNewUrl = require('./helper');
const urlType = require('./types/urlType');


const query = new GraphQLObjectType({
    name: 'shortenURL',
    description: 'returns a shortened url',
    fields: () => ({
        shortenURL: {
            type: urlType,
            args: {
                url: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'can only be a valid url'
                }
            },
            resolve(_, { url }) {
                return getNewUrl(url);
            }
        }
    })
})

const schema = new GraphQLSchema({
    query
})

module.exports = schema;