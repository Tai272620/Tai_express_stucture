module.exports = {
    createValidate: function (req, res, next) {
        if (req.body == undefined) {
            res.status(500).json({
                message: "Vui lòng truyền danh mục muốn thêm"
            })
        }
        if (req.body.title?.length > 15 || req.body.title?.length < 6 || req.body.title == undefined) {
            return res.status(500).json({
                message: "Tên danh mục phải từ 6 tới 15 kí tự"
            })
        }
        if (req.body.avatar == undefined) {
            return res.status(500).json({
                message: "Bạn phải thêm hình đại diện cho danh mục"
            })
        }
        req.body = {
            title: req.body.title,
            avatar: req.body.avatar
        }
        next();
    }
}