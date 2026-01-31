const validate = require("validator");

const signupValidation = (req) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        throw new Error("All fields are required")
    } 
    if(fullName && fullName.trim().length > 25){
        throw new Error("Full name should below 25 characters");
    }
    if (!validate.isEmail(email)) {
        throw new Error("Invalid email format");
    }
    if (!validate.isStrongPassword(password)) {
        throw new Error("Enter a strong password");
    }

    return true;
}

const loginValidation = (req) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error("Email and password required");
    }
    if(!validate.isEmail(email)){
        throw new Error("Wrong email format")
    }
    return true;
}

module.exports = {
    signupValidation,
    loginValidation
}