function createSession(req, obj) {
    req.session.user = obj;
}

async function deleteSession(req) {
    req.session.user = undefined;
}

module.exports = { createSession, deleteSession };
