import User from '../models/users.model';

const admin = {
  username: process.env.ADMIN_USER || 'admin',
  password: process.env.ADMIN_PWD || 'root',
};

User.findOne().then((user) => {
  if (!user) {
    const newUser = new User(admin);
    newUser.save();
  }
});
