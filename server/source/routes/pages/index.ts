import * as express from 'express';
import { User, UserRole } from '../../types';

const routes = express.Router();

routes.get('/admin*', (req, res, next) => {
  const isRequestForHTML = [
    'text/html',
    'application/xhtml+xml',
    'application/xml',
  ].some(str => req.headers.accept.includes(str));

  // @ts-ignore
  const user: User = req.user;
  const isAdmin = user?.roles?.indexOf(UserRole.ADMIN) > -1;

  if (isRequestForHTML) {
    if (isAdmin) {
      res.render('admin', {
        __STATE__: {
          users: user ? {
            users: {
              [user._id]: user,
            },
            myId: user._id,
            isLoggedIn: true,
            isAdmin: user && user.roles && user.roles.indexOf(UserRole.ADMIN) > -1,
          } : {},
        },
      });
    } else {
      res.redirect('/');
    }
  } else {
    if (isAdmin) {
      next();
    } else {
      res.status(403).send();
    }
  }
});

routes.get('*', (req, res, next) => {
  const isRequestForHTML = [
    'text/html',
    'application/xhtml+xml',
    'application/xml',
  ].some(str => req.headers.accept.includes(str));

  if (isRequestForHTML) {
    // @ts-ignore
    const user: User = req.user;
    res.render('main', {
      __STATE__: {
        users: user ? {
          users: {
            [user._id]: user,
          },
          myId: user._id,
          isLoggedIn: true,
          isAdmin: user?.roles?.indexOf(UserRole.ADMIN) > -1,
        } : {},
      },
    });
  } else {
    next();
  }
});

module.exports = routes;
export {}