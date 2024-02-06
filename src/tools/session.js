function createSession(req, obj) {
    req.session.user = obj;
}

async function deleteSession(req) {
    await req.session.destroy();
}

module.exports = { createSession, deleteSession };