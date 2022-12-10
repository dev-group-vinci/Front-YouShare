export class User {

  constructor(json: JSON) {
    console.log(json)
    for (let prop in json) {
      this[prop] = json[prop];
    }
  }

    id_user: number;
    username: string;
    role: string;
    email: string;
    biography: string;
}
