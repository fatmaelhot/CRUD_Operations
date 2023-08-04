// declare global variables
var siteName = document.getElementById("SiteName");
var siteUrl = document.getElementById("siteUrl");
var addBtn = document.getElementById("addBtn");
var editBtn = document.getElementById("editBtn");
var currentIndex;
var modalBox = document.getElementById("modalBox");
var closeBtn = document.getElementById("closeBtn");
var repeatWarning = document.getElementById("repeatWarning");


bookmarksContainer = [];

if (localStorage.getItem("bookmarks") !== null) {
  bookmarksContainer = JSON.parse(localStorage.getItem("bookmarks"));
  displayBookmarks(bookmarksContainer);
}


function createBookmark() {
  if (validateSiteName() === true && validateSiteUrl() === true) {
    var bookmark = {
      bookmarkName: siteName.value,
      bookmarkUrl: siteUrl.value,
    };
    bookmarksContainer.push(bookmark);
    displayBookmarks(bookmarksContainer);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksContainer));
    resetBookmark();
    resetStyle(siteName, "nameCheckIcon", "nameAlertIcon");
    resetStyle(siteUrl, "urlCheckIcon", "urlAlertIcon");
    siteName.onfocus = function () {
      setInputFocus(siteName);
    };
    siteUrl.onfocus = function () {
      setInputFocus(siteUrl);
    };
  } else {
    displayModalBox();
  }
}


addBtn.addEventListener("click", createBookmark);

function displayBookmarks(arr) {
  var tableRows = ``;
  for (let i = 0; i < arr.length; i++) {
    tableRows += `
        <tr>
        <td>${i + 1}</td>
        <td>${arr[i].bookmarkName}</td>
        <td>
          <a href="${
            arr[i].bookmarkUrl
          }" target="_blank" class="btn btn-outline-dark btn-sm visitBtn fs-6">
            Visit
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </td>
        <td>
          <button class="btn btn-outline-warning btn-sm fs-6 editBtn" onclick="setEditBookmark(${i})">
            Edit
            <i class="fa-solid fa-edit"></i>
          </button>
        </td>
        <td>
          <button class="btn btn-outline-danger btn-sm fs-6" onclick="deleteBookmark(${i})">
            Delete
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
        `;
  }
  document.getElementById("tableBody").innerHTML = tableRows;
}

function deleteBookmark(index) {
  bookmarksContainer.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksContainer));
  displayBookmarks(bookmarksContainer);
}

function resetBookmark() {
  siteName.value = "";
  siteUrl.value = "";
}

function setEditBookmark(indexValue) {
  currentIndex = indexValue;
  siteName.value = bookmarksContainer[indexValue].bookmarkName;
  siteUrl.value = bookmarksContainer[indexValue].bookmarkUrl;
  addBtn.classList.replace("d-block", "d-none");
  editBtn.classList.replace("d-none", "d-block");

  directValidateInputs(
    validateSiteName,
    siteName,
    "nameAlertIcon",
    "nameCheckIcon"
  );
  directValidateInputs(
    validateSiteUrl,
    siteUrl,
    "urlAlertIcon",
    "urlCheckIcon"
  );

  siteName.onfocus = function () {
    directValidateInputs(
      validateSiteName,
      siteName,
      "nameAlertIcon",
      "nameCheckIcon"
    );
  };
  siteUrl.onfocus = function () {
    directValidateInputs(
      validateSiteUrl,
      siteUrl,
      "urlAlertIcon",
      "urlCheckIcon"
    );
  };
}

function saveEditedBookmark() {
  if (validateSiteName() === true && validateSiteUrl() === true) {
    bookmarksContainer[currentIndex].bookmarkName = siteName.value;
    bookmarksContainer[currentIndex].bookmarkUrl = siteUrl.value;
    editBtn.classList.replace("d-block", "d-none");
    addBtn.classList.replace("d-none", "d-block");
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksContainer));
    displayBookmarks(bookmarksContainer);
    resetBookmark();
    resetStyle(siteName, "nameCheckIcon", "nameAlertIcon");
    resetStyle(siteUrl, "urlCheckIcon", "urlAlertIcon");
    siteName.onfocus = function () {
      setInputFocus(siteName);
    };
    siteUrl.onfocus = function () {
      setInputFocus(siteUrl);
    };
  } else {
    displayModalBox();
  }
}

editBtn.addEventListener("click", saveEditedBookmark);


function validateSiteName() {
  var regexName = /^[A-Za-z0-9_]{3,}[A-Za-z0-9_\s]{0,}$/gm;
  return regexName.test(siteName.value);
}


function validateSiteUrl() {
  var regexUrl = /^(https:\/\/){1}[a-zA-Z0-9_?\/]{1,}\.[a-zA-Z0-9_?\/]{2,}$/gm;
  return regexUrl.test(siteUrl.value);
}

function directValidateInputs(ValidateFunction, input, alertId, checkId) {
  if (ValidateFunction() === true) {
    input.style.boxShadow = "0 0 0 0.25rem rgba(25,135,84,.25)";
    document.getElementById(checkId).classList.replace("d-none", "d-block");
    document.getElementById(alertId).classList.replace("d-block", "d-none");
  } else {
    input.style.boxShadow = "0 0 0 0.25rem rgba(220,53,69,.25)";
    document.getElementById(alertId).classList.replace("d-none", "d-block");
    document.getElementById(checkId).classList.replace("d-block", "d-none");
  }
}

siteName.oninput = function () {
  directValidateInputs(
    validateSiteName,
    siteName,
    "nameAlertIcon",
    "nameCheckIcon"
  );
};
siteUrl.oninput = function () {
  directValidateInputs(
    validateSiteUrl,
    siteUrl,
    "urlAlertIcon",
    "urlCheckIcon"
  );
};

function resetStyle(inputField, checkId, alertId) {
  document.getElementById(checkId).classList.replace("d-block", "d-none");
  document.getElementById(alertId).classList.replace("d-block", "d-none");
  inputField.style.boxShadow = "none";
}

function setInputFocus(input) {
  input.style.boxShadow = "0 0 0 0.25rem var(--shadowColor)";
}

function displayModalBox() {
  modalBox.classList.replace("invisible", "visible");
  modalBox.classList.replace("opacity-0", "opacity-100");
}

function closeModal() {
  modalBox.classList.replace("visible", "invisible");
  modalBox.classList.replace("opacity-100", "opacity-0");
}

closeBtn.onclick = closeModal;