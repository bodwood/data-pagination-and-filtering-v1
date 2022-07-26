/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

let header = document.querySelector('.header');
let searchBar =  `<label for="search" class="student-search">
                    <span>Search by name</span>
                    <input id="search" placeholder="Search by name...">
                    <button type="button" class="search-button"><img src="img/icn-search.svg" alt="Search icon"></button>
                  </label>`;
header.insertAdjacentHTML('beforeend', searchBar);

const searchButton = document.querySelector('.search-button');
const searchID = document.querySelector('#search');
let studentList = document.querySelector('.student-list');

/*
* Displays a page of nine students from data list
* @param list - represents student data
* @param page - represents page number
*/
function showPage(list, page){
  let startIndex = (page * 9) - 9;
  let endIndex = (page * 9);
  studentList.innerHTML = '';
  for(let i = 0; i < list.length; i++){
    if(i >= startIndex && i < endIndex){
      let studentItem = `<li class="student-item cf">
                          <div class="student-details">
                            <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                            <h3>${list[i].name.first} ${list[i].name.last}</h3>
                            <span class="email">${list[i].email}</span>
                          </div>
                          <div class="joined-details">
                            <span class="date">${list[i].registered.date}</span>
                          </div>
                        </li>`;
                        studentList.insertAdjacentHTML('beforeend', studentItem);
    }
  }
}

/*
* Creates and displays pagination buttons
* @param list - array of student data for page
*/
function addPagination(list){
  let numOfPages = Math.ceil(list.length/9);
  let linkList = document.querySelector('.link-list');
  linkList.innerHTML = '';
  for(let i = 1; i <= numOfPages; i++){
    let button = `<li>
                    <button type="button">${i}</button>
                  </li>`;
    linkList.insertAdjacentHTML('beforeend', button);
  }
  let buttonActive = document.querySelector('.link-list li button');
  buttonActive.className = 'active';
  linkList.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
      document.querySelector('.active').className = '';
      e.target.className = 'active';
      showPage(list, e.target.textContent);
    }
  });
}

/*
* Filters data to display only searched for names
* @param name - value passed in from user. Name to search for in list
*/
function searchFilter(name){
    searchButton.className = 'active';
    let result = [];
    for(let i = 0; i < data.length; i++){
      const searchName = `${data[i].name.first.toLowerCase()} ${data[i].name.last.toLowerCase()}`;
      if(searchName.includes(name.toLowerCase())){
        result.push(data[i]);
      }
    }
    if(result.length === 0){
      const noResult = `<span class="no-results">No results found.</span>`
      studentList.insertAdjacentHTML('beforeend', noResult);
    }
    return result;
}

//Event listeners added to search bar and search button
searchButton.addEventListener('click', () => {
  showPage(searchFilter(searchID.value), 1);
  addPagination(searchFilter(searchID.value));
});

searchID.addEventListener('keyup', () => {
  showPage(searchFilter(searchID.value), 1);
  addPagination(searchFilter(searchID.value));
});

//call functions to display data
showPage(data, 1);
addPagination(data);
