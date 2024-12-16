import express from "express";
import homeController from "../controllers/homeController";
import usercontroller from "../controllers/usercontroller";
import doctorController from "../controllers/doctorController";
let router = express.Router();

let initWebRouters = (app) => {
    router.get('/', homeController.getHomepage);

    router.post('/api/login', usercontroller.handleLogin)


    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGETCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/create-new-user', usercontroller.handleCreateNewUser)
    router.get('/api/get-all-user', usercontroller.handleGetAllUser);
    router.put('/api/edit-user', usercontroller.handleEditUser);
    router.delete('/api/delete-user', usercontroller.handleDeleteUser);

    router.get('/api/allcode', usercontroller.getAllcode);
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    return app.use("/", router);
}

module.exports = initWebRouters