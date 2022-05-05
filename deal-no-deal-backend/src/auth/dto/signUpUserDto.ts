import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsNotEmpty()
  password: string;
}
