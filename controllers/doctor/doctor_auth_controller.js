const { StatusCodes } = require("http-status-codes")
const { addDoctorToDatabase, checkDoctorInDatabase } = require("../../db_service")
const bcyptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const doctorSignUp = async (req, res) => {
    const { first_name,
        last_name,
        phone,
        password,
        email_address,
        image_profile_url
    } = req.body
    const hashedPassword = await bcyptjs.hash(password, 10)
    const doctorInfo = {
        first_name,
        last_name,
        phone,
        password: hashedPassword,
        email_address: email_address.toLowerCase() ,
        image_profile_url
    }
    try {
        const { checkDoctor } = checkDoctorInDatabase(email_address)
        if (checkDoctor) {
            return res.status(StatusCodes.OK).json({
                status: true,
                msg: "You've alread registered"
            })
        }
        const createdDoctor = await addDoctorToDatabase(doctorInfo);
        if (createdDoctor) return res.status(StatusCodes.OK).json({
            status: true,
            msg: "Your account is created successfully, Log in now !!",
            doctor: createdDoctor
        })
        else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: false,
                msg: "something went wrong"
            })
        }
    } catch (error) {
        res.status(error.code).json({
            status: false,
            msg: error.message
        })
    }




}

async function doctorSingIn(req, res) {
    const {
        email_address,
        password
    } = req.body;

    const {checkDoctor , doctor} =  await checkDoctorInDatabase(email_address.toLowerCase())
    if (checkDoctor){
        // parsing json doctor to object
        // const doctorObj = JSON.parse(doctor)
        const token = jwt.sign(doctor, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })
        checkPassword = await bcyptjs.compare(password, doctor.password); //checking password
        if (checkPassword){
            return res.status(StatusCodes.OK).json({
                status: true,
                msg: "You've logged in successfully",
                doctor: doctor,
                token
            })
        }else{
            return res.status(StatusCodes.OK).json({
                status: false,
                msg: "your password is wrong",

            })
        }
    }else{
        return res.status(StatusCodes.OK).json({
            status: false,
            msg: "you don't have an account, or you intered wrong email address ",

        })
    }

}


module.exports = { doctorSignUp, doctorSingIn };
