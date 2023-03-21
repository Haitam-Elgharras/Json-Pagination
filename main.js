//start pagination
// selecting required element
const parUl = document.querySelector(".pagination ");
const element = document.createElement("ul");
loading = document.querySelector(".loading");
let nPost = 10;
/* <div class="pagination">
      <ul></ul>
    </div> */
let totalPages = 20;
let page = 10;

//calling function with passing parameters and adding inside element which is ul tag
function createPagination(totalPages, page) {
  const there = async () => {
    loading.style.setProperty("display", "flex");
    await fetchPosts(page);
    loading.style.setProperty("display", "none");
  };
  there();
  let liTag = "";
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;
  if (page > 1) {
    //show the next button if the page value is greater than 1
    liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${
      page - 1
    })"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
  }

  if (page > 2) {
    //if page value is greater than 2 then add 1 after the previous button
    liTag += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
    if (page > 3) {
      //if page value is greater than 3 then add  (...) after the first li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  // how many pages or li show before the current li
  if (page == totalPages) {
    //with 20 we want also 17
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }
  // how many pages or li show after the current li
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }

  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      //if plength is greater than totalPage length then break
      break;
    }
    if (plength == 0) {
      //if plength is 0 than add +1 in plength value
      continue;
    }
    if (page == plength) {
      //if page is equal to plength than assign active string in the active variable
      active = "active";
    } else {
      //else leave empty to the active variable
      active = "";
    }
    liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength})"><span>${plength}</span></li>`;
  }

  if (page < totalPages - 1) {
    //if page value is less than totalPage value by -1 then show the last li or page
    if (page < totalPages - 2) {
      //if page value is less than totalPage value by -2 then add this (...) before the last li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) {
    //show the next button if the page value is less than totalPage(20)
    liTag += `<li class="btn next" onclick="createPagination(totalPages, ${
      page + 1
    })"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
  }
  element.innerHTML = liTag; //add li tag inside ul tag
  return liTag; //reurn the li tag
}
//end pagination

const mainElement = document.querySelector(".myPagination");
let fetchPosts = async (number) => {
  mainElement.innerHTML = "";
  let posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(
    async (response) => {
      let myData = await response.json();
      return myData;
    }
  );
  let users = await fetch("https://jsonplaceholder.typicode.com/users").then(
    async (response) => {
      let myData = await response.json();
      return myData;
    }
  );
  let comments = await fetch(
    "https://jsonplaceholder.typicode.com/comments"
  ).then(async (response) => {
    let myData = await response.json();
    return myData;
  });
  // let i = 0;
  for (let j = number * 5 - 5; j < number * 5; j++) {
    console.log(j);
    let post = posts[j];
    const { userId, id, title, body: content } = post;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == userId) {
        userName = users[i].name;
        break;
      }
    }
    var mainDivComments = "<div>";
    let allComments = () => {
      for (let i = 0; i < comments.length; i++) {
        if (post.id == comments[i].postId) {
          let commentOwner = `<h4 style=''>${comments[i].name}</h4>`;
          mainDivComments += commentOwner;
          let p =
            "<p style='text-align:center ; border-bottom:1px solid rgb(32, 178, 170, 0.9) ; margin-bottom:20px; padding-bottom : 10px ; line-height:1.8;'>";
          p += comments[i].body + "</p>";
          mainDivComments += p;
        }
      }
      mainDivComments += "</div>";
    };
    allComments();

    mainElement.innerHTML += `<div class="card" style="width: 50rem; background-color: #fff ; margin : 10px auto;padding:0 10px 10px">
    <img src="https://picsum.photos/800/300?${id}" class="card-img-top" alt="...">
    <div class="card-body">
    <h3 class="card-title" >${userName}</h3>
      <h5 class="card-title" >${title}</h5>
      <p class="card-text">${content}</p>
    </div>
    <p>
    <button class="btn btn-primary" type="button" style="margin:0 auto ; display : block; width:fit-content ; background-color:rgb(32, 178, 170)" data-bs-toggle="collapse" data-bs-target="#collapseExample${id}" aria-expanded="false" aria-controls="collapseExample">
    show comments
    </button>
    </p>
    <div class="collapse" id="collapseExample${id}">
      <div class="card card-body">
    ${mainDivComments}
      </div> </div>
 
    </div>`;
  }
};

const hidAnimation = () => {
  loading.style.setProperty("display", "none");
};

const order = async () => {
  await fetchPosts(10);
  element.innerHTML = createPagination(totalPages, page);
  parUl.append(element);
  hidAnimation();
};
order();
