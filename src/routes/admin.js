const router = require('express').Router();
const errorController = require("./../controller/error.js");
const { withLogin } = require("./../middlewares/verifyUser.js");
const { withAdmin } = require("./../middlewares/verifyAdministrator.js");

router.get("/", withLogin, withAdmin, async (req, res) => {
    const controller = require("./../controller/admin/panel.js");
    let view = "";

    try {
        view = await controller.getView(req, res);
    } catch (err) {
        view = errorController.getError500(err.message);
    }

    res.end(view);
});

router.get("/profile", withLogin, withAdmin, async (req, res) => {
    const controller = require("./../controller/admin/profile.js");
    let view = "";

    try {
        view = await controller.getView(req, res);
    } catch (err) {
        view = errorController.getError500(err.message);
    }

    res.end(view);
});

router.get("/profile/edit", withLogin, withAdmin, async (req, res) => {
    const controller = require("./../controller/admin/profile.js");
    let view = "";

    try {
        view = await controller.getEditView(req, res);
    } catch (err) {
        view = errorController.getError500(err.message);
    }

    res.end(view);
});

router.post("/profile/edit", withLogin, withAdmin, async (req, res) => {
    const controller = require("./../controller/admin/profile.js");
    let view = "";

    try {
        view = await controller.setEditView(req, res);
    } catch (err) {
        view = errorController.getError500(err.message);
    }

    res.end(view);
});

router.get("/help", withLogin, withAdmin, (req, res) => {
    const controller = require("./../controller/admin/help.js");
    let view = "";

    try {
        view = controller.getView(req, res);
    } catch (err) {
        view = errorController.getError500(err.message);
    }

    res.end(view);
});

router.get("/queue", withLogin, withAdmin, async (req, res) => {
    const controller = require("./../controller/admin/queue.js");
    let view = "";

    try {
        view = await controller.getManageView(req, res);
    } catch (err) {
        view = errorController.getError500(err.message);
    }

    res.end(view);
});

router.get("/queue/new", withLogin, withAdmin, (req, res) => {
    const controller = require("./../controller/admin/queue.js");
    let view = "";

    try {
        view = controller.getNewView(req, res);
    } catch (err) {
        view = errorController.getError500(err.message);
    }

    res.end(view);
});

router.post("/queue/new", withLogin, withAdmin, async (req, res) => {
    const controller = require("./../controller/admin/queue.js");
    let view = "";

    try {
        await controller.setNewView(req, res);
    } catch (err) {
        view = errorController.getError500(err.message);
    }

    res.end(view);
});

router.get("/queue/:id", withLogin, withAdmin, async (req, res) => {
    const controller = require("./../controller/admin/queue.js");
    let view = "";

    try {
        view = await controller.getView(req, res);
    } catch (err) {
        view = errorController.getError500(err.message);
    }

    res.end(view);
});

router.post("/queue/:id", withLogin, withAdmin, async (req, res) => {
    const controller = require("./../controller/admin/queue.js");
    let view = "";

    try {
        view = await controller.setView(req, res);
    } catch (err) {
        view = errorController.getError500(err.message);
    }

    res.end(view);
});

router.get("/menu", withLogin, withAdmin, async (req, res) => {
    const controller = require("./../controller/admin/menu.js");
    let view = "";

    try {
        view = await controller.getView(req, res);
    } catch (err){
        view = errorController.getError500(err.message);
    }

    res.end(view);
});

router.get("/menu/new", withLogin, withAdmin, (req, res) => {
    const controller = require("./../controller/admin/new menu.js");
    let view = "";

    try {
        view = controller.getView(req, res);
    } catch (err){
        view = errorController.getError500(err.message);
    }

    res.end(view);
});

router.post("/menu/new", withLogin, withAdmin, async (req, res) => {
    const controller = require("./../controller/admin/new menu.js");
    let view = "";

    try {
        view = await controller.setView(req, res);
    } catch (err){
        view = errorController.getError500(err.message);
    }

    res.end(view);
});

router.get("/menu/:id", withLogin, withAdmin, async (req, res) => {
    const controller = require("./../controller/admin/menu item.js");
    let view = "";

    try {
        view = await controller.getView(req, res);
    } catch (err){
        view = errorController.getError500(err.message);
    }

    res.end(view);
});

router.post("/menu/:id", withLogin, withAdmin, async (req, res) => {
    const controller = require("./../controller/admin/menu item.js");
    let view = "";

    try {
        view = await controller.setView(req, res);
    } catch (err){
        view = errorController.getError500(err.message);
    }

    res.end(view);
});

module.exports = router;