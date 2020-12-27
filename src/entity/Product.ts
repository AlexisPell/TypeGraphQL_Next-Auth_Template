import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

// Entity > Column > Postgres
// ObjectType > Field > GraphQL
// ObjType is to include Fileds as obj to Schema as type

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;
}
