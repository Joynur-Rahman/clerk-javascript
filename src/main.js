import './style.css';
// import javascriptLogo from './javascript.svg';
// import viteLogo from '/vite.svg';
import { Clerk } from '@clerk/clerk-js';

async function initializeClerk() {
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  console.log("Clerk Key:", clerkPubKey);

  const clerk = new Clerk(clerkPubKey);
  await clerk.load();

  const app = document.getElementById("app");

  if (clerk.user) {
    console.log("✅ User detected!");

    app.innerHTML = `
      <div id="user-button" style="margin-bottom: 20px; position:fixed; top:17px; right:17px;"></div>
      
    `;

    // Mount Clerk User button
    clerk.mountUserButton(document.getElementById("user-button"));

  } else {
    console.log("❌ No user found. Showing sign-in.");
    app.innerHTML = `<div id="sign-in"></div>`;
    clerk.mountSignIn(document.getElementById("sign-in"));
  }
}

initializeClerk();
