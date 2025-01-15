import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());  


app.post("/generate-diagram", async (req, res) => {
    const { diagramSource, diagramType, outputFormat, diagramOptions } = req.body;

    try {
        
        const response = await axios.post("https://kroki.io/", {
            diagram_source: diagramSource,
            diagram_type: diagramType,
            output_format: outputFormat,
            diagram_options: diagramOptions,  
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        
        res.status(200).send(response.data);
    } catch (error) {
        console.error("Error making API call to Kroki:", error);
        res.status(500).json({ message: "Failed to generate diagram." });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
