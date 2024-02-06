const router = require('express').Router();
const errorController = require("./../controller/error.js");
const { withLogin } = require("./../middlewares/verifyUser.js");

router.get("/", withLogin, async (req, res) => {
    const controller = require("./../controller/user/home.js");
    let view = "";

    try {
        view = await controller.getView(req, res);
    } catch (err) {
        view = errorController.getError500(err.message);
    }

    res.end(view);
});

router.post("/", withLogin, async (req, res) => {
    const controller = require("./../controller/user/home.js");
    let view = "";

    try {
        view = await controller.setView(req, res);
    } catch (err) {
        view = errorController.getError500(err.message);
    }

    res.end(view);
});

router.get("/profile", withLogin, async (req, res) => {
    const controller = require("./../controller/user/profile.js");
    let view = "";

    try {
        view = await controller.getView(req, res);
    } catch (err) {
        view = errorController.getError500(err.message);
    }

    res.end(view);
});

router.get("/profile/edit", withLogin, async (req, res) => {
    const controller = require("./../controller/user/profile.js");
    let view = "";

    try {
        view = await controller.getEditView(req, res);
    } catch (err) {
        view = errorController.getError500(err.message);
    }

    res.end(view);
});

router.post("/profile/edit", withLogin, async (req, res) => {
    const controller = require("./../controller/user/profile.js");
    let view = "";

    try {
        view = await controller.setEditView(req, res);
    } catch (err) {
        view = errorController.getError500(err.message);
    }

    res.end(view);
});

router.get("/user/help", withLogin, (req, res) => {
    const controller = require("./../controller/user/help.js");
    let view = "";

    try {
        view = controller.getView(req, res);
    } catch (err) {
        view = errorController.getError500(err.message);
    }

    res.end(view);
});

module.exports = router;