
import { mySQL } from '../databases/mySQL';

module.exports = {
    getUsers: function () {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT users.* FROM users`
            mySQL.query(queryString, (err, result) => {
                if (err) {
                    return resolve(
                        {
                            status: false,
                            message: "Lỗi truy vấn",
                        }
                    )
                }
                return resolve(
                    {
                        status: true,
                        message: "Get users success!",
                        data: result
                    }
                )
            })

        }).catch(err => {
            console.log("Error syntax Promise!")
            return {
                status: false,
                message: "Error!"
            }
        })
    },
    getUserById: function (userId) {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT users.* FROM users WHERE users.id = ${userId};`
            mySQL.query(queryString, (err, result) => {
                if (err) {
                    return resolve(
                        {
                            status: false,
                            message: "Lỗi truy vấn",
                        }
                    )
                }

                // console.log("result", result);

                if (result.length == 0) {
                    return resolve(
                        {
                            status: false,
                            message: "User not found!",
                        }
                    )
                }
                return resolve(
                    {
                        status: true,
                        message: "Get user success!",
                        data: result[0]
                    }
                )
            })

        }).catch(err => {
            console.log("Error syntax Promise!")
            return {
                status: false,
                message: "Error!"
            }
        })
    },
    getUserDetailById: function (userId) {
        return new Promise((resolve, reject) => {
            let queryString = `
            SELECT users.*, user_address.id as addressId, user_address.name as addressName, user_address.provinceId, user_address.wardId
            FROM users
            LEFT JOIN user_address on users.id = user_address.userId
            WHERE users.id = ${userId}
            `
            mySQL.query(queryString, (err, result) => {
                if (err) {
                    return resolve(
                        {
                            status: false,
                            message: "Lỗi truy vấn",
                        }
                    )
                }
                console.log("result", result);
                let user;
                for (let i in result) {
                    if (!user) {
                        user = {
                            id: result[i].id,
                            name: result[i].name,
                            email: result[i].email,
                            address:
                                result[i].addressId ?
                                    [
                                        {
                                            id: result[i].addressId,
                                            name: result[i].addressName,
                                            provinceId: result[i].provinceId,
                                            wardId: result[i].wardId
                                        }
                                    ]
                                    :
                                    []
                        }
                        continue;
                    };
                    user.address.push(
                        {
                            id: result[i].addressId,
                            name: result[i].addressName,
                            provinceId: result[i].provinceId,
                            wardId: result[i].wardId
                        }
                    )
                }

                if (!user) {
                    return resolve(
                        {
                            status: false,
                            message: 'No User Found!'
                        }
                    )
                }

                return resolve(
                    {
                        status: true,
                        message: "Get user detail success!",
                        data: user
                    }
                )

            })
        }).catch(err => {
            console.log("Error syntax Promise!")
            return {
                status: false,
                message: "Error!"
            }
        })
    },
    createUser: function (newUser) {
        return new Promise((resolve, reject) => {
            let queryString = `INSERT INTO users SET ?`
            mySQL.query(queryString, newUser, async (err, result) => {
                if (err) {
                    return resolve(
                        {
                            status: false,
                            message: "Lỗi truy vấn",
                        }
                    )
                }
                let insertData = await this.getUserById(result.insertId)
                return resolve(
                    {
                        status: true,
                        message: "Insert user success!",
                        data: insertData.status ? insertData.data : {}
                    }
                )
            })

        }).catch(err => {
            console.log("Error syntax Promise!")
            return {
                status: false,
                message: "Error!"
            }
        })
    },
    deleteUserById: function (userId) {
        return new Promise((resolve, reject) => {
            let queryString = `DELETE FROM users WHERE id=${userId}`
            mySQL.query(queryString, (err, result) => {
                if (err || result.affectedRows == 0) {
                    if (result.affectedRows == 0) {
                        return resolve(
                            {
                                status: false,
                                message: "userId is not exist!"
                            }
                        )
                    }
                    return resolve(
                        {
                            status: false,
                            message: err.code == "ER_ROW_IS_REFERENCED_2" ? "foreign key" : "error"
                        }
                    )
                }
                return resolve(
                    {
                        status: true,
                        message: "Delete user with id:" + userId + " success!",
                    }
                )
            })

        }).catch(err => {
            console.log("Error syntax Promise!")
            return {
                status: false,
                message: "Error!"
            }
        })
    },
    updateUserById: function (userId, updateData) {
        return new Promise((resolve, reject) => {
            let queryString = `UPDATE users
            SET name='${updateData.name}', email='${updateData.email}'
            WHERE users.id=${userId};`
            mySQL.query(queryString, (err, result) => {
                if (err) {
                    return resolve(
                        {
                            status: false,
                            message: "Error"
                        }
                    )
                }
                return resolve(
                    {
                        status: true,
                        message: "Update user with id:" + userId + " success!",
                    }
                )
            })
        }).catch(err => {
            console.log("Error syntax Promise!")
            return {
                status: false,
                message: "Error!"
            }
        })
    },
    updateFieldUserById: function (userId, patchData) {
        return new Promise((resolve, reject) => {

            let patchString = ``;

            for (let i in patchData) {
                patchString += `${i}="${patchData[i]}",`
            }
            let queryString = `UPDATE users
            SET ${patchString.substring(0, patchString.length - 1)}
            WHERE users.id=${userId};`

            mySQL.query(queryString, (err, result) => {
                if (err) {
                    return resolve(
                        {
                            status: false,
                            message: "Error"
                        }
                    )
                }
                return resolve(
                    {
                        status: true,
                        message: "Update user with id:" + userId + " success!",
                    }
                )
            })
        }).catch(err => {
            console.log("Error syntax Promise!")
            return {
                status: false,
                message: "Error!"
            }
        })
    },
}