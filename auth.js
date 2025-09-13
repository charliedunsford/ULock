const signupForm = document.getElementById("signup__form");
const signinForm = document.getElementById("signin__form");
const showSignin = document.getElementById("show--signin");
const showSignup = document.getElementById("show--signup");

const params = new URLSearchParams(window.location.search);
const form = params.get("form");

if (form === "signin") {
	signupForm.classList.add("hidden");
	signinForm.classList.remove("hidden");
} else {
	signupForm.classList.remove("hidden");
	signinForm.classList.add("hidden");
}

if (showSignin) {
	showSignin.addEventListener("click", function (e) {
		e.preventDefault();
		signupForm.classList.add("hidden");
		signinForm.classList.remove("hidden");
	});
}

if(showSignup) {
	showSignup.addEventListener("click", function(e) {
		e.preventDefault();
		signinForm.classList.add("hidden");
		signupForm.classList.remove("hidden");
	});
}
