const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
      contact: {
        name: 'Ajdin Lojic',
        url: 'https://ajdinlojic.vercel.app/',
        email: 'ajdinlojic@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
}

module.exports = options
