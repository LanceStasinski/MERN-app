class User {
  id: string;
  name: string;
  image: string;
  places: number;

  constructor(name: string, image: string, places: number) {
    this.name = name;
    this.id = (Math.random() * 1000000).toFixed();
    this.image = image;
    this.places = places
  }
}

export default User;