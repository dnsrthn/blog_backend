import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            titulo: "Learning Blog API",
            version: "1.0.0",
            descripcion: "API for a learning blog",
            contacto:{
                nombre: "Ethan Dnsrthn",
                correo: "ejuarez-2020269@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/learningBlog/v1"
            }
        ]
    },
    apis:[
        "./src/comments/comments.routes.js",
        "./src/posts/posts.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options);

export {swaggerDocs, swaggerUi}