const validUrl = require('valid-url');
const { nanoid } = require('nanoid');
const Url = require('./models/url-model');


const getNewUrl = async (longUrl) => {
    const baseUrl = process.env.BASE_URL;

    if (!validUrl.isUri(baseUrl)) {
        throw new Error('invalid base url');
    }

    const urlCode = nanoid(6);

    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });

            if (url) {
                return {
                    newUrl: url.shortUrl
                };
            } else {
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();
                return {
                    newUrl: url.shortUrl
                };
            }
        } catch (err) {
            throw new Error('Server error');
        }
    } else {
        throw new Error('invalid long url');
    }
}

module.exports = getNewUrl;