function createGroup() {
  const a = document.getElementById("cGF");
  a.innerHTML = "";
  const form = document.createElement("form");
  form.method = "post";
  form.id = "groupDetailInput";
  form.action = `/user/Groups`;
  form.innerHTML = `
        <input type="text" name="groupName" placeholder="Enter the Group name">
        <input type="text" name="groupDes" placeholder="Enter the description">
        <input type="submit" value="Create group">
    `;
  a.appendChild(form);
}
const home = document.getElementById("home");
const group = document.getElementById("group");
const problem = document.getElementById("problems");
const findProject = document.getElementById("FindProjects");
home.href = `/user/profile`;
group.href = `/user/Groups`;
problem.href = `/user/problems`;
findProject.href = `/user/FindProjects`;

function addMember() {
  const a = document.getElementById("cGF");
  a.innerHTML = "";
  const form = document.createElement("form");
  form.id = "addMember";
  form.innerHTML = `
        <input type="text" name="addMemberIn" id="groupName" placeholder="Enter the Group Name">
        <input type="text" name="addMember" id="member" placeholder="Enter the username member">
        <input type="submit" value="Add">    `;
  a.appendChild(form);
  form.addEventListener("submit", async () => {
    try {
      const groupName = document.getElementById("groupName").value;
      const member = document.getElementById("member").value;

      const response = await fetch(`/user/Groups`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupName: groupName,
          member: member,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        console.log(response);
      }

      console.log("Data inserted successfully");
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  });
}
