const {
    body
} = require("express-validator");



exports.userValidation = [


    body("name")

    .trim()

    .notEmpty()

    .withMessage(
        "Name is required"
    )

    .isLength({
        min:3
    })

    .withMessage(
        "Name must be at least 3 characters"
    ),



    body("email")

    .trim()

    .notEmpty()

    .withMessage(
        "Email is required"
    )

    .isEmail()

    .withMessage(
        "Enter a valid email"
    )

];