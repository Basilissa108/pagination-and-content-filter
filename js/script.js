// assign all elements on the page with the class "student-item" to the variable students
var students = document.getElementsByClassName("student-item");

// function to show and hide students
function showPage(students, page) {
  // determin min and max index of students to show based on the page number
  var min = (page - 1) * 10;
  var max = min + 9;
  // loop over students array
  for(i = 0; i < students.length; i++) {
    if(i < min || i > max) {
      // set display property to "none" to hide the element
      students[i].style.display = "none";
    } else {
      // set display property to "block" to show the element
      students[i].style.display = "block";
    } 
  };
}

// function to add pagination to the page
function appendPageLinks(students) {
  var pageCount = Math.ceil(students.length / 10);
  // create the container element for the pagination links
  var pageination = `<div class="pagination"><ul>{{links}}</ul></div>`;
  // create an empty links variable to store links in
  var links = ``;
  // create page links in a loop and add them to the links variable
  for(i = 1; i < (pageCount + 1); i++) {
    // if the index equals 1 add a link with the active class
    if(i === 1) {
      links += `<li>
                  <a class="active" href="#">${i}</a>
                </li>`;
    } else {
      links += `<li>
                  <a href="#">${i}</a>
                </li>`;
    }
  }
  // replace placeholder with links string literal
  pageination = pageination.replace("{{links}}", links);
  // get the page element using the classname page
  var page = document.querySelector(".page");
  // set the innerHTML of the page element to its content and the pageination string literal
  page.insertAdjacentHTML("beforeEnd", pageination);
  // get all links
  var links = document.getElementsByClassName("pagination")[0].getElementsByTagName("a");
  // loop over links and add event listeners
  for(i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function(e){
      // update the list of students
      showPage(students, parseInt(e.target.text))
      // remove "active" class from 
      document.getElementsByClassName("active")[0].classList.remove("active");
      // add "active" class to clicked link
      this.classList.add("active");
    });
  }
}

// function to add search field to the page
function addSearch() {
  // append search bar to the header
  document.getElementsByClassName("page-header")[0].innerHTML += `<div class="student-search">
                                                                    <input placeholder="Search for students...">
                                                                    <button>Search</button>
                                                                  </div>`;
  // add event listener to search button
  document.querySelector(".student-search button").addEventListener("click", function() {
    // get input
    var input = document.querySelector(".student-search input").value;
    searchStudents(input);
  }, false);
  // add event listener to input
  document.querySelector(".student-search input").addEventListener("keyup", function(e) {
    searchStudents(e.target.value);
  }, false);
}

// function to search for student
function searchStudents(query) {
  // define search pattern
  var pattern = new RegExp(query, "ig");
  // create empty matches array
	var matches = [];
	// loop through all students
	for(i = 0; i < students.length; i++){
    // get student name
    var studentName = students[i].querySelector(".student-details h3").innerHTML;
		// get student mail
		var studentMail = students[i].querySelector(".student-details .email").innerHTML;
		// check if name matches search pattern
		var matchResultName = pattern.test(studentName);
		// check if mail matches search pattern
    var matchResultMail = pattern.test(studentMail);
		// check if name or mail match
		if(matchResultName || matchResultMail){
      // push student to matches array
			matches.push(students[i]);
    }
  }
  // call the displaySearchResults function
  displaySearchResults(students, matches);
}

function displaySearchResults(students, results) {
  // loop over students array
  for(i = 0; i < students.length; i++) {
    // check if the results array contains the student to decide whether or not to show the student
    if(results.includes(students[i])) {
      // set display property to "block" to show the element
      students[i].style.display = "block";
    } else {
      // set display property to "none" to hide the element
      students[i].style.display = "none";
    } 
  };
  // get pagination element
  var pagination = document.querySelector(".pagination");
  // check if pagination exists
  if(pagination) {
    // remove pagination
    pagination.remove();
  }
  // get no-results element
  var noResultsElement = document.querySelector(".no-results");
  // check if there are any results
  if(results.length < 1) {
    // append no-results message if the element doesn't exist yet
    if(!noResultsElement) {
      var noResultsNotice = `<p class="no-results">No results match your search.</p>`;
      document.querySelector(".page").insertAdjacentHTML("beforeEnd", noResultsNotice);
    }
  } else {
    // remove no-results element if it exists
    if(noResultsElement) {
      noResultsElement.remove();
    }
    // add pagination
    appendPageLinks(results);
  }
}

/********************************************************** EXECUTE ON PAGE LOAD **********************************************************/
/******************************************************************************************************************************************/

document.addEventListener("DOMContentLoaded", function() {
  // call the appendPageLinks function to append pagination links to the bottom of the page
  appendPageLinks(students);
  // call showPage function to display the first page
  showPage(students, 1);
  // call the addSearch function to append search field
  addSearch();
});