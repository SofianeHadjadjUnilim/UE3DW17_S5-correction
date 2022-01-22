import { ObjectId } from 'mongodb';
import { Entity, Column, ObjectIdColumn, EntityRepository, Repository } from 'typeorm';

@Entity()
export class Users {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  public email: string;
 
  @Column()
  public password: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updatedAt: Date;
}

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {}