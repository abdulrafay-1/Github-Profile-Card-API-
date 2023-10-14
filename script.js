var username = document.getElementById("name");
var followersCount = document.getElementById("followers");
var followingCount  = document.getElementById("following");
var repoCount = document.getElementById("repos");
var des = document.getElementById("des");
var avatar = document.getElementById("avatar");
var wrapper = document.querySelector(".container");

var userData;
var input;

function search() {
    input = document.getElementById("input").value;

    if (input.trim()) {
        fetchedData();
        wrapper.style.display = "flex";
        document.getElementById("input").value = "";
        getData();
    }
    else {
        Swal.fire({
            title: 'Error!',
            text: 'Please Enter valid username',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    }
}

function fetchedData() {
    userData = fetch(`https://api.github.com/users/${input}`)
        .then((data) => {
            if (!data.ok) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Username not found',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
                wrapper.style.display = "none";
            }
            return data.json()
        })
        .then((result) => result)
        .catch((error) => {
            console.log("error : " + error)
        })


}

function getData() {
    userData.then((users) => username.textContent = users.name)
    userData.then((users) => followersCount.textContent = users.followers)
    userData.then((users) => followingCount.textContent = users.following)
    userData.then((users) => repoCount.textContent = users.public_repos)
    userData.then((users) => des.textContent = users.bio)
    userData.then((users) => avatar.src = users.avatar_url)
}

function showGithubProfile() {
    location.href = `https://github.com/${input}`
}