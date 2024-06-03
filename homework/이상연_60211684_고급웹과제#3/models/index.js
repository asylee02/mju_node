const Sequelize = require("sequelize");
const process = require("process");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// sequelize.options.logging = console.log;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 모델 불러오기
const Flight = require("./flight");
const Ticket = require("./ticket");

// 모델 초기화
db.Flight = Flight.init(sequelize); // sequelize 인스턴스를 전달하여 모델 초기화
db.Ticket = Ticket.init(sequelize); // sequelize 인스턴스를 전달하여 모델 초기화

// 관계 설정
db.Flight.hasMany(db.Ticket, { foreignKey: "flight_id" });
db.Ticket.belongsTo(db.Flight, { foreignKey: "flight_id" });

module.exports = db;
