const AffectationController = require('../controllers/affectation.controller');
 

//3) importing authenticate methods
const { authenticate } = require('../config/jwt.config');

//4) importing verifyRole methods
const { verifyRole } = require('../config/jwt.config');



module.exports = app => {
    app.get('/api/affectations',authenticate, verifyRole(["admin"]), AffectationController.findAllAffectations);  
    app.get('/api/affectations/:id',authenticate, verifyRole(["admin"]), AffectationController.findOneSingleAffectation);
    app.patch('/api/affectations/:id',authenticate, verifyRole(["admin"]),  AffectationController.updateExistingAffectation); 
    app.post('/api/affectations',authenticate, verifyRole(["admin"]), AffectationController.createNewAffectation);
    app.delete('/api/affectations/:id',authenticate, verifyRole(["admin"]),  AffectationController.deleteAnExistingAffectation);
}    