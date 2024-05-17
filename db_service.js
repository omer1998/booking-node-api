// const sequelize = require("./db.js")
const sequelize = require("./db.js")
const initModels = require("./models/init-models.js")
const models = initModels(sequelize)
async function getBookingDataForDoctor() {
    var dates = []
    var visitDates = await models.doctor_user_bookings.findAll({
        // attributes : ["visit_date"]
    })
    // visitDates.
    visitDates.map((row) => dates.push(row.visit_date))
    return dates

}

// we need to create db service function to add user/patient to database
async function addUserToDatabase(userData) {
    var user = await models.users.create(userData)
    return user
}

// check if certain user is present in our database
async function checkUserInDatabase(emailAddress) {
    try {
        var user = await models.users.findOne({
            where: {
                email: emailAddress
            },
            include: {
                model: models.user_info
            }
        })
        // console.log("THIS is the user" + JSON.stringify(user))
        if (user) {
            return { checkUser: true, user: user.toJSON() }
        } else {
            return { checkUser: false, user: null }
        }
    } catch (error) {
        console.log(error)
        // return error;
    }


}

async function checkDoctorInDatabase(emailAddress) {
    try {
        const doctor = await models.doctors.findOne({
            where: {
                "email_address": emailAddress
            }
        })
        if (doctor) return { checkDoctor: true,  doctor : doctor.toJSON() }
        else return { checkDoctor: false, doctor: null }
    } catch (error) {
        console.log(`database error ${error}`)
        // return error;

        // TODO:: check how to handle this error in appropriate way

    }
}

async function addDoctorToDatabase(doctor){
    try {
    const createdDoctor = await models.doctors.create(doctor)
    return createdDoctor.toJSON()
    } catch (error) {
        console.log(error);
    }
}

async function getAllDoctorsWithInfo(){

    // refactor this in order to do pagination

    try{
        const doctors = await models.doctors.findAll({
            attributes:{
                exclude: ['password']  // to exclude password during querying
            },
            include:{
                model: models.clinics,

            }
        })
        return doctors.map(doctor => doctor.toJSON())
    }catch (error){
        console.log(error);
    }
}


async function bookDate(data){
    try {
        await models.doctor_user_bookings.create(data)
    } catch (error) {
        console.log(error);
    }
}
module.exports = { getBookingDataForDoctor,
    addUserToDatabase,
    checkUserInDatabase,
    checkDoctorInDatabase,
    addDoctorToDatabase,
    getAllDoctorsWithInfo,
    bookDate

}
