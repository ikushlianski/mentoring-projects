import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignInUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches('[A-z_]+')
  username: string;

  @IsNotEmpty()
  password: string;
}
