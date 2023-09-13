export const optionsConfig = (port: string) => {
    return {
        definition: {
            openapi: '3.0.0',
            info: {
                title: '2023 REG Paddy Solution Research Project',
                version: '1.0.0',
            },
            servers: [
                {
                    url: `http://localhost:${port || 8080}/`,
                },
            ],
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        apis: ['./src/routes/**/*.ts'],
    }
}
