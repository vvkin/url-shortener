import {
  Model,
  DataTypes,
  ValidationError,
  UniqueConstraintError,
} from 'sequelize';
import { sequelize } from '@database/index';
import { UrlDto } from '@shared/dto/url.dto';

export type UrlAttributes = Omit<UrlDto, 'createdAt'>;
export type UrlCreationAttributes = UrlAttributes;

class UrlModel
  extends Model<UrlAttributes, UrlCreationAttributes>
  implements UrlDto
{
  public alias!: string;
  public url!: string;
  public readonly createdAt!: Date;
  public readonly expiresAt!: Date;

  public async tryToSave(): Promise<UrlDto | null> {
    try {
      const record = await this.save();
      return record as UrlDto;
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return null;
      } else throw err;
    }
  }
}

UrlModel.init(
  {
    alias: {
      type: DataTypes.STRING(16),
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING(2048),
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'urls',
    updatedAt: false,
    sequelize,
  }
);

export { UrlModel };
