const passport = require("passport")
exports.isAuth = (req, res, done) => {
    return passport.authenticate('jwt');
};

exports.senitizeUser = (user) => {
    return { id: user.id, email: user.email, role: user.role, name: user.name, addresses: user.addresses };
}
exports.cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWM4OWZiNDQxNDAyNWMyMDQ0MGUxOSIsImVtYWlsIjoic2hvZWJAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJuYW1lIjoiYWRtaW4iLCJhZGRyZXNzZXMiOltdLCJpYXQiOjE2OTMyMjQ4NDl9.G1rKepKagO3hoU9SV0FOT5YC_i6wNEeH2l2YywbIjG4"
    return token;
};