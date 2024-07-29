export default function setFlash(req, res, next) {
    // 'flash' object contains 'success' and 'error' messages retrieved from the request object (req)
    res.locals.flash = {
        'success': req.flash('success'), // Retrieve 'success' flash message
        'error': req.flash('error') // Retrieve 'error' flash message
    }

    // Call the next middleware function in the stack
    next();
}
