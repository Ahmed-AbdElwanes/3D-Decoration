// vars
const toggleBtn = document.querySelector(".toggle-menu button");
const menuItems = document.querySelectorAll(".menu-items ul a");
const submitButton = document.getElementById("submit-btn");

//   Control the mobile menu
toggleBtn.addEventListener("click", function () {
  const menu = document.getElementById("mobile-menu-2");
  menu.classList.toggle("hidden");
});

//   Close the mobile menu when a menu item is clicked
//   && remove active class from all items
menuItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    menuItems.forEach((item) => item.classList.remove("active"));
    e.target.classList.add("active");
    toggleBtn.click();
    console.log("Menu item clicked:", this.textContent);
  });
});

// control services appearance
const serviceButtons = document.querySelectorAll(".carts button");
let serviceNumber = 1;

serviceButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    serviceNumber = +e.target.dataset.serve;
    // window.location.href = "services.html#service" + serviceNumber;
    window.open("services.html#service" + serviceNumber, "_blank");
  });
});

if (serviceNumber === 1) {
  //  service 1 chosen
  console.log("Service 1 selected");
} else if (serviceNumber === 2) {
  //  service 2 chosen
  console.log("Service 2 selected");
}

// contact form

// تهيئة EmailJS باستخدام المفتاح العام
// emailjs.init("B5mlJVPHawvC7A7ig"); // استبدل YOUR_PUBLIC_KEY بالمفتاح العام من EmailJS

submitButton.addEventListener("click", function () {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const feedback = document.getElementById("feedback").value;
  const status = document.getElementById("status");

  if (!name || !phone || !feedback) {
    submitButton.setAttribute("disabled", "true");
    status.textContent = "يرجى ملء جميع الحقول";
    status.classList.add("text-red-500");
    return;
  }

  // إرسال البيانات عبر EmailJS
  emailjs
    .send("service_tsyz6jj", "template_qynje98", {
      name: name,
      phone: phone,
      feedback: feedback
    })
    .then(
      function (response) {
        status.textContent = "تم إرسال رأيك بنجاح!";
        status.classList.remove("text-red-500");
        status.classList.add("text-green-500");
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("feedback").value = "";
      },
      function (error) {
        status.textContent = "حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى";
        status.classList.add("text-red-500");
      }
    );
});
// contact form

// block adding string

document.getElementById("phone").addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
});
