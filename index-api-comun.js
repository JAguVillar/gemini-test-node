// const express = require("express");
// const cors = require("cors"); // Import cors
// const app = express();
// const PORT = 3000;

// app.use(cors());

// // Middleware to parse JSON data
// app.use(express.json());

// // Basic route for testing
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// // A couple of sample routes
// app.get("/api/users", (req, res) => {
//   res.json([
//     { id: 1, name: "John Doe" },
//     { id: 2, name: "Jane Doe" },
//   ]);
// });

// app.post("/api/users", (req, res) => {
//   const newUser = req.body;
//   res.status(201).json({
//     message: "User created",
//     user: newUser,
//   });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
