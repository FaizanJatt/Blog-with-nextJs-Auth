import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  image: {
    type: String,
    default:
      "https://www.pokemoncenter.com/products/images/P7730/701-29235/P7730_701-29235_01_full.jpg",
  },
});

const Users = models.Users || model("Users", UserSchema);

export default Users;
