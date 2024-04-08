import Groups from "../models/Groups.model.js";

export default async function addMember(req, res) {
  try {
    const { groupName, member } = req.body;

    const result = await Groups.updateOne({ grpName: groupName }, { $push: { teamMembers: member } });

    if (result.nModified === 1) {
      return res.redirect("/user/Groups");
    } else {
      return res.status(404).render("Others",{data:"Does not inserted"});
    }
  } catch (error) {
    console.error("Error adding member:", error);
    return res.status(500).send("Internal Server Error");
  }
}
