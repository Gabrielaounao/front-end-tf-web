const router = require('express').Router();
const errorController = require("./../controller/error.js");
const { withLogin, withoutLogin } = require("./../middlewares/verifyUser.js");

router.get("/login", withoutLogin, (req, res) => {
    let view = "";
    const controller = require("./../controller/public/login.js").getView;

    try {
        view = controller(req, res);
    } catch (err) {
        view = errorController.getError500(err.message);
    }

    res.end(view);
});

router.post("/login", withoutLogin, async (req, res) => {
    const controller = require("./../controller/public/login.js");
    
    try {
        await controller.setView(req, res);
    } catch {
        res.write(controller.getView(req, res, "Email ou senha incorretos"));
    }

    res.end();
});

router.get("/signup", withoutLogin, (req, res) => {
    let view = "";
    const controller = require("./../controller/public/signup.js");

    try {
        view = controller.getView(req, res);
    } catch (err) {
        view = errorController.getError500(err.message);
    }
    
    res.end(view);
});

router.post("/signup", withoutLogin, async (req, res) => {
    const controller = require("./../controller/public/signup.js");

    try {
        await controller.setView(req, res);
    } catch (err) {
        res.end(controller.getView(req, res, err.message));
    }
})

router.get("/exit", withLogin, async (req, res) => {
    const controller = require("./../controller/public/exit.js");

    try {
        await controller(req, res);
    } catch (err) {
        errorController.getError500(err.message);
    }

    res.end();
});

router.get("/help", withoutLogin, (req, res) => {
    const controller = require("./../controller/public/help.js");
    let view = "";

    try {
        view = controller(req, res);
    } catch (err) {
        errorController.getError500(err.message);
    }

    res.end(view);
});

router.get("/recover-password", withoutLogin, (req, res) => {
    const controller = require("./../controller/public/recover password.js");
    let view = "";

    try {
        view = controller.getView(req, res);
    } catch (err) {
        errorController.getError500(err.message);
    }

    res.end(view);
});

router.post("/recover-password", withoutLogin, async (req, res) => {
    const controller = require("./../controller/public/recover password.js");
    let view = "";

    try {
        view = await controller.setView(req, res);
    } catch (err) {
        errorController.getError500(err.message);
    }

    res.end(view);
})

module.exports = router;