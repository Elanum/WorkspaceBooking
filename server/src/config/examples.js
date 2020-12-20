/* eslint-disable */
import User from '../models/users';

const admin = new User({
  username: 'admin',
  password: 'rootpwd',
  email: 'admin@root.de'
});

try {
  User.findOne({ username: admin.username })
    .then((user) => {
      if (user) {
        user.password = admin.password;
        user.email = admin.email;
        return user.save();
      }
      return admin.save();
    })
    .catch((error) => {
      console.error(error);
    });
} catch (error) {
  console.error(error);
}
