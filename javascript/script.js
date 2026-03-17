/* ====================================================
javascript sheet "script.js" for "Instagram clone"
Author: Annette Lasar
Date: July 2023
====================================================== */
/* ======================================================
onload functions 'init'
========================================================== */

async function initIndex() {
  await includeHTML();
  darkHomeLogo();
  renderSuggestions();
}

async function initExplore() {
  await includeHTML();
  loadComments();
  darkExploreLogo();
  renderDiscoveries();
  openImageDiscoveries(0);
  closeDiscoveryBox();
}

async function initReels() {
  await includeHTML();
  darkReelsLogo();
  renderReels();
}

async function initInbox() {
  await includeHTML();
  darkInboxLogo();
}

/* ----------------------------------------------------------------
includes navigation and footer into each page
------------------------------------------------------------------- */
async function includeHTML() {
  let includeElements = document.querySelectorAll('[w3-include-html]');
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute('w3-include-html'); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = 'Page not found';
    }
  }
}

/* =====================================================================
general function 'not available'
======================================================================== */
function notAvailable() {
  alert(
    'Diese Funktion ist leider noch nicht verfügbar. Wir bitten um Ihr Verständnis.'
  );
}

/* ========================================================================
auxiliary function to get ID of any container
=========================================================================== */
function getBoxId(id) {
  let boxID = document.getElementById(id);
  return boxID;
}
/* ======================================================================
exchanges light logos for dark logos
========================================================================= */
function darkHomeLogo() {
  let homeLogo = getBoxId('home_logo');
  let url = window.location.href;
  if (url.endsWith('index.html')) {
    homeLogo.src = '../icons/instagram_home_dark.svg';
  } else {
    homeLogo.src = '../icons/instagram_home_light.svg';
  }
}

function darkExploreLogo() {
  let exploreLogo = getBoxId('explore_logo');
  let url = window.location.href;
  if (url.endsWith('explore.html')) {
    exploreLogo.src = '../icons/instagram_discover_dark.svg';
  } else {
    exploreLogo.src = '../icons/instagram_discover_light.svg';
  }
}

function darkReelsLogo() {
  let reelsLogo = getBoxId('reels_logo');
  let url = window.location.href;
  if (url.endsWith('reels.html')) {
    reelsLogo.src = '../icons/instagram_reels_dark.svg';
  } else {
    reelsLogo.src = '../icons/instagram_reels_light.svg';
  }
}

function darkInboxLogo() {
  let inboxLogo = getBoxId('inbox_logo');
  let url = window.location.href;
  if (url.endsWith('inbox.html')) {
    inboxLogo.src = '../icons/instagram_direct_dark.svg';
  } else {
    inboxLogo.src = '../icons/instagram_direct_light.svg';
  }
}

/* ===============================================================
renders suggestions for user on index.html
================================================================== */
function renderSuggestions() {
  let newSuggestions = getBoxId('suggestions_html');
  newSuggestions.innerHTML = '';
  for (let i = 0; i < posts.length; i++) {
    const instagramSuggestions = posts[i];
    newSuggestions.innerHTML +=
      generateInstagramSuggestionsHTML(instagramSuggestions);
  }
}

function generateInstagramSuggestionsHTML(instagramSuggestions) {
  return /* html */ `
    <article>
      <figure>
        <img src="${instagramSuggestions.user_icon}" alt="">
      </figure>
      <div class="author_html">
        <div class="name">${instagramSuggestions.name}</div>
        <div class="realName">${instagramSuggestions.realName}</div>
        <div class="status">${instagramSuggestions.status}</div>
      </div>
      <button onclick="notAvailable()" class="follow_html">Folgen</button>
    </article>
    `;
}

/* ======================================================================
renders posts on explore.html
======================================================================== */
function renderDiscoveries() {
  let discoveryPosts = getBoxId('main_content_explore');
  discoveryPosts.innerHTML = '';
  for (i = 0; i < posts.length; i++) {
    const instagramPosts = posts[i];
    discoveryPosts.innerHTML += generateDiscoveryPosts(i, instagramPosts);
  }
}

