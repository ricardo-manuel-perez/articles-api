const { Kafka } = require("kafkajs");
const constants = require("../constants");

module.exports = async (topic, cb) => {
  const kafka = new Kafka({
    clientId: constants.KAFKA_MAIN_ID,
    brokers: [constants.KAFKA_MAIN_BROKER],
  });
  const consumer = kafka.consumer({ groupId: constants.KAFKA_MAIN_ID });

  await consumer.connect();
  await consumer.subscribe({ topic: topic });

  await consumer.run({
    eachMessage: ({ from, to, message }) => {
      console.log("Message consumed", message);
      cb({ from, to, message: JSON.parse(message.value.toString())});
    },
  });
};
