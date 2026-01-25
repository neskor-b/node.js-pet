import {
  Model,
  type BelongsToGetAssociationMixin,
  type BelongsToSetAssociationMixin,
  type BelongsToCreateAssociationMixin,
  type HasManyGetAssociationsMixin,
  type HasManyCountAssociationsMixin,
  type HasManyHasAssociationsMixin,
  type HasManySetAssociationsMixin,
  type HasManyAddAssociationsMixin,
  type HasManyRemoveAssociationsMixin,
  type HasManyHasAssociationMixin,
  type HasManyAddAssociationMixin,
  type HasManyRemoveAssociationMixin,
  type HasManyCreateAssociationMixin,
} from "sequelize";

// Helper type to add postfix to property names
type PostfixProperties<PropTypes, Postfix extends string> = {
  [P in keyof PropTypes as `${Exclude<P, symbol>}${Postfix}`]: PropTypes[P];
};

// Helper type to prettify intersection types in IDE
type Prettify<T> = { [P in keyof T]: T[P] };

// Mixin type for belongsTo associations
export type BelongsToMixin<
  AssociatedModel extends Model,
  PrimaryKeyType,
  Name extends string,
> = PostfixProperties<
  {
    get: BelongsToGetAssociationMixin<AssociatedModel>;
    set: BelongsToSetAssociationMixin<AssociatedModel, PrimaryKeyType>;
    create: BelongsToCreateAssociationMixin<AssociatedModel>;
  },
  Capitalize<Name>
>;

// Helper type to extract creation attributes and exclude foreign keys
type CreateAssociationMixin<
  AssociatedModel extends Model,
  ExcludeFromCreate extends string = never,
> =
  AssociatedModel extends Model<infer Attributes, infer CreationAttributes>
    ? (
        attributes: Omit<CreationAttributes, ExcludeFromCreate>
      ) => Promise<AssociatedModel>
    : HasManyCreateAssociationMixin<AssociatedModel>;

// Mixin type for hasMany associations
export type HasManyMixin<
  AssociatedModel extends Model,
  PrimaryKeyType,
  SingularName extends string,
  PluralName extends string,
  ExcludeFromCreate extends string = never,
> = Prettify<
  PostfixProperties<
    {
      get: HasManyGetAssociationsMixin<AssociatedModel>;
      count: HasManyCountAssociationsMixin;
      has: HasManyHasAssociationsMixin<AssociatedModel, PrimaryKeyType>;
      set: HasManySetAssociationsMixin<AssociatedModel, PrimaryKeyType>;
      add: HasManyAddAssociationsMixin<AssociatedModel, PrimaryKeyType>;
      remove: HasManyRemoveAssociationsMixin<AssociatedModel, PrimaryKeyType>;
    },
    Capitalize<PluralName>
  > &
    PostfixProperties<
      {
        has: HasManyHasAssociationMixin<AssociatedModel, PrimaryKeyType>;
        add: HasManyAddAssociationMixin<AssociatedModel, PrimaryKeyType>;
        remove: HasManyRemoveAssociationMixin<AssociatedModel, PrimaryKeyType>;
        create: CreateAssociationMixin<AssociatedModel, ExcludeFromCreate>;
      },
      Capitalize<SingularName>
    >
>;
