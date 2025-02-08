import { createClient } from 'https://esm.sh/@supabase/supabase-js';
import bcrypt from 'https://esm.sh/bcryptjs';

const supabaseUrl = 'https://ivlkyphxpfubhkfqoqgu.supabase.co';  // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2bGt5cGh4cGZ1YmhrZnFvcWd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwMTIzMTIsImV4cCI6MjA1NDU4ODMxMn0.Mj5lkfpLVvPIGWOaVwyng5ERHpNFU1NK84KN5rKRoMY';  // Replace with your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);

// Toggle between Login and Sign-Up forms
export function toggleForm() {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  // Toggle form visibility
  if (loginForm.style.display === 'none') {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
  } else {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  }
}

// Handle Sign-Up
document.getElementById('signup-form-element').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('signup-username').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  try {
    // Hash the password
    //const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the Login table
    const { data, error } = await supabase
      .from('Login')
      .insert([{ email, password,username}]);

    if (error) {
      alert('Error during signup: ' + error.message);
    } else {
      alert('Sign up successful!');
      toggleForm();  // Switch to login form after successful signup
    }
  } catch (error) {
    console.error('Error during signup: ', error);
  }
});

// Handle Login
document.getElementById('login-form-element').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  try {
    // Retrieve the user from the Login table
    const { data: Login, error } = await supabase
      .from('Login')
      .select('*')
      .eq('email', email);

    if (error || Login.length === 0) {
      alert('Error during login: User not found');
      return;
    }

    const user = Login[0];

    // Compare the hashed password
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      alert('Error during login: Invalid password');
    } else {
      alert('Login successful!');

      // Store the logged-in user session in localStorage or sessionStorage
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to a specific page, like a dashboard
      window.location.href = 'index1.html'; // Replace with your target page
    }
  } catch (error) {
    console.error('Error during login: ', error);
  }
});

// Handle User Session on Page Load
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      console.log('User is logged in:', user);

      // Avoid infinite redirect loop by checking if we're already on the target page
      if (window.location.pathname !== '/index1.html') {
        // Redirect to dashboard or another page if logged in
        window.location.href = 'index1.html';  // Replace with your target page
      }
    } else {
      console.log('No user is logged in');
    }

    // Attach event listener to toggle links
    document.getElementById('toggle-signup').addEventListener('click', (e) => {
      e.preventDefault();
      toggleForm();
    });

    document.getElementById('toggle-login').addEventListener('click', (e) => {
      e.preventDefault();
      toggleForm();
    });

  } catch (error) {
    console.error('Error during page load:', error);
  }
});