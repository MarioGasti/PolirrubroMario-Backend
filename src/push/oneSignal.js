const oneSignal = require('onesignal-node');

const GROUPS = require('./groups');

var groups = GROUPS.GROUPS;
// var client = new oneSignal.Client({
//     userAuthKey: 'Njk4MGQ2Y2QtMzQ4Zi00NjM4LTk4ZDctMDNmZDhhMmZlMDc2',
//     app: { appAuthKey: 'NWRjYWY5ZTEtZDczNS00YjY0LWFhOWEtYjQ3OTZiNTZmNmM4', appId: '752822f7-7bef-445e-a20a-930570872b6c' }
// });
var client = new oneSignal.Client('752822f7-7bef-445e-a20a-930570872b6c', 'NWRjYWY5ZTEtZDczNS00YjY0LWFhOWEtYjQ3OTZiNTZmNmM4');

let getDateTime = () => {
    let today = new Date();
    today.setMinutes(today.getMinutes() + today.getTimezoneOffset());
    today.setMinutes(today.getMinutes() - 180);
    let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
};

exports.postAll = (req, res) => {
    let additionalData = { "fecha y hora": getDateTime() };
    if (req.body.data)
        if (req.body.data.transmitter)
            additionalData[`transmitter`] = req.body.data.transmitter;
    let notification = {
        contents: {
            en: req.body.content
        },
        included_segments: ["Active Users", "Inactive Users"],
        data: additionalData,
        headings: {
            en: req.body.headings
        }
    };
    client.createNotification(notification)
        .then(response => {
            if (res)
                res.status(200).json({
                    ok: true,
                    httpStatus: response.statusCode,
                    message: `Se realizó con éxito la petición ${ req.method }.`,
                    notification: notification,
                    data: response,
                    notificationId: response.id
                });
        })
        .catch(e => {
            if (res)
                res.status(400).json({
                    ok: false,
                    message: `Error trying to ${ req.method }.`,
                    notification: notification,
                    error: e
                });
        });
};

exports.postByID = (req, res) => {
    let additionalData = { "fecha y hora": getDateTime() };
    if (req.body.data)
        if (req.body.data.transmitter)
            additionalData[`transmitter`] = req.body.data.transmitter;
    let notification = {
        contents: {
            en: req.body.content
        },
        include_player_ids: [req.params.id],
        excluded_segments: ["Active Users"],
        data: additionalData,
        headings: {
            en: req.body.headings
        }
    };
    client.createNotification(notification)
        .then(response => {
            if (res)
                res.status(200).json({
                    ok: true,
                    httpStatus: response.statusCode,
                    message: `OK ${ req.method }.`,
                    notification,
                    response,
                    notificationId: response.id
                });
        })
        .catch(e => {
            if (res)
                res.status(400).json({
                    ok: false,
                    message: `Error trying to ${ req.method }.`,
                    notification: notification,
                    error: e
                });
        });
};

exports.postByGroup = (req, res) => {
    let ids = groups[req.params.group];
    let additionalData = { "fecha y hora": getDateTime() };
    if (req.body.data)
        if (req.body.data.transmitter)
            additionalData[`transmitter`] = req.body.data.transmitter;
    let notification = {
        contents: {
            en: req.body.content
        },
        include_player_ids: ids,
        data: additionalData,
        headings: {
            en: req.body.headings
        }
    };
    client.createNotification(notification)
        .then(response => {
            if (res)
                res.status(200).json({
                    ok: true,
                    httpStatus: response.statusCode,
                    message: `OK ${ req.method }.`,
                    notification,
                    response,
                    notificationId: response.id
                });
        })
        .catch(e => {
            if (res)
                res.status(400).json({
                    ok: false,
                    message: `Error trying to ${ req.method }.`,
                    notification,
                    error: e
                });
        });
};

exports.postByTag = (req, res) => {
    let key = req.params.tag;
    let additionalData = { "fecha y hora": getDateTime() };
    if (req.body.data)
        if (req.body.data.transmitter)
            additionalData[`transmitter`] = req.body.data.transmitter;
    let notification = {
        contents: {
            en: req.body.content
        },
        data: additionalData,
        headings: {
            en: req.body.headings
        },
        filters: [
            { "field": "tag", "key": key, "relation": "=", "value": "true" },
        ],
    };
    client.createNotification(notification)
        .then(response => {
            if (res)
                res.status(200).json({
                    ok: true,
                    httpStatus: response.statusCode,
                    message: `OK ${ req.method }.`,
                    notification,
                    response,
                    notificationId: response.id
                });
        })
        .catch(e => {
            if (res)
                res.status(400).json({
                    ok: false,
                    message: `Error trying to ${ req.method }.`,
                    notification,
                    error: e
                });
        });
};

exports.editDevice = async(req, res) => {
    let deviceBody = req.body;
    const response = await client.editDevice(req.params.id, deviceBody);
    if (response.statusCode === 200)
        res.status(200).json({
            ok: true,
            httpStatus: response.statusCode,
            message: `OK ${ req.method }`,
            response,
        });
    else
        res.status(400).json({
            ok: false,
            httpStatus: response.statusCode,
            message: `Error trying to ${ req.method }`,
            response,
        });
};

exports.getDevice = async(req, res) => {
    const response = await client.viewDevice(req.params.id);
    if (response.statusCode === 200)
        res.status(200).json({
            ok: true,
            httpStatus: response.statusCode,
            message: `OK ${ req.method }`,
            response,
        });
    else
        res.status(400).json({
            ok: false,
            httpStatus: response.statusCode,
            message: `Error trying to ${ req.method }`,
            response
        });
};

exports.getDevices = async(req, res) => {
    const response = await client.viewDevices({ limit: 200, offset: 0 });
    if (response.statusCode === 200)
        res.status(200).json({
            ok: true,
            httpStatus: response.statusCode,
            message: `OK ${ req.method }`,
            data: response
        });
    else
        res.status(400).json({
            ok: false,
            httpStatus: response.statusCode,
            message: `Error trying to ${ req.method }`,
            response
        });
};

exports.getTrack = (req, res) => {
    client.viewNotification(req.params.notificationId, function(err, httpResponse, data) {
        if (err) {
            res.status(400).json({
                ok: false,
                httpStatus: httpResponse.statusCode,
                message: `Error trying to ${req.method}`,
                error: err,
                affectedNotificationId: req.params.notificationId,
                data: data,
            });
        } else {
            req.data = JSON.parse(data);
            res.status(200).json({
                ok: true,
                httpStatus: httpResponse.statusCode,
                message: `OK ${req.method}`,
                affectedNotificationId: req.params.notificationId,
                data: req.data,
                dataToSend: {
                    contents: req.data.contents,
                    data: req.data.data,
                    filters: req.data.filters,
                    headings: req.data.headings,
                    included_segments: req.data.included_segments,
                    include_player_ids: req.data.include_player_ids,
                }
            });
        }
    });
};