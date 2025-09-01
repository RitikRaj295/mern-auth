import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/postgres.js";
import transporter from "../config/nodemailer.js";
import dotenv from "dotenv";
import {VERIFY_EMAIL_TEMPLATE,EMAIL_VERIFIED,PASSWORD_RESET_OTP} from'../config/emailTemplate.js'





dotenv.config();

//Register Controller Function

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }


  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (Name, Email, Password)
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO NOTHING
       RETURNING *`,
      [name, email, hashedPassword]
    );

    if (result.rows.length === 0) {
      res.clearCookie("token");
      return res
        .status(404)
        .json({ success: false, message: "Email already exists" });
    }
    const user = result.rows[0];

    // creating token

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

   res.cookie("token",token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
     
    });


    const mailOptions = {
      from: process.env.SMPT_USER,
      to: email,
      subject: "Welcome to Authentication Project!",
      text: `Welcome to Authentication System Website, Your account has been created sucessfully with email ${email}`,
      
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
      } else {
      }
    });

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Login Controller Function

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email or Password are missing!",
    });
  }

  try {
    const result = await pool.query("select * from users where email=$1", [
      email,
    ]);

    if (result.rows.length === 0) {
      res.clearCookie("token");
       return res.json({
        success: false,
        message: "User doesn't exist in Database",
      });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect Password!" });
    }

    //if password and email is correct then create token and send it to cookie

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    //   console.log(
    //   "🍪 Setting cookie with token:",
    //   token.substring(0, 20) + "..."
    // );


    res.cookie("token",token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
     
    });



    // console.log("🍪 Cookie should be set now");

    return res
      .status(201)
      .json({ success: true, message: "Loggin Sucessfull!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Logout Controller Function
// remember that whenever we use clearCookie then only takes two parameter first the name and another the same setting paramseter  again paramter should be same as the defined one.

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logout Successfully!" });
  } catch (error) {
    return res.json({ success: true, message: error.message });
  }
};

//controller function for the SENDVERIFYOTP(for generating the otp sending the otp and also store the generated otp in the database with the expiration time).

// SendVeriyOtp controller function

export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query("SELECT * FROM users where id = $1", [
      userId,
    ]);

    if (result.rows.length === 0) {
      return res.json({ success: false, message: "user not found!" });
    }

    const user = result.rows[0];

    if (user.isaccountverified) {
      return res.json({
        success: false,
        message: "User account alredy verified!",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    //database me update ho gya
    await pool.query(
      "UPDATE users SET verifyotp = $1 , verifyotpexpireat= $2  WHERE id= $3",
      [otp, Date.now() + 24 * 60 * 60 * 1000, userId]
    );

    //email pr otp chala gya

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: "Account verification Otp",
      text: `Your otp is ${otp}.Verify your account using this otp.`,
      html:VERIFY_EMAIL_TEMPLATE.replace("{{otp}}",otp)
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(201)
      .json({ success: true, message: "Verification OTP sent to email!" });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "Error in sendVerifyOtp controller function : ",
      error,
    });
  }
};

//VerifyEmail controller funtion (as this function basically perform task of verification check the store otp in db with the entered one and the the isVerifedAccount col makes true )

export const verifyEmail = async (req, res) => {
  const userId = req.user.id;
  const { otp } = req.body;


  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing details" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    if (result.rows.length === 0) {
      return res.json({ success: false, message: "User not found!" });
    }

    const user = result.rows[0];

    const name=user.name;

    // check OTP
    if (user.verifyotp === "" || user.verifyotp !== otp) {
      return res.json({ success: false, message: "Invalid Otp!" });
    }

    if (new Date(user.verifyotpexpireat).getTime() < Date.now()) {
      return res.json({ success: false, message: "Otp expired!" });
    }

    // update only this user
    await pool.query(
      "UPDATE users SET isaccountverified = $1, verifyotp = $2, verifyotpexpireat = $3 WHERE id = $4",
      [true, "", 0, userId]
    );

    // send mail
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: "Account verified message",
      text: `Your account has been successfully verified`,
      html:EMAIL_VERIFIED.replace("{{name}}",name)
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "Email verified successfully!" });
  } catch (error) {
    res
      .status(501)
      .json({ success: false, message: "Error in verifyEmail", error });
  }
};

//controller function for check is user autheticated (bascically middleware used where the token decide authorized or not if available of token cookie)

export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true, message: "user is authenticated" });
  } catch (error) {
    return res.json({ sucess: false, message: error.message });
  }
};

//controller function for sendResetOtp

export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ sucess: false, message: "Missing Details!" });
  }

  try {
    const result = await pool.query("select * from users where email= $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.json({ success: false, message: "User not found!" });
    }
    const user = result.rows[0];

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    await pool.query(
      "UPDATE users SET resetotp = $1, resetotpexpireat = $2 WHERE email = $3",
      [otp, Date.now() + 15 * 60 * 1000, email]
    );

    // send mail
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your otp for reset password is ${otp}.Use this OTP to proceed with update your password!.`,
      html:PASSWORD_RESET_OTP.replace("{{otp}}",otp)

    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "Email verified successfully!" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//controller function to reset Password

export const resetPassword = async (req, res) => {

    const {email,newPassword,otp}= req.body;
  if (!email || !newPassword || !otp) {
    return res.json({ success: false, message: "Missing details!" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email= $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.json({ success: false, message: "User not found!" });
    }
    const user = result.rows[0];

    if (user.resetotp === "" || user.resetotp !== otp) {
      return res.json({ success: false, message: "OTP Invalid!" });
    }

    if (new Date(user.resetotpexpirear).getTime() < Date.now()) {
      return res.json({ success: false, message: "Otp expired!" });
    }
     

    const hashedPassword = await bcrypt.hash(newPassword,10);

    await pool.query('UPDATE users SET password=$1, resetotp=$2, resetotpexpireat=$3 WHERE email=$4 ', [hashedPassword,'',0,email]);

    return res.json({success:true,message:"Password has been reset successfully!"});

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
