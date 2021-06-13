import { IsNotEmpty } from 'class-validator';

export class CreateBeerDto {
  @IsNotEmpty()
  uid: string;

  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  style: string;

  @IsNotEmpty()
  hop: string;

  @IsNotEmpty()
  yeast: string;

  @IsNotEmpty()
  malts: string;

  @IsNotEmpty()
  ibu: string;

  @IsNotEmpty()
  alcohol: string;

  @IsNotEmpty()
  blg: string;
}
