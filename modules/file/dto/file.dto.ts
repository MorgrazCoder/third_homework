import { IsEnum, IsNotEmpty, IsString} from 'class-validator';
import { EssenceTable } from 'enums/essence-table.enum';

export class FileDto {
    constructor(essence_id:string,essence_table:EssenceTable){
        this.essence_id = essence_id;
        this.essence_table = essence_table;
    }
    @IsNotEmpty()
    @IsString()
    public readonly essence_id: string;
    @IsString() 
    @IsEnum(EssenceTable)
    public readonly essence_table: EssenceTable;
}