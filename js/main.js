// vars
const toggleBtn = document.querySelector(".toggle-menu button");
const menuItems = document.querySelectorAll(".menu-items ul a");
const submitButton = document.getElementById("submit-btn");

//   Control the mobile menu
toggleBtn.addEventListener("click", function () {
  const menu = document.getElementById("mobile-menu-2");
  menu.classList.toggle("hidden");

  // control the icon toggle
  if (menu.classList.contains("hidden")) {
    toggleBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
  } else {
    toggleBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  }
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

// Initialize EmailJS with your user ID
// emailjs.init("B5mlJVPHawvC7A7ig"); // replace it with YOUR_PUBLIC_KEY EmailJS

submitButton.addEventListener("click", function () {
  // disable the button
  this.setAttribute("aria-disabled", "true");
  this.setAttribute("disabled", "");
  // this.textContent = "جاري الإرسال...";
  this.classList.add("opacity-50");

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const feedback = document.getElementById("feedback").value;
  const status = document.getElementById("status");

  if (!name || !phone || !feedback) {
    submitButton.setAttribute("disabled", "true");
    status.textContent = "يرجى ملء جميع الحقول";
    status.classList.add("text-red-500");

    setTimeout(() => {
      this.classList.remove("opacity-50", "cursor-not-allowed");
      this.removeAttribute("aria-disabled");
      this.removeAttribute("disabled");
    }, 500);

    return;
  }

  // service ID: service_8k4245m

  // (service-id, template-id, user-id)
  // Send message by EmailJS
  emailjs
    .send("service_f9mfcvd", "template_f7i1e0m", {
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
        setTimeout(() => {
          submitButton.classList.remove("opacity-50");
          submitButton.removeAttribute("aria-disabled");
          submitButton.removeAttribute("disabled");
        }, 500);
      },
      function (error) {
        status.textContent = "حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى";
        status.classList.add("text-red-500");

        setTimeout(() => {
          submitButton.classList.remove("opacity-50");
          submitButton.removeAttribute("aria-disabled");
          submitButton.removeAttribute("disabled");
        }, 500);
      }
    );
});
// contact form

// block adding string

document.getElementById("phone").addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
});
