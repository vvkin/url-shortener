import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '@database/index';
import { UrlDto } from '@src/shared/dto/url.dto';

export interface UrlAttributes {
  shortUrl: string;
  longUrl: string;
  expiresAt: Date;
}

type UrlCreationAttributes = Optional<UrlAttributes, 'expiresAt'>;

class UrlModel
  extends Model<UrlAttributes, UrlCreationAttributes>
  implements UrlDto
{
  public shortUrl!: string;
  public longUrl!: string;
  public readonly createdAt!: Date;
  public readonly expiresAt!: Date;
}

UrlModel.init(
  {
    shortUrl: {
      type: DataTypes.STRING(16),
      primaryKey: true,
    },
    longUrl: {
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
    sequelize,
    timestamps: true,
    updatedAt: false,
  }
);

export { UrlModel };
