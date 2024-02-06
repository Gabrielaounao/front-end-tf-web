function createSession(req, obj) {
    req.session.user = obj;
}

async function deleteSession(req) {
    req.session.destroy();
}

module.exports = { createSession, deleteSession };
