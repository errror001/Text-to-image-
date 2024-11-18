const accessKey = "xafcBlKdHVtZHXiki-39537RVhDq1fJ3vpGwwQhBUwE";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = ""; // Clear previous results if it's the first page
    }

    results.map((result) => {
        const imageWrapper = document.createElement("div"); // Corrected "docement" to "document"
        imageWrapper.classList.add("search-result"); // Corrected "classlist" to "classList"
        
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        
        const imageLink = document.createElement("a"); // Corrected variable capitalization to "imageLink"
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    
    // Show the "Show More" button if there are more pages
    if (page > 1) {
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1; // Reset to first page when new search is submitted
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages(); // Load more images when "Show More" is clicked
});
