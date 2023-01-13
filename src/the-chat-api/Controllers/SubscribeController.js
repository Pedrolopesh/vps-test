const User = require("../database/models/User");
const webpush = require('web-push');
const Subscribe = require("../database/models/Subscribe");
require('dotenv').config()


const publicVapidKey = process.env.THE_CHAT_PUBLIC_KEY_WEBPUSH;
const privateVapidKey = process.env.THE_CHAT_PRIVATE_KEY;

webpush.setVapidDetails('mailto:test@code.co.uk', publicVapidKey || '', privateVapidKey || '' )

module.exports = {
    async subscribewebpush(req, res) {

        const { subscribeData, user_id } = req.body;
        const newSubscription = new Subscribe({
            credentials: JSON.stringify(subscribeData),
            user: user_id,
            active: true
        })
        newSubscription.save();

        const user = await User.findByIdAndUpdate(user_id, {
            $push: {
                subscription: newSubscription._id
            }
        }).catch(err => { console.log(err); res.send({ success: false, error: 'error on update user', data: err }) })

        if(user) { console.log(user) }
        const payload = 'Registrado para receber notificações.'
        webpush.sendNotification(subscribeData, payload).catch((err) => console.log(err))
        res.status(200).send({ sucess: true, message: 'subscription created in user'})
    },

    async sendNotification(req, res) {
        const { user_id } = req.body

        const user = await User.findById({ _id: user_id})
        .catch(err => { console.log(err); return res.send({ success: false, error: "can't find user", data: err }) })

        if(!user) { console.log(user); return res.send({ success: false, error: "can't find user", data: err }) }

        const subscription = await Subscribe.findById({_id: user.subscription[0]}).catch(err => { console.log(err); return res.send({ success: false, error: "can't find user", data: err }) })

        if(!subscription) { console.log(subscription); return res.send({ success: false, error: "can't find subscription", data: err }) }

        // const credentials = JSON.parse(user.subscribe)
        const credentials = await subscription.credentials
        const payload = 'TESTE DE ENVIO DE MENSAGEM'

        console.log('credentials', JSON.parse(credentials) )

        await webpush.sendNotification(JSON.parse(credentials), payload)
        .then(resp => { console.log('NOTIFICAÇÂO', resp) })
        .catch(err => { console.log('error', err) })
        res.status(200).send({ sucess: true, message: 'Notification sended...'})
    }
}