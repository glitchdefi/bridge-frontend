export const validate = {
    password_validate,
    IntergerInputValidate,
    emailValidate,
    phoneNumberValidate,
    validatePrivateKey
};

function password_validate(p) {
    const regexPassword = new RegExp(/^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/);
    return regexPassword.test(p);
}
function IntergerInputValidate(n) {
    return /^\d*$/.test(n)
}
function emailValidate(e){
    const regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexEmail.test(e);
}
function phoneNumberValidate(p){
    const regexPhone = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
    return regexPhone.test(p)
}

function validatePrivateKey (str){
    const regexFile = new RegExp(/^[0-9a-fA-F]{64}/);
    return regexFile.test(str)
}
