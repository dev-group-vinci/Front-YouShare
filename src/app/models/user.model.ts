export class User {

  constructor(json: JSON) {
    for (let prop in json) {
      this[prop] = json[prop];
    }
    if(this.picture == undefined){
      this.picture = "../../assets/images/default_user.png"
    }
  }
    id_user: number;
    picture: string;
    username: string;
    role: string;
    email: string;
    biography: string;
    status: string;
}
