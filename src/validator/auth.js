const {check, validationResult} = require('express-validator');

// for signup
exports.validateRequest = [
    check('name')
    .notEmpty()
    .withMessage('name is requied'),
    check('phone')
    .isMobilePhone()
    .withMessage('Invalid Phone number'),
    check('password')
    .isLength({min: 6})
    .withMessage('Password length must be 6 digit.')
];
// for signin
exports.validatesigninRequest = [
    check('phone')
    .isMobilePhone()
    .isLength({min: 10, max:10})
    .withMessage('Invalid phone'),
    check('password')
    .isLength({min: 6})
    .withMessage('Password length must be 6 digit.')
];

exports.isRequestValidated = (req, res, next) => {
    const errors =  validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({error: errors.array()[0].msg });
    }
    
    next();
};