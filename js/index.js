var siteName = document.getElementById('siteName')
var siteUrl = document.getElementById('siteUrl')

var displayWebsite = document.getElementById('displayWebsite')
var lightBoxContainer = document.getElementById('lightBoxContainer')

var websiteList = []

if (localStorage.getItem("websiteList") != null) {
     websiteList = JSON.parse(localStorage.getItem('websiteList'))
     displayBookmark()
}

// function (add)
function siteBookmark() {

     // check siteName
     if (checkName()) {
          return;
     }



     if (validationInput(siteName) &&
          validationInput(siteUrl)) {
          var bookmark = {
               name: siteName.value,
               website: siteUrl.value
          }

          websiteList.push(bookmark)

          displayBookmark();

          localStorage.setItem('websiteList', JSON.stringify(websiteList));


     }
     else {
          lightBoxContainer.classList.remove("d-none")
     }


     clean();

}



// clean
function clean() {
     siteName.value = "";
     siteUrl.value = "";
     siteName.classList.remove("is-valid", "is-invalid");
     siteUrl.classList.remove("is-valid", "is-invalid")

}


// display

function displayBookmark() {
     cartonaa = ``

     for (var i = 0; i < websiteList.length; i++) {
          cartonaa += `<tr>
                    <td>${i + 1}</td>
                    <td>${websiteList[i].name}</td>
                    <td><a class="btn btn-info" target="_blank" href="${websiteList[i].website}"><i class="fa-solid fa-eye"></i> Visit</a></td>
                    <td><button class="btn btn-danger " onclick="deleteBookmark(${i});"> <i class="fa-solid fa-trash"></i> Delete</button></td>
                    </tr>`


     }
     displayWebsite.innerHTML = cartonaa

}

// delete
function deleteBookmark(deleteIndex) {
     websiteList.splice(deleteIndex, 1)
     displayBookmark();
     localStorage.setItem('websiteList', JSON.stringify(websiteList));

}


// check name
function checkName() {
     for (var i = 0; i < websiteList.length; i++) {
          if (websiteList[i].name.toLowerCase() === siteName.value.toLowerCase()) {
               Swal.fire({
                    icon: "error",
                    title: "Oops... Something went wrong!",
                    text: 'bookmark already exis',
                    
               });

               return true;

          }


     }
     return false;
}


// validation
function validationInput(element) {
     var regex = {
          siteName: /^[A-Z]\w{3,10}\s?\w{0,10}$/,
          siteUrl: /https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/
     }


     
     if (regex[element.id].test(element.value)) {
          element.classList.add("is-valid");
          element.classList.remove("is-invalid");
          return true; // Valid input
     } else {
          element.classList.remove("is-valid");
          element.classList.add("is-invalid");
          return false; // Invalid input
     }
}



// alert design
var closeBtn = document.querySelector("#closeBtn");

closeBtn.addEventListener("click", function (e) {

     lightBoxContainer.classList.add("d-none");
})


lightBoxContainer.addEventListener("click", function (e) {

     lightBoxContainer.classList.add("d-none");
})

lightBoxContainer.firstElementChild.addEventListener("click", function (e) {
     e.stopPropagation();
})
