const { GraphQLObjectType, GraphQLString } = require('graphql');

const urlType = new GraphQLObjectType({
    name: 'url',
    description: 'An object showing the shortened url',
    fields: () => ({
        newUrl: {
            type: GraphQLString
        }
    })
})

module.exports = urlType