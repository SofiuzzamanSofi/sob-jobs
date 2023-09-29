"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (...role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).send({ status: false, message: "You are not logged in. RECHECK AUTHORIZATION-1", });
        }
        ;
        if (!role.length) {
            return res.status(401).send({ status: false, message: "You are not logged in. RECHECK AUTHORIZATION-2", });
        }
        ;
        // match the authorization
        const userRole = req.user?.role;
        if (!role.length) {
            return res.status(401).send({ status: false, message: "You are not logged in. RECHECK AUTHORIZATION-3", });
        }
        ;
        if (!role.includes(userRole)) {
            return res.status(403).send({ status: false, message: "Not Authorized or Acces Denied", });
        }
        ;
        return next(); // send role via ...role for access 
    };
};
//# sourceMappingURL=authorization.js.map