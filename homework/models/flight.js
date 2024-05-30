const { Sequelize, DataTypes } = require("sequelize");

module.exports = class Flight extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        flight_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        airline: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        origin: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        destination: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        departure_time: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        arrival_time: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
      },
      {
        sequelize, // 추가된 sequelize 인스턴스
        modelName: "Flight", // 모델 이름
        tableName: "flights", // 테이블 이름
        timestamps: false, // 타임스탬프 필드 비활성화
      }
    );
  }
};
