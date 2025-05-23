let pages = [
  { url: "", title: "home" },
  { url: "about/", title: "about" },
  { url: "library/", title: "education library" },
  { url: "contact/", title: "community contact portal" },
  { url: "map/", title: "organizations map" },
  { url: "artboard/", title: "community artboard" },
  { url: "", title: "submit a resource" }
];
// Then, create a new <nav> element (via document.createElement()) and add it inside <body> at the beginning (via element.prepend()).:
let nav = document.createElement("nav");
nav.className = "nav";
nav.innerHTML = '<ul class="nav-ul nav-ul--monitor">';
let ul = nav.querySelector("ul");

document.body.prepend(nav);
// Then we will use a for .. of loop to iterate over the pages on our site and add <a> elements in the <nav> for each of them. It will look like this:
for (let p of pages) {
  let url = p.url;
  let title = p.title;
  // next step: Create link and add it to nav
  // let’s detect whether we are running the site locally (on localhost) or on GitHub Pages,
  // and use that to adjust the base URL for all links.
  // We can do this by checking the current hostname and defining a constant BASE_PATH accordingly:
  // // The location.hostname property gives us the domain of the current page.
  // // If we’re working locally, it will be "localhost" or "127.0.0.1".
  // // If we’re on GitHub Pages, it will be something like "yourusername.github.io".
  const BASE_PATH =
    location.hostname === "localhost" || location.hostname === "127.0.0.1"
      ? "/" // Local server
      : "/cjarscapstone/"; // GitHub Pages repo name
  // // Then, when creating the links, we’ll check if the URL is relative (i.e. does not start with "http"),
  // // and if so, we’ll prefix it with the BASE_PATH. This ensures that all internal links work properly both locally and when deployed.
  // if (!url.startsWith('http')) {
  //     url = BASE_PATH + url;
  //   }
  // Alternatively, we can do it more concisely using a ternary operator:
  url = !url.startsWith("http") ? BASE_PATH + url : url;

  // Our automatically added navigation menu works, but is missing all the bells and whistles of our original one:
  // The current page is not highlighted anymore
  // The link to your GitHub profile does not have target="_blank" to make it open in a new tab.
  // How can we add those back?
  // Let’s switch to a different method of creating these links, that is more verbose, but gives us more flexibility. Instead of appending HTML strings, we will create element objects in JS and set their attributes in JS, via properties (or setAttribute() calls.
  // So, this line of JS:
  // nav.insertAdjacentHTML('beforeend', `<a href="${url}">${title}</a>`);
  // now becomes four lines:
  let li = document.createElement("li");
  li.className = "nav-li";
  li.innerHTML = '<a class="nav-span"></a>';
  let a = li.querySelector("a");
  a.href = url;
  a.textContent = title;
  ul.append(li);
  // We can just add a conditional to check if the link is to the current page using exactly the same check as Step 2.2 and add the class if so.
  // All we need is to compare a.host and a.pathname to location.host and location.pathname and then use a.classList.add() to add the class.
  if (a.host === location.host && a.pathname === location.pathname) {
    a.classList.add("current");
  }
  // You can even use a.className.toggle() to do the checking and the class adding in one (very long) line!
  a.classList.toggle(
    "current",
    a.host === location.host && a.pathname === location.pathname,
  );
  // Similarly, we can add target="_blank" to external links (such as the GitHub link) by setting a.target = "_blank" to those links for which a.host is not the same as location.host.
  // Just like class names, you can either use conditionals or do the checking and the attribute setting in one step, by using element.toggleAttribute().
  if (a.host !== location.host) {
    a.target = "_blank";
  }
}

let footer = document.createElement("footer");
footer.className = "nav";
document.body.append(footer);

