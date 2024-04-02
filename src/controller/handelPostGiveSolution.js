import Problems from "../models/problems.model.js";
export default async function handelPostGiveSolution(req, res) {
  const { sUsername, sTypeP, sProblemI, sSolutions } = req.body;
  console.log( sUsername, sTypeP, sProblemI, sSolutions )
  const sProvideUserName = req.cookies.loggedInUser;
  await Problems.updateOne(
    { username: sUsername, typeP: sTypeP, problemI: sProblemI },
    {
      $push: {
        solutions: sSolutions,
        sPUname: sProvideUserName, 
      },
    })

    .catch((error) => {
      console.log("Error occur while inserting solutions" + error);
    });
  res.render("Others", { data: "Your answer Was Published SuccessFully" });
}
