     //! the "access key" to unsplash
const accessKey = "GDVKl1Mx0DjR7S9IWPWOjLdHN-EsthxyDl3CK2l0dFI";

//!important variables
const formEl = document.querySelector(".form")
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-btn");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    //!the async function should have the response which awaits and fetches the url its always good to call it the response
    const response = await fetch(url);
    //!then that information should be turn into a JSON
    const data = await response.json();
    //!the information is then gotten in an array form in the results
    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    //!the results is what we are mapping and the result is each of the each of the results object


    //!In the code below the we are mapping only one object of the results in its final position which is an image 
    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    })
    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }


}

    //!here we are adding an event key listener
    formEl.addEventListener("submit", (event) => {
        event.preventDefault();
        page = 1;
        searchImages();
    })

showMore.addEventListener("click", (event) => {
    searchImages();
});





