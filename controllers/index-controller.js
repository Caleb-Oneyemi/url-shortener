const Url = require('../models/url-model');

const redirectToLongUrl = async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code });

        if (url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json({
                message: 'No url found'
            })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        });
    }
}


module.exports = redirectToLongUrl;
