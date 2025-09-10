import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "My API",
    description: "Auto-generated Swagger docs",
  },
  host: "localhost:5000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json"; // generated file
const endpointsFiles = ["./index.js"];     // entry point of your app

swaggerAutogen()(outputFile, endpointsFiles, doc);



// // swagger.js
// import swaggerJsdoc from "swagger-jsdoc";

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "My API Docs",
//       version: "1.0.0",
//       description: "API documentation for my Node.js app",
//     },
//     servers: [
//       {
//         url: "http://localhost:5000", // update if needed
//       },
//     ],
//   },
// apis: ["./routes/*.routes.js"], // path to your route files
// };

// const swaggerSpec = swaggerJsdoc(options);

// export default swaggerSpec;
