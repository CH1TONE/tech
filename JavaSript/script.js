let shopItems = [];

const shopItemsNames = shopItems.map((item) => {
  return item.name;
});

let filteredItems = [...shopItemsNames];

const ul = document.getElementById("itemsList");

const appendNewItem = (item) => {
  const li = document.createElement("li");
  li.textContent = item;
  ul.appendChild(li);
};

const renderitems = (arry = shopItemsNames) => {
  ul.innerHTML = "";
  for (item of arry) {
    appendNewItem(item);
  }
};
renderitems();

const gradients = [
  'linear-gradient(315deg, #ffbc00, #ff0058)',
  'linear-gradient(315deg, #03a9f4, #ff0058)',
  'linear-gradient(315deg, #4dff03, #00d0ff)'
];

const updateCardStyles = () => {
  const allBoxes = document.querySelectorAll(".container .box");
  const oldStyles = document.querySelectorAll('style[data-dynamic-card]');
  oldStyles.forEach(style => style.remove());
  
  allBoxes.forEach((box, index) => {
    const colorIndex = index % 3;
    const style = document.createElement('style');
    style.setAttribute('data-dynamic-card', 'true');
    style.textContent = `
      .container .box:nth-child(${index + 1})::before,
      .container .box:nth-child(${index + 1})::after {
        background: ${gradients[colorIndex]};
      }
    `;
    document.head.appendChild(style);
  });
};

const addNewItem = () => {
  const titleInput = document.getElementById("item-input");
  const descInput = document.getElementById("description-input");
  
  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  if (title === "") {
    alert("სახელი ცარიელია");
    return;
  }
  
  const finalDescription = description === "" ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." : description;
  
  const container = document.querySelector(".container");
  const newBox = document.createElement("div");
  newBox.className = "box";
  
  newBox.innerHTML = `
    <span></span>
    <div class="content">
      <h2>${title}</h2>
      <p>${finalDescription}</p>
      <a href="#">Read More</a>
    </div>
  `;
  
  container.appendChild(newBox);
  updateCardStyles();
  
  titleInput.value = "";
  descInput.value = "";
};

const deleteLastitem = () => {
  const allBoxes = document.querySelectorAll(".container .box");
  
  if (allBoxes.length === 0) {
    alert("სია ცარიელია");
    return;
  }
  
  const lastBox = allBoxes[allBoxes.length - 1];
  lastBox.remove();
  
  updateCardStyles();
};

const addNewitemAtStart = () => {
  const titleInput = document.getElementById("item-input");
  const descInput = document.getElementById("description-input");
  
  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  if (title === "") {
    alert("სახელი ცარიელია");
    return;
  }
  
  const finalDescription = description === "" ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." : description;
  
  const container = document.querySelector(".container");
  const newBox = document.createElement("div");
  newBox.className = "box";
  
  newBox.innerHTML = `
    <span></span>
    <div class="content">
      <h2>${title}</h2>
      <p>${finalDescription}</p>
      <a href="#">Read More</a>
    </div>
  `;
  
  if (container.firstChild) {
    container.insertBefore(newBox, container.firstChild);
  } else {
    container.appendChild(newBox);
  }
  
  updateCardStyles();
  titleInput.value = "";
  descInput.value = "";
};

const deleteFirstitem = () => {
  const allBoxes = document.querySelectorAll(".container .box");
  
  if (allBoxes.length === 0) {
    alert("სია ცარიელია");
    return;
  }
  
  const firstBox = allBoxes[0];
  firstBox.remove();
  
  updateCardStyles();
};

const searchitems = () => {
  const searchinput = document.getElementById("search-input");
  const searchValue = searchinput.value;

  filteredItems = shopItemsNames.filter((item) => {
    return item.includes(searchValue);
  });

  renderitems(filteredItems);
};

const searchCards = () => {
  const searchInput = document.getElementById("search-input");
  const searchValue = searchInput.value.toLowerCase().trim();
  
  const allBoxes = document.querySelectorAll(".container .box");
  
  if (allBoxes.length > 0) {
    allBoxes.forEach((box) => {
      const cardTitle = box.querySelector("h2");
      if (cardTitle) {
        const titleText = cardTitle.textContent.toLowerCase().trim();
        
        if (titleText.startsWith(searchValue) || searchValue === "") {
          box.style.display = "flex";
        } else {
          box.style.display = "none";
        }
      }
    });
  }
};

window.onload = function() {
  updateCardStyles();
};