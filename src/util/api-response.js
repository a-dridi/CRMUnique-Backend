exports.successResponse = (res, data) => {
    res.send(200, data);
};

exports.errorResponse = (res, data) => {
    res.send(400, data);
};

exports.notFoundResponse = (res, data) => {
    res.send(404, data);
}