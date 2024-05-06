const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

const port = 8081;
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "railwaydb"
});

app.options("/pressedoffwheels", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.send();
});


app.post("/pressedoffwheels", async (req, res) => {
    console.log("Received POST request:", req.body);
    const sql = "INSERT INTO pressedoffwheels (`Date`, `ShoOperratorTNo`, `InspectorT`, `ShopSNo`, `TypeofWheel`, `WheelPressedofffor`, `DiscSrNo`, `AxleNo`, `Reason`, `Remarks`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [req.body.Date, req.body.ShoOperratorTNo, req.body.InspectorT, req.body.ShopSNo, req.body.TypeofWheel, req.body.WheelPressedofffor, req.body.DiscSrNo, req.body.AxleNo, req.body.Reason, req.body.Remarks];
    db.query(sql, values, (err, result) => {
        if (err)
            return res.json({ message: "Something unexpected has occured" + err });
        return res.json({ success: "Add Data Sucessfully" });
    });
});


app.get("/pressedoffwheels", (req, res) => {
    const sql = "SELECT * FROM pressedoffwheels";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "An error occurred while fetching data." });
        }
        return res.json(data);
    });
});


app.get("/users", (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ error: "An error occurred while fetching data." });
        }
        return res.json(data);
    });
});




app.listen(port, () => {
    console.log(`Server is runing on port ${port}`);
});
