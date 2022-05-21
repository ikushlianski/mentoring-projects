import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignUpUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches('[A-z_]+')
  username: string;

  @IsNotEmpty()
  password: string;
}
