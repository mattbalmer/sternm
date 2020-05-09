import { UserRole } from '@shared/types';

export function requireAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({
      message: 'Must be signed in to continue',
    });
  }
}

export function requireAdmin(req, res, next) {
  if(req.user.roles.indexOf(UserRole.ADMIN) > -1) {
    next();
  } else {
    res.status(403).json({
      message: 'Must be admin to continue',
    });
  }
}

export function requireSelfOrAdmin(getId: (req: any) => string) {
  return (req, res, next) => {
    const id = getId(req);
    if(req.user._id.toString() === id.toString() || req.user.roles.indexOf(UserRole.ADMIN) > -1) {
      next();
    } else {
      res.status(403).json({
        message: 'May not perform this action on a user other than yourself without admin privileges',
      });
    }
  }
}

export function setReqDate(date) {
  return function(req, res, next) {
    req.body[`dates.${date}`] = new Date().getTime();
    next();
  }
}

export function acceptFields(fieldString: string) {
  const allowedFields = fieldString.split(' ').filter(s => s[0] !== '-');
  const disallowedFields = fieldString.split(' ').filter(s => s[0] === '-');
  return function (req, res, next) {
    if (!allowedFields.includes('*') && allowedFields.length > 0) {
      req.body = allowedFields.reduce((fields, fieldname) => {
        return {
          ...fields,
          [fieldname]: req.body[fieldname],
        }
      }, {});
      next();
    } else if (disallowedFields.length > 0) {
      disallowedFields.forEach(fieldname => {
        delete req.body[fieldname];
      });
      next();
    }
  }
}