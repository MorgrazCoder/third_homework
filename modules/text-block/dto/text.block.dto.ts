import { IsNotEmpty, IsString} from 'class-validator';

export class TextBlockDto {
    @IsNotEmpty()
    @IsString()
    public readonly block_uniqal_query: string;
    @IsNotEmpty()
    @IsString() 
    public readonly block_name: string;
    @IsNotEmpty()
    @IsString() 
    public readonly block_text: string;
    @IsNotEmpty()
    @IsString() 
    public readonly block_group: string;
}