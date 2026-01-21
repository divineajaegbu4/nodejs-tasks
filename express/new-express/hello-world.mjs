import express from "express"

export const router = express.Router();


const names = [
    {
        name: "Ajaegbu Divine",
        age: 39,
        state: "Anambra state"
    },

    {
        name: "Bekee Mba",
        age: 23,
        state: "Enugu state"
    },

    {
        name: "Ifeanyi Okeye",
        age: 43,
        state: "Imo state"
    },

    {
        name: "Prestige Okafor",
        age: 54,
        state: "Abia state"
    },

    {
        name: "Gideon Uruoka",
        age: 39,
        state: "Anambra state"
    },

    {
        name: "Chibuuzo Mgbeke",
        age: 42,
        state: "Imo state"
    },
]
router.get("/", (req, res) => {
    res.status(200).json(names)
} )


