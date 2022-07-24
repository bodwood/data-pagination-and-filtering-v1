/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
* Displays a page of nine students
* @param list - represents student data
* @param page - represents page number
*/
function showPage(list, page){
  let startIndex = (page * 9) - 9;
  let endIndex = (page * 9);
  let studentList = document.querySelector('.student-list');
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
  document.querySelector('button').className = 'active';
  linkList.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
      document.querySelector('.active').className = '';
      e.target.className = 'active';
      showPage(list, e.target.textContent);
    }
  });
}

//call functions to display data
showPage(data, 1);
addPagination(data);
