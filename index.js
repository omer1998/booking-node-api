const http = require("http")
const express = require("express")
const server = http.createServer()
const io = require("socket.io")(server)
const sequelize = require("./db.js")
const getBookingDataForDoctor = require("./db_service.js")
var DataTypes = require("sequelize").DataTypes;
// const doctor_user_bookings = require("./models/doctor_user_bookings.js")(sequelize, DataTypes);

const user = require("./models/users.js")
const initModels = require("./models/init-models.js")

const userinfo = require("./models/user_info.js")(sequelize, DataTypes)
const models = initModels(sequelize)
// routers
const patientAuthRouter = require("./routes/patient_auth_router.js")
const dpctorAuthRouter = require("./routes/doctor_auth_router.js")
const patientRouter = require("./routes/patient_router.js")
// middleware
const errorHnadlerMiddleware = require("./middlewares/error_handler_middleware.js")
const notFound = require("./middlewares/not_found.js")
const doctorAuthRouter = require("./routes/doctor_auth_router.js")
const patientAuthMiddleware = require("./middlewares/patient_auth.js")
// const
const app = express()
const port = process.env.PORT || 3000;

// websocket server configuration

// io.on('connection', async (socket) => {
//     console.log(`a user connected: ${socket.id}`);
//     socket.emit("booking-dates", await getBookingDataForDoctor())
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
//     // socket.emit("booking-dates", "omer faris")
// });
app.use(express.json())
app.use(patientAuthRouter);
app.use("/api/doctor", doctorAuthRouter) // i think this is better than the above one
app.use("/api/patient", patientRouter)

app.get("/", (req, res)=>{
    console.log("hello world")
    return res.status(200).json({
        "status": true,
        "msg": "hello world"
    })
})

// on the end of our routes
// add not found middleware: to handle wituation when i request a non defined route
app.use(notFound)
// add custom error handler middleware
app.use(errorHnadlerMiddleware);


app.listen(
    port, () => console.log(`server is listenning on port ${port}.....`)
)
// create async function to test connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // await models.user_info.create({
        //     age: 35,
        //     sex: "male",
        //     user_id: 1
        // })
        // await models.users.destroy({
        //     where: {
        //         id: 2
        //     }
        // })
        // models.user_info.findAll({
        //     where: {
        //         user_id: 2
        //     }
        // }).then((models)=>models.map((model) => model.destroy()))

        // await models.users.sync({force:true})
        // await models.user_info.sync({force: true})
         // after adding relationship you have to sync and add alter: true
        // await userinfo.sync({force:true})
        // await userinfo.drop()


        // await user.sync()
        // await models.users.sync({force : true}); // to create this model as a table in database
        // await sequelize.sync({ force: true });
        // await models.doctors.create({
        //     first_name: "omer",
        //     last_name: "faris",
        //     phone: "07710210244",
        //     email_address: "omerfaris22@gmail.com",
        //     password: "omerf999"
        // })
        // models.doctors.findOne({
        //     where : {
        //         email_address: "omerfaris22@gmail.com"
        //     }
        // }).then((data)=> console.log(data))


        // await models.users.create({

        //     first_name: "ahmed",
        //     last_name: "sowmya",
        //     email: "omer@nfnfn.com",
        //     password: "omerf999",
        // })
        // var doctor = await models.doctors.findOne({
        //     where: {
        //         email_address: "omerfaris22@gmail.com"
        //     }
        // })
        // console.log(`doctor: ${doctor instanceof models.doctors}`);

        // console.log(`doctor: ${ doctor.toJSON()}`);
        // console.log(JSON.stringify(doctor));
        // uppdate this doctor

        // var newDoctor =  models.doctors.update(
        //     {
        //         last_name: "nawar"
        //     },
        //     {
        //         where: {
        //             email_address: "omerfaris22@gmail.com"
        //         }
        //     }
        // )
        // await doctor.update({
        //     practising_from : new Date()
        // })
        // console.log(JSON.stringify(doctor));
        // console.log(JSON.stringify(newDoctor));



    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
testConnection()
// async function logBookingData() {
//     try {
//       const bookingDates = await getBookingDataForDoctor();
//       console.log(bookingDates);
//     } catch (error) {
//       console.error("Error retrieving booking data:", error);
//     }
//   }
//   logBookingData()
// dates.forEach(element => {
//     console.log(element)
// })

// const bookingDates = ()=>  doctor_user_bookings.findAll().then((rows)=>{
//     console.log(rows.map((row)=>row.visit_date))
// })
// bookingDates()
// // console.log(bookingDates())
// models.doctors.findAll().then((rows)=>{
//     rows.map((row)=>console.log(row.first_name))
// })

