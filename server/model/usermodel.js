import pool from '../config/postgres.js'

const CreateUserTable =  async()=>{
    const query = `
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS users(
       Id uuid Primary Key default uuid_generate_v4(),
       Name Varchar(100)  NOT NULL,
       Email Text NOT NULL UNIQUE,
       Password Text NOT NULL,
       VerifyOtp Text Default '',
       VerifyOtpExpireAt Bigint Default '0',
       isAccountVerified Boolean Default 'false',
       ResetOtp Text Default '',
       ResetOtpExpireAt Bigint Default '0'


    );
    `;


    try {
        await pool.query(query);
                  
    } catch (error) {

    console.error("Error while creating user table", error);
        
    }
};

export default CreateUserTable;