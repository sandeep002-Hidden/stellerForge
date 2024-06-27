import multer from "multer";
import fs from "fs";
import projects from "../models/projects.model.js";
const upload = multer({ dest: "../uploads" });

export default function uploadProjectFile(req, res, next) {
  try {
    console.log(req.body)
    upload.array("files")(req, res, async function (err) {
      if (err) {
        console.error("File upload error:", err);
        return res.status(400).send("File upload failed");
      }
      const files = [];
      const Codes = [];
      for (const file of req.files) {
        files.push({
          fileName: file.originalname,
        });

        const fileContent = fs.readFileSync(file.path, "utf-8");
        Codes.push({
          content: fileContent,
        });
      }
      const { nameP, detailP, aimP } = req.body;
      const username = req.cookies.loggedInUser;
      const data = {
        username,
        projectName:nameP,
        projectDetails:detailP,
        AimP:aimP,
        files,
        Codes,
      };
      await projects.create(data).catch((error) => {
        console.log("Error" + error);
      }).then(()=>{
        return res.render("Others", { data: "Entered successfully, Go back To continue" });
      })
    });
  } catch (error) {
    console.error("Error handling file upload:", error);
    return res.status(500).send("Internal Server Error");
  }
}
