console.log(grpName)
    const grpCreator = grpName.grpCreator;
    const user = req.cookies.loggedInUser;
    if (grpCreator != user) {
      res.redirect("/user/profile")
    } else {
      const result = await Groups.updateOne(
        { grpName: groupName },
        { $push: { teamMembers: member } }
      );

      if (result.nModified === 1) {
        return res.redirect("/user/Groups");
      } else {
        return res.status(404).render("Others", { data: "Does not inserted" });
      }
    }