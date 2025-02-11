import { Controller, Delete, Get, Post, Put, HttpException,Inject, HttpStatus, Param, ParseIntPipe, Body, Scope, DefaultValuePipe, Query, UseGuards, Request } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { Song } from './song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDto } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArtistJWTGuard } from 'src/auth/artist-jwt-guard';

@Controller('songs')
export class SongsController {
    constructor(private readonly songsService: SongsService)
        {
        console.log('SongsController created');
    }
@Post()
@UseGuards(ArtistJWTGuard)
create(@Body() createSongDto: CreateSongDto, @Request() request,): Promise<Song>  {
    console.log('request.user: ',request.user)
    return this.songsService.create(createSongDto);
    
}
//
@Get()
findAll(
@Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number = 1,
@Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10,
):  Promise < Pagination < Song >> {
    limit = limit > 100 ? 100 : limit;
    return this.songsService.paginate({
      page,
      limit,
    });
    }
    
@Get(':id')
findOne(
    @Param('id', 
        new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
): Promise<Song> {
    return this.songsService.findOne(id);
}
@Put(':id')
update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDTO: UpdateSongDto,
): Promise<UpdateResult> {
    return this.songsService.update(id, updateSongDTO);
}
@Delete(':id')
delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.songsService.remove(id);   
}
}
