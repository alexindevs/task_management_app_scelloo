import {
    DataTypes,
    Model,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from 'sequelize';
  
  export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
  > {
    declare id: CreationOptional<string>;
    declare email: string;
    declare password: string;
    declare role: 'user' | 'admin';
  }
  
  export function initUserModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM('user', 'admin'),
          defaultValue: 'user',
        },
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: true,
      }
    );
  }
  