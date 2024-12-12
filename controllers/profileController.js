exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('items');
        if (!user) {
            return res.status(404).render('error', { message: 'User not found' });
        }

        const items = user.items || []; // Default to empty array if undefined
        const stories = user.stories || [];
        console.log('User:', user); // Check if user and items are populated correctly
        res.render('user/profile', { user, items, stories });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Internal Server Error' });
    }
};

