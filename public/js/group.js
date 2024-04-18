function createGroup() {
  const a = document.getElementById("cGF");
  a.innerHTML = "";
  const form = document.createElement("form");
  form.method = "post";
  form.id = "groupDetailInput";
  form.action = `/user/Groups`;
  form.innerHTML = `
        <input type="text" class="input1" name="groupName" placeholder="Enter the Group name required">
        <input type="text" class="input1" name="groupDes" placeholder="Enter the description required">
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

async function joinChat(group, index) {
  console.log(group.groupCharts);
  var groupName = document.getElementById(`grpName_${index}`).innerText.slice(16);
  const a = document.getElementById("cGF");
  a.innerHTML = "";
  const div = document.createElement("div");
  div.id = "chatBox";
  div.innerHTML = `
  <div id="messageBox">
            <div id="GroupNameHeader">${groupName}</div>
            ${group.groupCharts
              .map(
                (message) =>
                  `
                  <div class="singleMessage">
                    <div class="singleMessageHeader"> 
                      <span> Message Send By-:${message.user}</span> <span> Time-:${message.time}</span>
                    </div>
                   <span class="actualMessage">${message.message}</span>
                  </div>`
              )
              .join("")}
        </div>
        <form id="inputBox">
            <input type="text" id="messages" placeholder="Enter and send to send Message"
                >
            <button>Send▶️</button>
        </form>
        `;
  a.appendChild(div);
  const form = document.getElementById("inputBox");
  const input = document.getElementById("messages");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value) {
      const now = new Date();

      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      const localTime = `${year}-${month}-${day} ${hours}:${minutes}`;
      socket.emit("messageSent", {
        message: input.value,
        groupName: groupName,
        time: localTime,
      });
      input.value = "";
    }
  });
}
