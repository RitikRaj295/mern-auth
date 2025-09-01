import pool from "../config/postgres.js";

export const getUserData = async (req, res) => {

 
  try {

    const userId = req.user.id;
    console.log("userid from usercontroller function :",userId);


    const result = await pool.query("SELECT * FROM users WHERE id=$1", [
      userId,
    ]);

    if (result.rows.length === 0) {
     return  res.json({ success: false, message: "User not found!" });
    }

    const user = result.rows[0];

    return res.json({
      success: true,
      userData: {
        name: user.name,
        isAccountVerified: user.isaccountverified,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
