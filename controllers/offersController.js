const Offer = require('../models/Offer');


exports.makeOffer = async (req, res) => {
const { itemId } = req.params;
const { amount } = req.body;
const userId = req.user._id;

try {
const item = await Item.findById(itemId);
if (!item || !item.active) {
    return res.status(404).render('error', { message: 'Item not found or inactive' });
}
if (item.seller.equals(userId)) {
    return res.status(401).render('error', { message: 'Cannot make an offer on your own item' });
}

const newOffer = await Offer.create({ amount, item: itemId, user: userId });

// Update item fields
await Item.findByIdAndUpdate(itemId, {
    $inc: { totalOffers: 1 },
    $max: { highestOffer: amount },
});

res.redirect(`/items/${itemId}`);
} catch (err) {
res.status(500).render('error', { message: err.message });
}
};

exports.acceptOffer = async (req, res) => {
const { itemId, offerId } = req.params;

try {
    const item = await Item.findById(itemId);
    if (!item || !item.seller.equals(req.user._id)) {
    return res.status(401).render('error', { message: 'Unauthorized access' });
    }

    await Offer.findByIdAndUpdate(offerId, { status: 'accepted' });
    await Offer.updateMany({ item: itemId, _id: { $ne: offerId } }, { status: 'rejected' });

    // Deactivate item
    item.active = false;
    await item.save();

    res.redirect(`/items/${itemId}/offers`);
} catch (err) {
    res.status(500).render('error', { message: err.message });
}
};

exports.viewOffers = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id).populate('offers'); // Assuming Story has a reference to offers
        if (!story) {
            return res.status(404).render('error', { message: 'Story not found' });
        }

        const offers = story.offers || [];
        res.render('offers/view', { story, offers }); // Render the view with story and its offers
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Internal Server Error' });
    }
};

