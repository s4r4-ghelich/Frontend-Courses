import { courses } from "/js/data.js";
// select
let items = document.querySelector(".items");
const pendingCheckBox = document.getElementById("pending");
const completedCheckBox = document.getElementById("completed");
const discountCheckBox = document.getElementById("discount");
const freeCheckBox = document.getElementById("free");

//checkbox events------------

pendingCheckBox.addEventListener("input", () => {
  recordFilter(pendingCheckBox);
});

completedCheckBox.addEventListener("input", () => {
  recordFilter(completedCheckBox);
});
freeCheckBox.addEventListener("input", freeFilter);

discountCheckBox.addEventListener("input", () => {
  if (discountCheckBox.checked == true) {
    const Courses = courses.filter((c) => {
      return c.discount !== 0;
    });
    console.log(Courses);
    saveToLocalStorage(Courses);
    render(Courses);
  }
});

function recordFilter(checkBox) {
  if (checkBox.checked == true) {
    const Courses = courses.filter((c) => {
      return c.status == checkBox.value;
    });
    console.log(Courses);
    saveToLocalStorage(Courses);
    render(Courses);
  } else if (checkBox.checked == false) {
    saveToLocalStorage(courses);
    render(courses);
  }
}

function freeFilter() {
  if (freeCheckBox.checked == true) {
    const Courses = courses.filter((c) => {
      return c.discount == 0;
    });
    console.log(Courses);
    saveToLocalStorage(Courses);
    render(Courses);
  } else if (freeCheckBox.checked == false) {
    saveToLocalStorage(courses);
    render(courses);
  }
}
// -------------------------
function getCourses(courses) {
  return courses;
}
document.addEventListener("DOMContentLoaded", () => {
  getCourses(courses);
  render(courses);
  getToStorage();
});

// render------------------
function render(courses) {
  items.innerHTML = "";
  let result = "";
  courses.forEach((course) => {
    result += `<div class="item__box" data-id=${course.id}>
      <div class="item__image">
        <img src="${course.coverImage}" alt="" />
      </div>
      <div class="item__description">
        <p>مشاهده اطلاعات دوره</p>
        <h4>${course.title}</h4>
        <div class="review">
          <div class="review__item">
            <span class="review__text">${course.likeCount}</span
            ><span><i class="fa-solid fa-heart"></i></span>
          </div>
          <div class="review__item">
            <span class="review__text">${course.studentsCount}</span
            ><span><i class="fa-solid fa-users"></i></span>
          </div>
          <div class="review__item">
            <span class="review__text">${course.status} </span
            ><span><i class="fa-solid fa-microphone"></i></span>
          </div>
        </div>
        <div class="register">
          <button class="register__btn">ثبت نام دوره</button>
${
  course.discount != 0
    ? `<div class="new-price">
    <div class="discount-price">
      <span class="discount">${course.discount}%</span>
      <div><span>500000</span><span>تومان</span></div>
    </div>
    <div class="cost">
    <span class="item__price" style="text-decoration: line-through">${course.price}</span>
    <span class="item__duration">تومان</span>
    </div>
    </div>`
    : `  <div class="cost">
    <span class="item__price">${course.price}</span>
    <span class="item__duration">تومان</span>
    </div>`
}
          
        </div>
      </div>
    </div>`;
  });

  items.innerHTML += result;
  saveToLocalStorage(items);
  //   discount
  // const discountWraper = document.querySelector(".discount-wraper");
  // const cost = document.querySelector(".cost");

  // const discountCourses = courses.filter((c) => {
  //   return c.discount !== 0;
  // });
  // discountCourses.forEach((course) => {
  //   items.innerHTML += `<div class="new-price">
  //   <div class="discount-price">
  //     <span class="discount">${course.discount}</span>
  //     <div><span >500000</span><span>تومان</span></div>
  //   </div>
  // </div>`;
  // });
  // discountWraper.innerHTML += ``;
}

// const discountWraper = document.querySelector(".discount");
// console.log(discountWraper);
// storage------------------------

function saveToLocalStorage(courses) {
  localStorage.setItem("courses", JSON.stringify(courses));
}

function getToStorage() {
  return JSON.parse(localStorage.getItem("courses"));
}
