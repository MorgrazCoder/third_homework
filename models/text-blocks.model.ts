import { Model,Column,DataType,Table,ForeignKey,BelongsTo, HasMany } from "sequelize-typescript";
import { File } from "./files.model";

interface TextBlockCreationAttrs {
    block_uniqal_query:string;
    block_name:string;
    block_text:string;
    block_group:string;
}

@Table({tableName:"textblocks"})
export class TextBlock extends Model<TextBlock,TextBlockCreationAttrs> {
    @Column({type:DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true})
    id:number;
    @Column({type:DataType.STRING,allowNull:false})
    block_uniqal_query:string;
    @Column({type:DataType.STRING,allowNull:false})
    block_name:string;
    @Column({type:DataType.STRING,allowNull:false})
    block_text:string;
    @Column({type:DataType.STRING,allowNull:false})
    block_group:string;

    @HasMany(()=>File,"essence_id")
    file:File[];

}

