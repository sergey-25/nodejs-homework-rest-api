const sgMail = require('@sendgrid/mail')
require('dotenv').config()
const { SG_KEY } = process.env

sgMail.setApiKey(SG_KEY)

const msg = ({ email, token }) => {
  const message = {
    to: email,
    from: 'sergey25111988@gmail.com',
    subject: 'verify',
    text: 'and easy to do anywhere, even with Node.js',
    html: `<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
    Debitis unde quos quas voluptate voluptatem tempora dolores deleniti
    a culpa fuga, ipsam odit minus porro neque distinctio iste optio. Obcaecati, natus.</p>
    <p>verify your accout. Your token ${token}</p>`,
  }

  sgMail
    .send(message)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}

module.exports = msg
