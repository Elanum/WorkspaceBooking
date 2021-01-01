import Room from '../models/rooms.model';
import Workspaces from '../models/workspaces.model';

const addWorkspaces = () => {
  Room.find().then((rooms) => {
    if (rooms.length > 0) {
      Workspaces.find().then((workspaces) => {
        if (workspaces.length === 0) {
          rooms.forEach((room) => {
            for (let i = 0; i < 5; i += 1) {
              const newWorkspace = new Workspaces({
                room: room._id,
                name: `Workspace ${room.name
                  .split(' ')
                  .splice(-1)}.${(i += 1)}`,
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
