const { Kafka } = require("kafkajs");
const constants = require("../constants");

class KafkaProducer {
  constructor() {
    try {
      const kafka = new Kafka({
        clientId: constants.KAFKA_MAIN_ID,
        brokers: [constants.KAFKA_MAIN_BROKER],
      });
      this.producer = kafka.producer();
    } catch (error) {
      throw new Error(Error);
    }
  }

  async connect() {
    try {
      await this.producer.connect();
      return this;
    } catch (error) {
      throw new Error(error);
    }
  }

  async send(topic, message) {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
module.exports = new KafkaProducer();
