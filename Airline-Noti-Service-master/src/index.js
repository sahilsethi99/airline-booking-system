const express = require('express');
const amqplib  = require("amqplib");
const { EmailService } = require('./services')
const {  GMAIL_RECEPEINT, GMAIL_EMAIL } = require('./config/server-config');
const { ServerConfig, RabbitMqUrl } = require('./config');
async function connectQueue() {
    try {
        const connection = await amqplib.connect(RabbitMqUrl);
        const channel = await connection.createChannel();
        await channel.assertQueue("noti-queue");
        channel.consume("noti-queue", async (data) => {
            console.log(`${Buffer.from(data.content)}`);
            const object = JSON.parse(`${Buffer.from(data.content)}`);
            // const object = JSON.parse(Buffer.from(data).toString());
            await EmailService.sendEmail("indiantechmojito@gmail.com", object.recepientEmail, object.subject, object.content);
            channel.ack(data);
        })
    } catch(error) {
        
    }
}

const apiRoutes = require('./routes');

const mailsender = require('./config/email-config');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    await connectQueue();
    console.log("queue is up")
});
