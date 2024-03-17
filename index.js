// Function to display user details on the screen
function displayUserOnScreen(userDetails) {
    const bookedBuses = document.getElementById("booked-buses");
    const newLi = document.createElement("li");
    newLi.innerHTML = `${userDetails.name} - ${userDetails.email} - ${userDetails.phone} - ${userDetails.busno}
                       <button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>`;
    
    // Append the new list item to the existing list of bookings
    bookedBuses.appendChild(newLi);

    // Add event listeners for edit and delete buttons
    const deleteBtn = newLi.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
        deleteBooking(userDetails._id, newLi); // Pass booking ID and list item for removal
    });

    const editBtn = newLi.querySelector(".edit-btn");
    editBtn.addEventListener("click", function () {
        editBooking(userDetails);
    });
}

// Function to handle delete booking
function deleteBooking(bookingId, listItem) {
    axios.delete(`https://crudcrud.com/api/49dc97f3db3b490ca4767b9df9976c3c/booking/${bookingId}`)
        .then(() => {
            listItem.remove();
            alert("Booking deleted successfully.");
        })
        .catch((error) => {
            console.error(error);
            alert("Error occurred while deleting booking.");
        });
}

// Function to handle edit booking
function editBooking(userDetails) {
    document.getElementById("name").value = userDetails.name;
    document.getElementById("email").value = userDetails.email;
    document.getElementById("phone").value = userDetails.phone;
    document.getElementById("busno").value = userDetails.busno;
}

// Load user details when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    loadUserDetails();
});

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const busnoInput = document.getElementById("busno");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const busno = busnoInput.value.trim();

    const userDetails = {
        name: name,
        email: email,
        phone: phone,
        busno: busno
    };

    // Axios POST request to save user details
    axios.post("https://crudcrud.com/api/49dc97f3db3b490ca4767b9df9976c3c/booking", userDetails)
        .then((response) => {
            const newUserDetails = response.data;
            alert("Booking successful!");
            displayUserOnScreen(newUserDetails);
            clearInputFields(); // Clear input fields after successful submission
        })
        .catch((error) => {
            console.error(error);
            alert("Error occurred. Please try again.");
        });
}

// Function to clear input fields
function clearInputFields() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("busno").value = "all"; // Reset bus number dropdown to "All"
}

// Function to fetch user details from the API endpoint and display them on the screen
function loadUserDetails() {
    axios.get("https://crudcrud.com/api/49dc97f3db3b490ca4767b9df9976c3c/booking")
        .then((response) => {
            const userDetails = response.data;
            userDetails.forEach((user) => {
                displayUserOnScreen(user);
            });
        })
        .catch((error) => {
            console.error(error);
            alert("Error in fetching user details");
        });
}

// Add event listener for form submission
document.getElementById("booking").addEventListener("submit", handleFormSubmit);
