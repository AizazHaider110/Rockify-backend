import { IsArray, IsDateString, IsMilitaryTime,ArrayNotEmpty,IsOptional, IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateSongDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({},{ each: true })
    readonly artists: string[];

    @IsNotEmpty()
    @IsDateString()
    readonly releasedDate: Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    readonly duration: Date;

    @IsString()
    @IsOptional()
    readonly lyrics: string;


}