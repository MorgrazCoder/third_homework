import { Model,Column,DataType,Table,ForeignKey,BelongsTo } from "sequelize-typescript";
import { User } from "./users.model";

interface ProfileCreationAttrs {
    user_id:number;
    first_name:string;
    last_name:string;
    phone_number:string;
}

@Table({tableName:"profiles"})
export class Profile extends Model<Profile,ProfileCreationAttrs> {
    @Column({type:DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true})
    id:number;
    @Column({type:DataType.STRING,allowNull:false})
    first_name:string;
    @Column({type:DataType.STRING,allowNull:false})
    last_name:string;
    @Column({type:DataType.STRING,allowNull:false})
    phone_number:string;

    @ForeignKey(()=>User)
    @Column({type:DataType.INTEGER,unique:true})
    user_id:number;
    @BelongsTo(()=>User,{onDelete: "CASCADE",foreignKey:"user_id"})
    userId:User;
    
}

