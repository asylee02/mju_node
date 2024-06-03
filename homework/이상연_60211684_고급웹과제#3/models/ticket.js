const { Sequelize, DataTypes } = require("sequelize");

module.exports = class Ticket extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        ticket_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        flight_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "flights", // 참조하는 모델 (소문자로 변경)
            key: "flight_id", // 참조하는 모델의 키
          },
        },
        passenger_name: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        seat_number: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize, // 추가된 sequelize 인스턴스
        modelName: "flight", // 모델 이름
        tableName: "tickets", // 테이블 이름
        timestamps: false, // 타임스탬프 필드 비활성화
      }
    );
  }
};
