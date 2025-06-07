import mongoose from "mongoose";

export async function connect()
{
    try
    {
        if(!process.env.MONGO_URL)
        {
            console.log("Mongo url is not getting from env file while connecting to database.");
            return;
        }
        mongoose.connect(process.env.MONGO_URL);
        const connection = mongoose.connection;
        connection.on('connected' , () => {
            console.log("Mongo DB connected successfully!");
        })
        connection.on("error" , (error) => {
            console.log("Error while connecting mongodb in try block . " + error);
            process.exit();
        })
    }
    catch(e)
    {
        console.log("Something went wrong while connecting to database. " + e);
    }
}