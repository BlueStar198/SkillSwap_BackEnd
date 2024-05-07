const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Troca de Habilidades',
            version: '1.0.0',
            description: 'Documentação da API de Troca de Habilidades',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Removido o prefixo /api
                description: 'Servidor de Desenvolvimento',
            },
        ],
    },
    apis: ['./routes/*.js'], // Caminho para os arquivos de rota da sua aplicação
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
