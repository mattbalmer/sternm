import * as express from 'express';
import { requireAuthentication, setReqDate } from '@server/middleware';
import * as mongoLayers from '@server/utils/mongo-layers';
import { LobbyModel } from '@server/schemas/lobby';
import { areMatchingIDs } from '@server/utils/mongo';
import { User } from '@shared/types';

const routes = express.Router();

routes.get('/', mongoLayers.findAll(LobbyModel));
routes.get('/:_id', mongoLayers.findOne(LobbyModel));
routes.post('/',
  requireAuthentication,
  setReqDate('created'),
  (req, res, next) => {
    const user: User = req.user as User;
    req.body.owner = user._id;
    req.body.users = [user._id];
    next();
  },
  mongoLayers.createOne(LobbyModel)
);
routes.delete('/:_id',
  requireAuthentication,
  (req, res, next) => {
    const user: User = req.user as User;
    // require lobby owner
    LobbyModel.findById(req.params._id)
      .then(lobby => {
        if (lobby && areMatchingIDs(lobby.owner, user._id)) {
          next();
        } else {
          res.status(403).send(`Only a lobby owner may delete the lobby`);
        }
      })
      .catch(err => {
        console.log('Error authorizing lobby owner', err);
        res.status(500).send(`Error authorizing lobby owner`);
      })
  },
  setReqDate('deleted'),
  mongoLayers.deleteOne(LobbyModel)
);

module.exports = routes;
export {}