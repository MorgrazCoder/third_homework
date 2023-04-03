import { IsEnum, IsNotEmpty, IsNumber, IsString} from 'class-validator';
import { EssenceTable } from 'enums/essence-table.enum';

export class FileNewDto {
    constructor(file_name:string,file_path:string,file_buffer:Buffer,essence_id:number,essence_table:EssenceTable){
        this.file_name = file_name;
        this.file_path = file_path;
        this.file_buffer = file_buffer;
        this.essence_id = essence_id;
        this.essence_table = essence_table;
    }
    @IsNotEmpty()
    @IsString()
    public readonly file_name: string;
    @IsNotEmpty()
    @IsString()
    public readonly file_path: string;
    @IsNotEmpty()
    public readonly file_buffer: Buffer;
    @IsNotEmpty()
    @IsNumber()
    public readonly essence_id: number;
    @IsString() 
    @IsEnum(EssenceTable)
    public readonly essence_table: EssenceTable;
}