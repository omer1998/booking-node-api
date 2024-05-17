const express = require("express")
const patientRouter = express.Router()
// middlewares
const patientAuthMiddleware = require("../middlewares/patient_auth")

// controllers
const {getAllDoctorsController, bookingDate} = require("../controllers/patient/patient_controller");



patientRouter.route("/all-doctors").get(getAllDoctorsController)
// we add this middleware in order to protect this route from unauthenticated patients
// get(patientAuthMiddleware,getAllDoctorsController)
// now i remove it for convinience but ultimately i will add it to protect this route

patientRouter.route("/booking-date").post(bookingDate)
module.exports = patientRouter;
