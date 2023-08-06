import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect("mongodb+srv://rohan:kankimagi@cluster0.ecwot4i.mongodb.net/nextauth?retryWrites=true&w=majority");
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Connected Successfully...");
        });

        connection.on("error", (err) => {
            console.log("connection error => ", err );
            process.exit();
        });
    } catch (err) {
        console.log(err);
    }
}







