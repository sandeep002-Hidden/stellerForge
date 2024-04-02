function readFile(item, index) {
    let a = document.getElementById("editor");
    a.textContent = item.Codes[index].content;
  }
var link1 = document.getElementById("hl");
var link2=document.getElementById("hl2")
var link3=document.getElementById("hl3")

link1.href=`/user/profile/`
link2.href=`/user/Groups/`
link3.href=`/user/problems/`
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
