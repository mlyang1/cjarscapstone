// Importing Project Data into the Projects Page
// create a function in your global.js file to load project data from a JSON file and dynamically display it on the Projects page.
// Start by defining an asynchronous function that will fetch your project data.
export async function fetchJSON(url) {
  // Add a check to ensure the fetch request was successful. If it wasn’t, throw an error to handle invalid responses.
  try {
    // Fetch the JSON file from the given URL
    const response = await fetch(url);
    // place this snippet inside the try block, immediately after the fetch function call.
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    // Use console.log(response) to inspect the response object in your browser’s developer tools and confirm that it’s working correctly.
    console.log(response);

    // Once you’ve verified the response is valid, parse it into a format you can work with.
    // Here’s how to parse the response:
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching or parsing JSON data:", error);
  }
}

//Build a renderProjects function to dynamically generate and display project content.
// This function will allow you to reuse project rendering logic anywhere on your site.
//Start by creating a function that accepts two parameters:
// the project object and the containerElement where the project will be displayed.
//Now that the basic function is ready, let’s enhance it to allow dynamic heading levels.
// This makes the function reusable for different contexts.
export function renderProjects(
  projects,
  containerElement,
  headingLevel = "h2",
) {
  // write javascript that will allow dynamic heading levels based on previous function

  //     Think about why you need these two parameters.
  // CHALLENGE:
  // What type of data should the project parameter contain?
  // How would you test if the containerElement is valid?

  //To dynamically render project details, you’ll create and populate an <article> element for each project.
  // Before adding new project articles, ensure the container is empty to avoid duplication.
  containerElement.innerHTML = ""; // Check if the projects array is empty

  const projectCount = projects.length;
  if (projectCount === 0) {
    // Display a placeholder message
    const placeholderMessage = `No projects found. Please check back later for updates.`;
    container.innerHTML = `
      <${headingLevel}>${placeholderMessage}</${headingLevel}>
    `;
  } else {
    // Render the projects as usual

    try {
      // Select the element with the id projects-title from the DOM
      const projectsTitleElement = document.getElementById("projects-title");
      // Update the text content of the element
      projectsTitleElement.textContent = `${projectCount} results`;
    } catch {}
    // THINK ABOUT IT:
    // Why is it important to clear the container before adding new elements?
    // What would happen if you skipped this step?

    projects.forEach((project) => {
      //For each project, create a new <article> element to hold its details.
      const article = document.createElement("article");
      //THINK ABOUT IT:
      // Why do we use createElement instead of directly appending HTML?
      // How does using createElement make your code more secure or modular?

      //Use the innerHTML property to populate the <article> element with dynamic content.
      article.innerHTML = `
      
            
            <a href="${project["PDF link"]}" target="_blank">
            <${headingLevel}>${project.title}</${headingLevel}>
              <img src="${project.image}" alt="${project.title}" height="200" width="280" padding="10" />

            </a>

            <div class="wrapper">
              <div class="description">${project.description}</div>
              <div class="year">${project.year}</div>
            </div>
            
        `;
      //THINK ABOUT IT:
      // What happens if one of the properties, like project.image, is missing?
      // How can you handle missing or invalid data gracefully?

      //Finally, append the <article> element to the provided containerElement.
      containerElement.appendChild(article);
    });

    //Ensure containerElement is a valid DOM element in your tests.
    if (!(containerElement instanceof Element)) {
      throw new Error("containerElement must be a valid DOM element");
    }
  }
}


//Use the fetchJSON function to load the project data from a JSON file.
//This code assumes your projects.json file is located in a lib folder relative to the current file.
let projects = await fetchJSON("../json_files/zines.json");
//Select the container where you want to render the project articles. Use the following snippet:
//Ensure your HTML includes a container with the class projects.
const projectsContainer = document.querySelector(".projects");
//Call the renderProjects function to dynamically display the fetched projects:
//This code will render each project with an <h2> heading level.
renderProjects(projects, projectsContainer, "h3");

let selectedIndex = -1;

let query = "";
let searchInput = document.querySelector(".searchBar");

searchInput.addEventListener("change", (event) => {
  // update query value
  query = event.target.value;
  // filter the projects
  let filteredProjects = projects.filter((project) => {
    let values = Object.values(project).join("\n").toLowerCase();
    return values.includes(query.toLowerCase());
  });
  // re-render legends and pie chart when event triggers
  renderProjects(filteredProjects, projectsContainer, "h2");
});