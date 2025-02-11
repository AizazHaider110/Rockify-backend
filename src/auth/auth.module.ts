import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/user.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { JwtStrategy } from './jwt-strategy';
import { ArtistsModule } from 'src/artists/artists.module';
import { ApiKeyStrategy } from './api-key-strategy';

@Module({
    imports: [UsersModule, JwtModule.register({ 
        secret: authConstants.secret,
         signOptions: {
             expiresIn: '1d' 
         },
         }),
         ArtistsModule,
        ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, ApiKeyStrategy],
    exports: [AuthService]
    })

export class AuthModule {}    