export class Caroussel{
  title: string;
  image: string;
  description: string;

  constructor(image: string, title: string, desc: string) {
    this.title = title;
    this.description = desc;
    this.image = image;
  }
}
