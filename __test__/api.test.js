const request = require('supertest');
const app = require('../app');

const correctQuery = `
    {
        shortenURL(url:"http://backdrop.photo/") {
            newUrl
        }
    }
`;

const wrongQuery = `
    {
        shortenURL(url:"abc") {
            newUrl
        }
    }
`

describe('graphql tests', () => {
    test('returns a shorter url for valid input url', async () => {
        const result = await request(app).post('/graphiql').send({ query: correctQuery });
        
        expect(result.body.data.shortenURL).toHaveProperty('newUrl');
        expect(result.body.data.shortenURL.newUrl).not.toBe(null);
    })

    test('throws an error for invalid input url', async () => {
        const result = await request(app).post('/graphiql').send({ query: wrongQuery });

        expect(result.body).toHaveProperty('errors');
        expect(result.body.errors[0].message).toBe('invalid long url');
        expect(result.body.data.shortenURL).toBeNull();
    })
})