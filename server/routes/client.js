const { Router } = require("express");
const router = Router();
const Client = require("../models/Client");

router.post("/addClient", async (req, res) => {
    try {
        const client = new Client(req.body);
        await client.save();
        return res.status(200).json({ message: "OK" });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong!" });
    }
});

router.get("/getClients", async (req, res) => {
    try {
        const { fullName } = req.query;
        const clients = await Client.find({
            fullNameResponsiblePerson: fullName,
        });
        return res.status(200).json({ data: clients, message: "OK" });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong!" });
    }
});

router.put("/changeStatusClient/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const newStatus = req.body.status;
        const updatedClient = await Client.findByIdAndUpdate(id, {
            status: newStatus,
        });
        if (!updatedClient) {
            return res.status(404).send("Client not found.");
        }
        return res.status(200).json({ message: "OK" });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong!" });
    }
});

module.exports = router;
