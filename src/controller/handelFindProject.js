import projects from "../models/projects.model.js";
export default async function handelFindProject(req,res){
    const findProject=req.body.FindP
    await projects.find({projectName:findProject}).then((project)=>{
        return res.render("projects",{foundProjects:project})
    })
}
