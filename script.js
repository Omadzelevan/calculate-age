"use strict";

const month = document.getElementById("month");
const year = document.getElementById("year");
const day = document.getElementById("day");

const montPlace = document.querySelector(".month-place");
const dayPlace = document.querySelector(".day-place");
const yearPlace = document.querySelector(".year-place");

const yearError = document.querySelector(".year-error");
const monthError = document.querySelector(".month-error");
const dayError = document.querySelector(".day-error");

function validateInputs(birthDay, birthMonth, birthYear) {
  let isvalid = true;

  if (
    isNaN(birthYear) ||
    birthYear < 1900 ||
    birthYear > new Date().getFullYear()
  ) {
    yearError.textContent = "Invalid year";
    yearError.classList.remove("hidden");
    isvalid = false;
  } else {
    yearError.classList.add("hidden");
  }

  if (isNaN(birthMonth) || birthMonth < 1 || birthMonth > 12) {
    monthError.textContent = "Invalid month";
    monthError.classList.remove("hidden");
    isvalid = false;
  } else {
    monthError.classList.add("hidden");
  }

  const daysInMonth = new Date(birthYear, birthMonth, 0).getDate();
  if (isNaN(birthDay) || birthDay < 1 || birthDay > daysInMonth) {
    dayError.textContent = `Please enter a valid day (1-${daysInMonth}).`;
    dayError.classList.remove("hidden");
    isvalid = false;
  } else {
    dayError.classList.add("hidden");
  }
  return isvalid;
}

function myAge(monthInput, yearInput, dayInput) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();

  const birthMonth = parseInt(monthInput.value, 10);
  const birthYear = parseInt(yearInput.value, 10);
  const birthDay = parseInt(dayInput.value, 10);

  let age = currentYear - birthYear;
  let ageMonth = currentMonth - birthMonth;
  let ageDay = currentDay - birthDay;

  if (!validateInputs(birthDay, birthMonth, birthYear)) return;
  if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
    age--;
  }
  if (ageDay < 0) {
    ageDay += new Date(currentYear, currentMonth - 1, 0).getDate();
    ageMonth--;
  }
  if (ageMonth < 0) {
    ageMonth += 12;
  }

  montPlace.textContent = ageMonth;
  dayPlace.textContent = ageDay;
  yearPlace.textContent = age;

  return age;
}

// Add an event listener to trigger the function
document.querySelector("button").addEventListener("click", (e) => {
  e.preventDefault();
  myAge(month, year, day);
});
