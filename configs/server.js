'use strict'

import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { dbConnection } from "./mongo.js";
import postRoutes from "../src//posts/posts.routes.js";
import commentsRoutes from "../src/comments/comments.routes.js";
import { swaggerDocs, swaggerUi } from "./swagger.js";

const middlewares =(app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(morgan('dev'))
    app.use(helmet())
}

const routes = (app) => {

    app.use('/learningBlog/v1/posts', postRoutes)
    app.use('/learningBlog/v1/comments', commentsRoutes)
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

const conectarDb = async () => {
    try {
        await dbConnection()
    }
    catch (error) {
        console.log(`Error connecting to the database: ${error}`)
        process.exit(1)
    }
}

export const initServer = async () => {
    const app = express()
    try{
        conectarDb()
        middlewares(app)
        routes(app)
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(`Error starting the server: ${error}`)
    }
}