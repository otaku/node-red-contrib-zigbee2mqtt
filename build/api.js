"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NODE_PATH = '/zigbee2mqtt/';
module.exports = function (RED) {
    RED.httpAdmin.get(NODE_PATH + 'static/*', function (req, res) {
        const options = {
            root: __dirname + '/static/',
            dotfiles: 'deny'
        };
        res.sendFile(req.params[0], options);
    });
    RED.httpAdmin.get(NODE_PATH + 'getDevices', function (req, res) {
        const config = req.query;
        const controller = RED.nodes.getNode(config.controllerID);
        const forceRefresh = config.forceRefresh ? ['1', 'yes', 'true'].includes(config.forceRefresh.toLowerCase()) : false;
        if (controller && controller.constructor.name === "ServerNode") {
            controller.getDevices(function (items) {
                if (items) {
                    res.json(items);
                }
                else {
                    res.status(500).end();
                }
            }, forceRefresh, true);
        }
        else {
            res.status(404).end();
        }
    });
    RED.httpAdmin.get(NODE_PATH + 'getLastStateById', function (req, res) {
        const config = req.query;
        const controller = RED.nodes.getNode(config.controllerID);
        if (controller && controller.constructor.name === "ServerNode") {
            const item = controller.getLastStateById(config.device_id);
            if (item) {
                res.json([item.lastPayload, item.homekit]);
            }
            else {
                res.status(500).end();
            }
        }
        else {
            res.status(404).end();
        }
    });
    RED.httpAdmin.get(NODE_PATH + 'getStatesByDevice', function (req, res) {
        const config = req.query;
        const controller = RED.nodes.getNode(config.controllerID);
        if (controller && controller.constructor.name === "ServerNode") {
            const item = controller.getDeviceById(config.device_id);
            if (item) {
                res.json([item.lastPayload, item.homekit]);
            }
            else {
                res.status(500).end();
            }
        }
        else {
            res.status(404).end();
        }
    });
    RED.httpAdmin.get(NODE_PATH + 'setPermitJoin', function (req, res) {
        const config = req.query;
        const controller = RED.nodes.getNode(config.controllerID);
        if (controller && controller.constructor.name === "ServerNode") {
            controller.setPermitJoin(config.permit_join == 'true' ? true : false);
            res.json({ "result": "ok" });
        }
        else {
            res.status(404).end();
        }
    });
    RED.httpAdmin.get(NODE_PATH + 'setLogLevel', function (req, res) {
        const config = req.query;
        const controller = RED.nodes.getNode(config.controllerID);
        if (controller && controller.constructor.name === "ServerNode") {
            controller.setLogLevel(config.log_level);
            res.json({ "result": "ok" });
        }
        else {
            res.status(404).end();
        }
    });
    RED.httpAdmin.get(NODE_PATH + 'getConfig', function (req, res) {
        const config = req.query;
        const controller = RED.nodes.getNode(config.controllerID);
        if (controller && controller.constructor.name === "ServerNode") {
            res.json(controller.bridge_config);
        }
        else {
            res.status(404).end();
        }
    });
    RED.httpAdmin.get(NODE_PATH + 'renameDevice', function (req, res) {
        const config = req.query;
        const controller = RED.nodes.getNode(config.controllerID);
        if (controller && controller.constructor.name === "ServerNode") {
            const response = controller.renameDevice(config.ieeeAddr, config.newName);
            res.json(response);
        }
        else {
            res.status(404).end();
        }
    });
    RED.httpAdmin.get(NODE_PATH + 'removeDevice', function (req, res) {
        const config = req.query;
        const controller = RED.nodes.getNode(config.controllerID);
        if (controller && controller.constructor.name === "ServerNode") {
            const response = controller.removeDevice(config.id, config.newName);
            res.json(response);
        }
        else {
            res.status(404).end();
        }
    });
    RED.httpAdmin.get(NODE_PATH + 'renameGroup', function (req, res) {
        const config = req.query;
        const controller = RED.nodes.getNode(config.controllerID);
        if (controller && controller.constructor.name === "ServerNode") {
            const response = controller.renameGroup(config.id, config.newName);
            res.json(response);
        }
        else {
            res.status(404).end();
        }
    });
    RED.httpAdmin.get(NODE_PATH + 'removeGroup', function (req, res) {
        const config = req.query;
        const controller = RED.nodes.getNode(config.controllerID);
        if (controller && controller.constructor.name === "ServerNode") {
            const response = controller.removeGroup(config.id);
            res.json(response);
        }
        else {
            res.status(404).end();
        }
    });
    RED.httpAdmin.get(NODE_PATH + 'addGroup', function (req, res) {
        const config = req.query;
        const controller = RED.nodes.getNode(config.controllerID);
        if (controller && controller.constructor.name === "ServerNode") {
            const response = controller.addGroup(config.name);
            res.json(response);
        }
        else {
            res.status(404).end();
        }
    });
    RED.httpAdmin.get(NODE_PATH + 'removeDeviceFromGroup', function (req, res) {
        const config = req.query;
        const controller = RED.nodes.getNode(config.controllerID);
        if (controller && controller.constructor.name === "ServerNode") {
            const response = controller.removeDeviceFromGroup(config.deviceId, config.groupId);
            res.json(response);
        }
        else {
            res.status(404).end();
        }
    });
    RED.httpAdmin.get(NODE_PATH + 'addDeviceToGroup', function (req, res) {
        const config = req.query;
        const controller = RED.nodes.getNode(config.controllerID);
        if (controller && controller.constructor.name === "ServerNode") {
            const response = controller.addDeviceToGroup(config.deviceId, config.groupId);
            res.json(response);
        }
        else {
            res.status(404).end();
        }
    });
    RED.httpAdmin.get(NODE_PATH + 'refreshMap', function (req, res) {
        const config = req.query;
        const controller = RED.nodes.getNode(config.controllerID);
        if (controller && controller.constructor.name === "ServerNode") {
            controller.refreshMap(true, config.engine).then(function (response) {
                res.json(response);
            }).catch(error => {
                res.status(500).json(error);
            });
        }
        else {
            res.status(404).end();
        }
    });
    RED.httpAdmin.get(NODE_PATH + 'showMap', function (req, res) {
        const config = req.query;
        const controller = RED.nodes.getNode(config.controllerID);
        if (controller && controller.constructor.name === "ServerNode") {
            const response = controller.map;
            res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
            res.end(response);
        }
        else {
            res.status(404).end();
        }
    });
};
