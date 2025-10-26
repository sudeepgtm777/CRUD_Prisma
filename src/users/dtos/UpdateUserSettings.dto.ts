import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserSettingsDto {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  notificationsOn: boolean;
}