function generateDiscoveryPosts(i, instagramPosts) {
  return /*html*/ `
  <figure class="${instagramPosts.image_format}" >
    <img onclick="openImageDiscoveries(${i})" src="${instagramPosts.images}" alt="">
  </figure>
  `;
}

/* ========================================================================
opens posts on explore.html and displays detailed view
============================================================================ */
function openImageDiscoveries(i) {
  let detailDiscoveryBox = getBoxId('detail-explore');
  detailDiscoveryBox.innerHTML = '';
  detailDiscoveryBox.classList.remove('d-none');
  let post = posts[i];
  let heartIcon = post.liked
    ? '../icons/instagram_like_red.svg'
    : '../icons/instagram_like_light.svg';

  detailDiscoveryBox.innerHTML += generateDetailDiscoveryBoxHTML(
    i,
    post,
    heartIcon
  );
  moveImageBox();
  hideArrows(i);
  hideOrShowCommentsBox(i, post);
}

function generateDetailDiscoveryBoxHTML(i, post, heartIcon) {
  return /* html */ `
  <div class="discovery-wrapper ${post.image_format}">
  <figure id="figure_big_screen" class="d-none">
    <img src="${post.images}" alt="">
  </figure>
  <div class="content-wrapper-discoveries">
    <div class="discovery_title">
        <img src="${post.user_icon}" alt="">
        <p class="discovery_name">${post.name}</p>
        <button onclick="notAvailable()" class="discovery-follow">Folgen</button>
        <img src="../icons/instagram_three_dots.svg" alt="">
    </div>
    <figure id="figure_small_screen" class="figure-detail-explore">
       <img src="${post.images}" alt="">
    </figure>
    <img onclick="closeDiscoveryBox()" class="closeDiscoveryBox" src="../icons/instagram_x_close.svg" alt="">
    <figure id="arrow_previous_${i}" class="previousDiscoveryBox">
       <img onclick="previousDiscoveryBox(${i})"  src="../icons/instagram_arrow_up.svg" alt="">
    </figure>
    <figure id="arrow_next_${i}" class="nextDiscoveryBox">
       <img onclick="nextDiscoveryBox(${i})" src="../icons/instagram_arrow_up.svg" alt="">
    </figure>
    <div class="discovery-text-wrapper">
      <div class="discovery-icons-wrapper">
        <div class="discovery-icons">
          <img onclick="likePost(${i})" src="${heartIcon}" alt="" title="Gefällt mir">
          <img onclick="showCommentsBox()" src="../icons/instagram_comment.svg" alt="" title="Kommentieren">
          <img onclick="notAvailable()" src="../icons/instagram_direct_light.svg" alt="" title="Beitrag teilen">
        </div>
        <div class="discovery-post-information">
          <p>Gefällt ${post.likes} Mal</p>
          <p>erstellt am ${post.date}</p>
        </div>
      </div>
      <div id="discovery_comments_box" class="discovery-comments-wrapper d-none">
        <div class="input-wrapper">
          <input id="inputfield_discovery${i}" type="text" placeholder="Kommentieren">
          <button onclick="addComment(${i})" class="post-button">Posten</button>
        </div>  
          <div id="discovery_comments${i}" class="discovery-comments">
        </div>
      </div>
     </div>
    </div>
  </div>
  `;
}

/* =======================================================================
closes detailed view of posts on explore.html
======================================================================== */
function closeDiscoveryBox() {
  getBoxId('detail-explore').classList.add('d-none');
}

/* ========================================================================
function in order to like or dislike a post
========================================================================== */
function likePost(i) {
  let currentLikes = posts[i].likes;
  let newLikes;
  let likedStatus = posts[i].liked;

  if (likedStatus) {
    newLikes = currentLikes - 1;
    likedStatus = false;
  } else {
    newLikes = currentLikes + 1;
    likedStatus = true;
  }
  posts[i].likes = newLikes;
  posts[i].liked = likedStatus;
  saveComments();
  openImageDiscoveries(i);
}

/* ======================================================================
opens or closes comments box on detailed view of post
========================================================================= */
function showCommentsBox() {
  let inputComments = getBoxId('discovery_comments_box');
  if (inputComments.classList.contains('d-none')) {
    inputComments.classList.remove('d-none');
  } else {
    if (!inputComments.classList.contains('d-none')) {
      inputComments.classList.add('d-none');
    }
  }
}

