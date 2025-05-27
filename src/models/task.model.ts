import {
    DataTypes,
    Model,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from 'sequelize';
  
  export class Task extends Model<
    InferAttributes<Task>,
    InferCreationAttributes<Task>
  > {
    declare id: CreationOptional<string>;
    declare title: string;
    declare description?: string;
    declare status: 'pending' | 'in-progress' | 'completed';
    declare userId: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
  }
  
  export function initTaskModel(sequelize: Sequelize) {
    Task.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        status: {
          type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
          defaultValue: 'pending',
        },
        userId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'tasks',
        timestamps: true,
        underscored: true,
      }
    );
  }
  