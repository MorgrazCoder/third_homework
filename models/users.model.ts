import { Model,Column,DataType,Table,HasOne } from "sequelize-typescript";
import { Profile } from "./profiles.model";
import { UserRole } from "enums";
import { Token } from "./tokens.model";

interface UserCreationAttrs {
    email:string;
    password:string;
    role:string;
}



@Table({tableName:"users"})
export class User extends Model<User,UserCreationAttrs> {
    @Column({type:DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true})
    id:number;
    @Column({type:DataType.STRING,unique:true,allowNull:false})
    email:string;
    @Column({type:DataType.STRING,allowNull:false})
    password:string;
    @Column({type:DataType.ENUM,allowNull:false, values: Object.values(UserRole)})
    role:UserRole;
    @HasOne(()=>Profile,"user_id")
    user_id:Profile
    
    @HasOne(()=>Token,"user_id")
    user_ids:Token
}