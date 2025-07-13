import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const PORT = Number(process.env.PORT) || 3001;

const startServer = async () => {

    try {
        await app.listen({port: PORT}).then(() => { console.log(`Server is running on ${PORT}`)
    });

    } catch (error) {
        console.error(error);
    }
}
startServer();
