import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../util/database';

// Інтерфейс для атрибутів Product
interface ProductAttributes {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
}

// Для створення нового продукту id є опціональним (auto-increment)
interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

// Клас моделі Product
class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public title!: string;
  public price!: number;
  public imageUrl!: string;
  public description!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'product',
  }
);

export default Product;
