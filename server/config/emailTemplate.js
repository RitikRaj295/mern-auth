export const VERIFY_EMAIL_TEMPLATE =`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Your OTP Code</title>
  </head>
  <body style="margin:0; padding:20px; font-family: Arial, sans-serif; background-color:#f4f4f4;">
    <div style="max-width:500px; margin:auto; background:#ffffff; border-radius:8px; padding:20px; text-align:center; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
      
      <h2 style="color:#4f46e5; margin-bottom:10px;">Email Verification</h2>
      <p style="font-size:16px; color:#333;">Use the OTP below to verify your email address:</p>
      
      <div style="background:#4f46e5; color:#ffffff; font-size:28px; font-weight:bold; letter-spacing:5px; padding:15px 0; border-radius:6px; margin:20px 0;">
        {{otp}}
      </div>

      <p style="font-size:14px; color:#555;">This OTP will expire in <strong>15 minutes</strong>.</p>
      <p style="font-size:12px; color:#999;">If you didn’t request this, please ignore the email.</p>
    </div>
  </body>
</html>
`


export const EMAIL_VERIFIED=`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Account Verified</title>
  </head>
  <body style="margin:0; padding:20px; font-family: Arial, sans-serif; background:#f4f4f4;">
    <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; padding:30px; text-align:center; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background:linear-gradient(90deg, #4f46e5, #6366f1); padding:20px; border-radius:8px;">
        <h1 style="color:#ffffff; margin:0; font-size:24px;">🎉 Congratulations!</h1>
      </div>
      
      <!-- Body -->
      <div style="padding:20px;">
        <h2 style="color:#333;">Your Account is Verified</h2>
        <p style="font-size:16px; color:#555; line-height:1.5;">
          Hello <strong>{{name}}</strong>, <br><br>
          We’re excited to let you know that your account has been <span style="color:#22c55e; font-weight:bold;">successfully verified</span>.  
          You can now log in and enjoy all the features of our platform.
        </p>

      </div>

      <!-- Footer -->
      <div style="margin-top:30px; border-top:1px solid #eee; padding-top:15px; font-size:12px; color:#999;">
        <p>Enjoy your Journey!</p>
      </div>

    </div>
  </body>
</html>
`

export const PASSWORD_RESET_OTP=`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Your OTP Code</title>
  </head>
  <body style="margin:0; padding:20px; font-family: Arial, sans-serif; background-color:#f4f4f4;">
    <div style="max-width:500px; margin:auto; background:#ffffff; border-radius:8px; padding:20px; text-align:center; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
      
      <h2 style="color:#4f46e5; margin-bottom:10px;">Reset Password </h2>
      <p style="font-size:16px; color:#333;">Use the OTP below to reset your password:</p>
      
      <div style="background:#4f46e5; color:#ffffff; font-size:28px; font-weight:bold; letter-spacing:5px; padding:15px 0; border-radius:6px; margin:20px 0;">
        {{otp}}
      </div>

      <p style="font-size:14px; color:#555;">This OTP will expire in <strong>15 minutes</strong>.</p>
      <p style="font-size:12px; color:#999;">If you didn’t request this, please ignore the email.</p>
    </div>
  </body>
</html>`