import { Model,Column,DataType,Table,ForeignKey,BelongsTo } from "sequelize-typescript";
import { TextBlock } from "./text-blocks.model";
import { EssenceTable } from "enums/essence-table.enum";

interface FileCreationAttrs {
    file_name:string;
    file_path:string;
    essence_table:EssenceTable;
    essence_id:number;
}

@Table({tableName:"files"})
export class File extends Model<File,FileCreationAttrs> {
    @Column({type:DataType.INTEGER,unique:true,autoIncrement:true,primaryKey:true})
    id:number;
    @Column({type:DataType.STRING,allowNull:false,unique:true})
    file_name:string;
    @Column({type:DataType.STRING,allowNull:false,unique:true})
    file_path:string;
    @Column({type:DataType.ENUM, values: Object.values(EssenceTable)})
    essence_table:EssenceTable;
    @ForeignKey(()=>TextBlock)
    @Column({type:DataType.INTEGER})
    essence_id:number;
    @BelongsTo(()=>TextBlock,{onDelete: "SET NULL",foreignKey:"essence_id"})
    essenceId:TextBlock;
    
}

