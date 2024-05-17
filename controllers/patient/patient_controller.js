const { getAllDoctorsWithInfo, bookDate} = require("../../db_service.js")



async function getAllDoctorsController(req, res) {
    // return res.json({msg: "here are all the doctors"})
    try {
        const doctors = await getAllDoctorsWithInfo();
        return res.json({
            msg: "here are all the doctors",
            status: true,
            doctors
        });
    } catch (err) {
        return res.json({
            msg: err.message,
            status: false
        })
    }
}

async function bookingDate(req, res) {
    const { doctor_id,
        user_id,
        visit_date,
        visit_time } = req.body;
        const body = {doctor_id,
            user_id,
            visit_date,
            visit_time}
        try {
            await bookDate(body);
            return res.status(200).json({
                status: true,
                msg: "Booking date successfully"
            });

        } catch (error) {
            return res.status(400).json({
                status:false,
                msg: error.message
            })
        }

    }
    module.exports = { getAllDoctorsController, bookingDate }
