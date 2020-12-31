import Room from '../models/rooms.model';
import Workspaces from '../models/workspaces.model';

const addWorkspaces = () => {
  Room.find().then((rooms) => {
    if (rooms.length > 0) {
      let i = 1;
      Workspaces.find().then((workspaces) => {
        if (workspaces.length === 0) {
          rooms.forEach((room) => {
            for (let x = 0; x < 5; x += 1) {
              const newWorkspace = new Workspaces({
                room: room._id,
                name: `Workspace ${(i += 1)}`,
              });
              newWorkspace.save();
            }
          });
        }
      });
    }
  });
};

export default addWorkspaces;
