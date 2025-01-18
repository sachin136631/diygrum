import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();
const app = express();
const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
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

app.post("/gemini",async(req,res)=>{
    const {prompt}=req.body;
    if (!prompt) {
        return res.status(400).json({ message: "Prompt is required." }); 
    }
    try{
        const model=genAI.getGenerativeModel({model:"gemini-1.5-flash"});
        const result = await model.generateContent(prompt);
        res.status(200).json({response:result.response.text()});
    }catch(error){
        console.error("error interacting with gemini api",error);
        res.status(500).json({message:"failed to interact with gemini api"});
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
