const validate = require("validator");

const signupValidation = (req) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        throw new Error("All fields are required")
    }
    if (!validate.isEmail(email)) {
        throw new Error("Invalid email format");
    }
    if (!validate.isStrongPassword(password)) {
        throw new Error("Enter a strong password");
    }

    return true;
}

module.exports = {
    signupValidation
}