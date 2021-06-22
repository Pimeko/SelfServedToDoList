const express = require("express")

const am = require("../middlewares/asyncMiddleware")

// Controllers
const themeController = require("../controllers/themeController")
const todosController = require("../controllers/todosController")

const appRouter = (app) => {
    const router = express.Router()

    router.get("/", (_, res) => {
        res.status(200).send("Todo's api working fine! :)")
    })

    router.get("/theme", am(async (_) => themeController.get()))
    router.post("/theme", am(async (req) => themeController.update(req.body)))

    router.get("/todos", am(async (_) => todosController.get()))
    router.post("/todos", am(async (req) => todosController.update(req.body)))

    app.use('/api', router)
}
    
module.exports = appRouter