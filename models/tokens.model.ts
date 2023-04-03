import { Model,Column,DataType,Table,ForeignKey,BelongsTo } from "sequelize-typescript";
import { User } from "./users.model";


interface TokenCreationAttrs {
    user_id:number;
    refresh_token:string;
}



@Table({tableName:"tokens"})
export class Token extends Model<Token,TokenCreationAttrs> {
    @Column({type:DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true})
    id:number;
    @Column({type:DataType.STRING,allowNull:false,unique:true})
    refresh_token:string;

    @ForeignKey(()=>User)
    @Column({type:DataType.INTEGER,unique:true})
    user_id:number;
    @BelongsTo(()=>User,{onDelete: "CASCADE",foreignKey:"user_id"})
    userId:User;

    
}