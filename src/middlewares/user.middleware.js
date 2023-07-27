module.exports = {
    getUserValidate: function (req, res, next) {
        if (req.query.id) {
            if (isNaN(Number(req.query.id)) || req.query.id <= 0) {
                return res.status(500).json(
                    {
                        message: "UserId phải là số nguyên dương"
                    }
                )
            }
            try {
                if (typeof JSON.parse(req.query.detail) != "boolean") {
                    return res.status(500).json(
                        {
                            message: "Detail phải là true hoặc false"
                        }
                    )
                }
            } catch (err) {
                return res.status(500).json(
                    {
                        message: "Detail phải là true hoặc false"
                    }
                )
            }
        }
        next();
    }
}