function readFile(item, index) {
    let a = document.getElementById("code");
    a.textContent = item.Codes[index].content;
  }
var link1 = document.getElementById("hl");
var link2=document.getElementById("hl2")
var link3=document.getElementById("hl3")
var link4=document.getElementById("hl4")

link1.href=`/user/profile`
link2.href=`/user/Groups`
link3.href=`/user/problems`
link4.href="/user/FindProjects"
const finding=document.getElementById("finding").innerText
var x=document.getElementById("fuName").innerHTML.slice(13)
document.getElementById('connectbtn').addEventListener('click', async () => {
    try {
        const response = await fetch(`/user/findUser`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                followers:finding
            })
        });

        if (!response.ok) {
            throw new Error('Failed to insert data');
        }
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
});
