import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const authConstants = {
  secret: configService.get<string>('JWT_SECRET'),
};
