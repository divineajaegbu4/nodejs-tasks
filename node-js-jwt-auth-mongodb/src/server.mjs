import express from "express";
import cors from "cors"
import { dbConfig } from "./config/db.config.mjs"
import {db} from "./models/index.mjs"



const app = express()

const Role = db.ROLES

const corsOptions = {
    origin: "http://localhost:8081"
}

// Only request from http://localhost:8081 is allowed to talk to the backend
app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({message: "Welcome to Divine application"})
})

const connectTODB = async() => {
  try {
    const mongooseConnection = await db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)

    if(mongooseConnection) {
        console.log("Successfully connected")
        initial()
    }
  }catch(err) {
    console.log("Connection failed", err)
    process.exit()
  }
}

const initial = () => {
 Role.estimatedDocumentCount((err, count) => {
    if(!err && count === 0) {
        new Role({
            name: "User"
        }).save(err => {
           if(err) {
            cosnole.log(err)
           }

           console.log("User has successfully to the roles collection")
        })

        new Role({
            name: "admin"
        }).save(err => {
            if(err) {
                console.log(err)
            }

            console.log("admin has added in the role collection")
        })

        new Role({
            name: "moderator"
        }).save(err => {
            if(err) {
                console.log(err)
            }

            console.log("moderator has successfully added to the role collection")
        })
    }
 })
}

// const port = process.env.PORT || 8080;

// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`);
// })