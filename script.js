let orders = document.getElementById("ordered-items");

document.querySelectorAll(".order-btn").forEach((button) => {
  button.addEventListener("click", function () {
    let total = document.getElementById("total");
    // Get the value from the input field associated with this button
    const cardBody = button.closest(".card-body"); // Finds the closest card-body parent
    const inputValue = cardBody.querySelector(".food-input").value; // Gets the input value
    console.log(inputValue); // Logs the value to the console (replace this with your desired action)

    //if rw is existing
    let existingRow = null;
    for (let row of orders.rows) {
      if (row.cells[0].textContent === inputValue) {
        existingRow = row;
        break;
      }
    }
    if (existingRow) {
      // Increment quantity and update price
      const qtyCell = existingRow.cells[1];
      const priceCell = existingRow.cells[2];
      let addPrice = 200.0;

      let newQty = parseInt(qtyCell.textContent) + 1;
      let newPrice = parseFloat(priceCell.textContent) + addPrice;

      qtyCell.textContent = newQty;
      priceCell.textContent = newPrice.toFixed(2);
      total.textContent = (
        parseFloat(total.textContent) + parseFloat(addPrice)
      ).toFixed(2);
    } else {
      // Create a new row if item doesn't exist
      let item = document.createElement("tr");
      let name = document.createElement("td");
      let qty = document.createElement("td");
      let price = document.createElement("td");
      let action = document.createElement("td");

      name.textContent = inputValue;
      qty.textContent = 1;
      price.textContent = parseFloat(200.0).toFixed(2);

      // Create delete button
      let deleteButton = document.createElement("button");
      deleteButton.className = "btns";
      deleteButton.textContent = "Remove";
      deleteButton.addEventListener("click", function () {
        total.textContent = (
          parseFloat(total.textContent) -
          parseFloat(item.getElementsByTagName("td")[2].textContent)
        ).toFixed(2);
        orders.removeChild(item);
      });

      action.appendChild(deleteButton);

      item.appendChild(name);
      item.appendChild(qty);
      item.appendChild(price);
      item.appendChild(action);

      orders.appendChild(item);
      total.textContent = (
        parseFloat(total.textContent) + parseFloat(price.textContent)
      ).toFixed(2);
    }
  });
});



const navLinks = document.querySelectorAll(".list-group-item");
const sections = document.querySelectorAll(".sec");

// Function to remove 'active' class from all links
function removeActiveClasses() {
  navLinks.forEach((link) => link.classList.remove("active"));
}

// Add scroll event listener
document.getElementById("menu").addEventListener('scroll', () => {
    let current = '';

    document.querySelectorAll('.sec').forEach(section => {
        const sectionRect = section.getBoundingClientRect();
        const menuRect = document.getElementById("menu").getBoundingClientRect();
        const scrollPosition = document.getElementById("menu").scrollTop;
    
        // Calculate section's top relative to the #menu
        const sectionTop = sectionRect.top - menuRect.top + scrollPosition;
        const sectionHeight = section.clientHeight;
        const sectionBottom = sectionTop + sectionHeight;
    
        const menuHeight = document.getElementById("menu").clientHeight;
        const middleOfMenu = scrollPosition + menuHeight / 2;
    
        // Check if the middle of the menu is within the section
        if (middleOfMenu >= sectionTop && middleOfMenu < sectionBottom) {
            current = section.getAttribute('id');
        }
    });    
    

    // Remove active class from all links and add it to the current link
    document.querySelectorAll('.list-group-item').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});
