import User from '../models/users.model';

const users = [
  {
    username: process.env.ADMIN_USER || 'admin',
    password: process.env.ADMIN_PWD || 'rootpwd',
    email: process.env.ADMIN_MAIL || 'admin@workspace-booking.de',
  },
  {
    username: 's80133',
    password: '123456',
    email: 's80133@beuth-hochschule.de',
  },
  {
    username: 'elanum',
    password: 'github',
    email: 'mail@elanum.de',
  },
];

User.findOne().then((user) => {
  if (!user) {
    users.forEach((element) => {
      const newUser = new User(element);
      newUser.save();
    });
  }
});
