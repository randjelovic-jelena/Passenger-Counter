"use strict";
/*butons*/
const addBtn = document.getElementById("add-btn");
const saveBtn = document.getElementById("save-btn");
const clearBtn = document.getElementById("clear-list");
/*results*/
const resultTotal = document.getElementById("counted-total-number");
const resultBox = document.querySelector(".result-list");
const currentPassenger = document.getElementById("current-passengers");

let passengerList = [];

class Item {
  constructor(number, date) {
    this.number = number;
    this.date = date;
  }
}

let counter = 0;
/*reset counter*/
const updateIncrement = () => {
  return counter;
};
const resetCounter = () => {
  counter = 0;
  currentPassenger.innerText = 0;
  updateIncrement();
};

/*empty storage info*/
const emptyStorageInfo = () => {
  counter = 0;
  updateIncrement();
  resultBox.innerHTML = "No Passengers";
  resultTotal.innerText = 0;
  passengerList = [];
};

/*show total*/
const showTotal = (data, itemsLength) => {
  let result = 0;
  for (let i = 0; i < itemsLength; i++) {
    result += Number(data[i].number);
  }
  resultTotal.innerText = result;
};
/*show list*/
const showList = (data, itemsLength) => {
  let result = "";
  for (let i = itemsLength - 1; i >= 0; i--) {
    result += `<div class="list-item">
    <p class="item-number">${data[i].number}</p>
    <p class="item-date">${data[i].date}</p>
  </div>`;
  }
  resultBox.innerHTML = result;
};

/*get from storage*/
const getItems = () => {
  let data = JSON.parse(localStorage.getItem("item"));

  if (data) {
    let itemsLength = data.length;
    console.log(data.length);
    showTotal(data, itemsLength);
    showList(data, itemsLength);
  } else {
    emptyStorageInfo();
  }
};

/*add to local storage*/
const addToLocalStorage = (number, date) => {
  let item = new Item(number, date);

  passengerList.push(item);
  let listItem = JSON.stringify(passengerList);

  localStorage.setItem("item", listItem);
  getItems();
};

/*save passengers*/
const savePassengers = () => {
  updateIncrement();
  if (updateIncrement() > 0) {
    let date = new Date().toLocaleTimeString();
    addToLocalStorage(counter, date);
    resetCounter();
  }
};

/*add button clicked*/
const passengersNumberIncrement = () => {
  counter += 1;
  updateIncrement();
  currentPassenger.innerText = counter;
};

/*empty local storage*/
const clearStorage = () => {
  window.localStorage.clear();
  emptyStorageInfo();
};

/*click events*/
clearBtn.addEventListener("click", clearStorage);
addBtn.addEventListener("click", passengersNumberIncrement);
saveBtn.addEventListener("click", savePassengers);
window.onload = getItems;
