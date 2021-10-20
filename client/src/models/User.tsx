class User {
  id: string;
  name: string;
  image: string;
  places: number;

  constructor(name: string, image: string, places: number) {
    this.name = name;
    this.id = 'u1';
    this.image = image;
    this.places = places
  }
}

export default User;