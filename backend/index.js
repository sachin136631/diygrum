import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import {GoogleGenerativeAI} from "@google/generative-ai";
 import mongoose from 'mongoose';
dotenv.config();
const app = express();
const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const mongouri=process.env.MONGO_URI;
app.use(cors());
app.use(express.json());  


mongoose.connect(mongouri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connected to mongo db successfully");
}).catch((error)=>{
    console.error("error connecting mongo db",error);
})

const diagramSchema=new mongoose.Schema({
    stringcommand:{type:String,required:true}
});

const Diagram=mongoose.model("Diagram",diagramSchema);

app.post("/save-diagram",async(req,res)=>{
    const{stringcommand}=req.body;
    if(!stringcommand){
        return res.status(400).json({message:"the content is required"})
    }
    try{
        const newDiagram=new Diagram({stringcommand});
        await newDiagram.save();
        console.log("yes the diagram has been saved");
        res.status(200).json({message:"diagram saved successfully"})
    }catch(error){
        console.log("there is an error ",error);
    }
})

app.delete("/delete-diagram", async (req, res) => {
    try {
      const lastfile = await Diagram.findOneAndDelete({}, { sort: { _id: -1 } });
      if (!lastfile) {
        return res.status(404).json({ message: "No document to delete" });
      }
      console.log("Last record deleted successfully");
      res.status(200).json({ message: "Last record deleted successfully" });
    } catch (error) {
      console.error("Error deleting last record:", error);
      res.status(500).json({ message: "Failed to delete last record" });
    }
  });

  app.get("/get-last-item",async(req,res)=>{
    try{
        const lastest=await Diagram.findOne({},{},{sort:{_id:-1}});
        res.status(200).json(lastest);
    }catch(error){
        console.log("error fetching last data",error);
    }
  })
app.post("/generate-diagram", async (req, res) => {
    const {diagramSource} = req.body;

    try {
        
        const response = await axios.post("https://kroki.io", {
            diagram_source: diagramSource, 
            diagram_type:'graphviz',
            output_format:'svg',
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        console.log("request kittitind");        
        res.status(200).send(response.data);
    } catch (error) {
        console.error("Error making API call to Kroki:", error);
        res.status(500).json({ message: "Failed to generate diagram." });
    }
});

app.post("/gemini",async(req,res)=>{
    const {text}=req.body;
    console.log("the text from frontend is ",text);

     if (!text) {
         return res.status(400).json({ message: "text is required." }); 
     }
    try{
        const prompt= `convert the following text to this format "digraph S{A->B}" where A and B represents the two subjects the sentence refers to ${text}`
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
