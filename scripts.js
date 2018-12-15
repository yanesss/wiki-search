//grabs form information
const search = document.querySelector('.wiki-search');


// Event Listener --> when submit (button) is triggered, submitSearch (function) also triggers
search.addEventListener('submit', submitSearch);

function submitSearch(event) {
  //prevents page from reloading once the search is found
  event.preventDefault();

  //grabs the value entered in the search bar (input)
  let userInput = document.querySelector('.input-value').value;

  //remove whitespace for api
  const searchQuery = userInput.trim();

  getWikiResults(searchQuery);

  //resets search value to null
  event.target.reset();

}

// FETCH REQUEST
function getWikiResults(searchQuery) {
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=${searchQuery}`;
  
  fetch(endpoint)
  .then(function(response) {
    return response.json(); // returns in json
  })
  .then(function(myJson) { //uses json to navigate API
    for(var i in myJson.query.pages) {
      var title = (myJson.query.pages[i].title);
      var newTitle = title.replace(/[^A-Z0-9:']+/ig, "_");
      const link = `https://en.wikipedia.org/wiki/${newTitle}`;
      createListOfLinks(link, newTitle);
    }
  })
  .catch((err) => { //if input does not exist send error
    alert('Articles not found, please try again.')
  })
}

// Create li elements
function createListOfLinks(links, title) {
  var myList = document.querySelector('.articles');
  var itemList = document.createElement('li');
  var aTag = document.createElement('a');
  var length = 0;

  for (var i = 0; i < links.length; i++) {
    myList.appendChild(itemList);
    aTag.setAttribute('href', links);
    aTag.innerHTML = title.replace(/_/g, ' ');
  }
  itemList.appendChild(aTag);

}
