import swaggerjsdoc from 'swagger-jsdoc'

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'TinyUrl API',
            version: '1.0.0',
            description: 'TinyUrl API Information',
            contact: {
                name: 'Arpit Gupta'
            },
        },
        servers: [
            {
                url: "https://turl.onrender.com/"
            },
            {
                url: "http://localhost:8000/"
            }
        ],
    },
    apis: ['./src/docs/*.yaml']
}

const swaggerDocs = swaggerjsdoc(swaggerOptions)

export default swaggerDocs;