const {
  authModel: { UserModel },
} = require('../models')
const Errors = require('http-errors')

const findUserByVerifyToken = async (req, res) => {
  const { verificationToken } = req.params
  console.log(verificationToken)
  const user = await UserModel.findOne({ verificationToken })

  if (!user) {
    throw new Errors.NotFound('Not found')
  }

  await UserModel.findByIdAndUpdate(user._id, { verify: true })
  res.status(400).json({
    message: 'Verification successful',
  })
}

module.exports = { findUserByVerifyToken }
