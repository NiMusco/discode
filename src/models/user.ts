import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';

class User extends Model {
  public discordUserId!: string;
  public joinDate!: Date;
}

User.init({
  discordUserId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  joinDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'User',
});

export default User;
