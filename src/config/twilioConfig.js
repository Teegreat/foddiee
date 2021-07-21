import dotenv from 'dotenv'

dotenv.config()

const { TWILO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env

const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

export default { client }