import sequelize from '../database';
import { initUserModel, User } from '../models/user.model';
import { initTaskModel, Task } from '../models/task.model';

initUserModel(sequelize);
initTaskModel(sequelize);

// If you have associations:
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

export { User, Task};
