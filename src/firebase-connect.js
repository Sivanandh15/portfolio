 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
  import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

  // Your Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyBBYg3p1nh9f34yz5Du4wtiZPkfT2kSdL4",
    authDomain: "sivanandh-portfolio.firebaseapp.com",
    projectId: "sivanandh-portfolio",
    storageBucket: "sivanandh-portfolio.appspot.com",
    messagingSenderId: "511502472743",
    appId: "1:511502472743:web:5a2b06171d900ae247e002",
    measurementId: "G-EGM6CHDVNM"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);

  // Select form and alerts
  const form = document.querySelector("form");
  const successAlert = document.getElementById("succesalert");
  const failureAlert = document.getElementById("unsuccessalert");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    try {
      // Save data to Firestore
      await addDoc(collection(db, "contacts"), {
        firstName,
        lastName,
        email,
        subject,
        message,
        timestamp: new Date()
      });

      // Show success alert
      successAlert.classList.remove("hidden");
      setTimeout(() => successAlert.classList.add("hidden"), 3000);

      form.reset();
    } catch (err) {
      console.error("Error sending message:", err);

      // Show failure alert
      failureAlert.classList.remove("hidden");
      setTimeout(() => failureAlert.classList.add("hidden"), 3000);
    }
  });