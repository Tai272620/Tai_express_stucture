import userModel from '../models/user.model';

module.exports = {
    getUsers: async function (req, res) {
        // console.log(req.query)
        /* Get user by id */
        if (req.query.id) {
            if (JSON.parse(req.query.detail)) {
                let result = await userModel.getUserDetailById(req.query.id)
                if (result.status) {
                    return res.status(200).json(
                        {
                            message: result.message,
                            data: result.data
                        }
                    )
                } else {
                    return res.status(500).json({
                        message: result.message
                    })
                }
            } else {
                let result = await userModel.getUserById(req.query.id);
                if (result.status) {
                    return res.status(200).json(
                        {
                            message: result.message,
                            data: result.data
                        }
                    )
                } else {
                    return res.status(500).json({
                        message: result.message,
                    })
                }
            }
        }
        /* Get users */
        let result = await userModel.getUsers();
        console.log("result", result)
        if (result.status) {
            return res.status(200).json(
                {
                    message: result.message,
                    data: result.data
                }
            )
        } else {
            return res.status(500).json({
                message: result.message,
            })
        }
    },
    createUser: async function (req, res) {
        let result = await userModel.createUser(req.body);
        if (result.status) {
            return res.status(200).json(
                {
                    message: result.message,
                    data: result.data
                }
            )
        } else {
            return res.status(500).json({
                message: result.message,
            })
        }
    },
    deleteUserById: async function (req, res) {
        let result = await userModel.deleteUserById(req.params.id)
        if (result.status) {
            return res.status(200).json(
                {
                    message: result.message,
                    data: result.data
                }
            )
        } else {
            return res.status(500).json({
                message: result.message,
            })
        }
    },
    updateUserById: async function (req, res) {
        let result = await userModel.updateUserById(req.params.id, req.body)
        if (result.status) {
            return res.status(200).json(
                {
                    message: result.message,
                    data: result.data
                }
            )
        } else {
            return res.status(500).json({
                message: result.message,
            })
        }
    },
    updateFieldUserById: async function (req, res) {
        let result = await userModel.updateFieldUserById(req.params.id, req.body)
        if (result.status) {
            return res.status(200).json(
                {
                    message: result.message,
                    data: result.data
                }
            )
        } else {
            return res.status(500).json({
                message: result.message,
            })
        }
    }
}