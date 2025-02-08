
import { createClient } from 'https://esm.sh/@supabase/supabase-js';

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
document.getElementById('login-form-element').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('login-username').value.toLowerCase();  // Normalize to lowercase
    const password = document.getElementById('login-password').value;
  
    try {
      // Retrieve the user from the Login table
      const { data: Login, error } = await supabase
        .from('Login')
        .select('*')
        .eq('email', email);
  
      // Log the fetched data for debugging
      console.log('Fetched data from Supabase:', Login);
  
      if (error || Login.length === 0) {
        console.log('User not found, error:', error);
        alert('Error during login: User not found');
        return;
      }
  
      const user = Login[0];
  
      // Log the user data being compared
      console.log('User data fetched from the database:', user);
      console.log('Entered password:', password);
      console.log('Stored password:', user.password);
  
      // Directly compare the plain-text password
      if (password !== user.password) {
        console.log('Passwords do not match!');
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
  