/* ========================================================================
shows previous or next discovery box in a detailed view of a post
========================================================================== */
function previousDiscoveryBox(i) {
  let previousPostIndex = (i - 1 + posts.length) % posts.length;
  openImageDiscoveries(previousPostIndex);
}

function nextDiscoveryBox(i) {
  let nextPostIndex = (i + 1 + posts.length) % posts.length;
  openImageDiscoveries(nextPostIndex);
}

/* =========================================================================
function to add a comment to a post
============================================================================= */
function addComment(i) {
  let input = getBoxId(`inputfield_discovery${i}`);
  let newComment = input.value.trim();

  if (newComment === '') {
    alert('Bitte geben Sie einen Kommentar ein!');
  } else if (newComment !== '') {
    posts[i].comments.push(newComment);
    updateComments(i);
    input.value = '';
  }
  saveComments();
}

/* =========================================================================
show comment box if there are comments and hide it if there aren't
============================================================================= */
function hideOrShowCommentsBox(i, post) {
  let commentsBox = getBoxId(`discovery_comments_box`);

  if (post.comments.length > 0) {
    commentsBox.classList.remove('d-none');
    let commentsHTML = '';
    for (let comment of post.comments) {
      commentsHTML += `<p>${comment}</p>`;
    }
    let commentsContainer = getBoxId(`discovery_comments${i}`);
    commentsContainer.insertAdjacentHTML('afterbegin', commentsHTML);
  } else {
    commentsBox.classList.add('d-none');
  }
}

/* ==========================================================================
function to update a comment
=========================================================================== */
function updateComments(i) {
  let commentBox = getBoxId(`discovery_comments${i}`);
  let newComment = posts[i].comments[posts[i].comments.length - 1];
  commentBox.insertAdjacentHTML('afterbegin', `<p>${newComment}</p>`);
}

/* ==========================================================================
saves comments in local storage
=========================================================================== */
function saveComments() {
  let postsAsText = JSON.stringify(posts);
  localStorage.setItem('posts', postsAsText);
}

/* ==========================================================================
loads comments from local storage
=========================================================================== */
function loadComments() {
  let postsAsText = localStorage.getItem('posts');
  if (postsAsText) {
    posts = JSON.parse(postsAsText);
  }
  renderDiscoveries();
}

/* ============================================================================
displays image of post either left of the text or between title and comment section
according to window width in the detailed view of a post
============================================================================== */
function moveImageBox() {
  let smallScreen = getBoxId('figure_small_screen');
  let bigScreen = getBoxId('figure_big_screen');
  let windowSize = window.innerWidth;
 
  if (windowSize < 592) {
    smallScreen.classList.remove('d-none');
    bigScreen.classList.add('d-none');
  } else {
    smallScreen.classList.add('d-none');
    bigScreen.classList.remove('d-none');
  }
}

checkforExplorePage();

function checkforExplorePage() {
  let url = window.location.href; 

  if (url.endsWith('explore.html')) {
     document.addEventListener('DOMContentLoaded', function () {
        window.addEventListener('resize', moveImageBox);
     });
  }
}

/* =================================================================================
hides left and right arrow on first and last post
=================================================================================== */
function hideArrows(i) {
  let arrowNext = getBoxId(`arrow_next_${i}`);
  let arrowPrevious = getBoxId(`arrow_previous_${i}`);
  if (i === posts.length - 1) {
    arrowNext.classList.add('d-none');
  }
  if (i === 0) {
    arrowPrevious.classList.add('d-none');
  }
}

/* ========================================================================
renders reels and displays them in the browser
========================================================================= */
function renderReels() {
  let reelsPosts = getBoxId('main_content_reels');
  reelsPosts.innerHTML = '';
  for (let post of posts) {
    reelsPosts.innerHTML += generateReelsHTML(post);
  }
}

function generateReelsHTML(post) {
  return /* html */ `
    <div class="video-container">
      <h2>${post.name}</h2>
      <video controls autoplay loop muted>
        <source src="${post.videos}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>`;
}
