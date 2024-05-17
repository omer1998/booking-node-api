
// this file is for me to interact with database using sequelize
const sequelize = require("./db.js")
const initModels = require('../websocket/models/init-models');
const availableTimeslot = require("./models/available_time_slots.js")
const models = initModels(sequelize);

// const createDocPatModel = async () => await models.doctor_user_bookings.sync({ force: true})

// createDocPatModel();

const makeQuery = async () => {
    // await models.doctor_user_bookings.sync({force: true})
    await models.clinics.sync({falter: true})

    // const user1 = await models.users.findOne({
    //     where:{
    //         id: 5
    //     },
    //     include:{
    //         model: models.user_info
    //     }
    // })
    // const doctor = await models.doctors.findOne({
    //     where:{
    //         id:6
    //     },
    //     attributes: {
    //         exclude: ['password']
    //     },
    //     include:{
    //         model: models.clinics,
    //         // exclude: ['clinic_name', 'clinic_phone']
    //     }
    // })

    // const doctors = await models.doctors.findAll({
    //     attributes: {
    //         exclude: ['password']
    //     },
    //     include: models.clinics
    //     // include:{
    //     //     model: models.clinics,
    //     //     exclude: ['clinic_name', 'clinic_phone']
    //     // }
    // })
    // console.log(doctors.map(doctor => doctor.toJSON()))

    // const clinic = await models.clinics.findOne({
    //     where: {
    //         id:1
    //     }
    // })
    // console.log(doctor.toJSON())

     // var doctor = await models.doctors.findOne({
    //     where: {
    //         "id": 1
    //     },
    //     // include: {
    //     //     model: models.users
    //     // }
    // })
    // console.log(await doctor.getUsers())
    // //
    // const user3 = await models.users.findOne({
    //     where: {
    //         "id": 3
    //     }
    // })

    // console.log(user3.toJSON())


    // await doctor.addUsers(user2, {
    //     through: {
    //         "visit_date": "2023-08-25",
    //         "visit_time": "4:36:25"
    //     }
    // })

    // await doctor.removeUsers(user2)


    // console.log( doctor.toJSON())



}

makeQuery()
