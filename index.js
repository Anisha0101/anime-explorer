import express from "express";
import axios from "axios";

const app=express();
app.set("view engine","ejs");
// const port=3000;
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index"); //index enough here since we set view engine to ejs
})

app.post("/search",async(req,res)=>{
    try{
        const animeName=req.body.animeName;
        console.log("User searched:", animeName);  //another way to print in console 
        const result=await axios.get(
            `https://api.jikan.moe/v4/anime?q=${animeName}`
        );
        if(result.data.data.length === 0){
            return res.render("error");
        }        
        const anime=result.data.data[0];
        // console.log(result.data);
        console.log("Title:",anime.title);
        console.log("Episodes:",anime.episodes);
        console.log("Score:",anime.score);
        // res.send("API Connected Successfully!");
        res.render("anime",{
            anime:anime
        })
    }
    catch(error){
        console.log(error);
        res.send("Oops, something went wrong :(");
    }
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})