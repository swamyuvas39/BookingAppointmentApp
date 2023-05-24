// Get form and appointments list elements
var bookingForm = document.getElementById('bookingForm');
var appointmentsList = document.getElementById('appointmentsList');

// Add event listener to form submit
bookingForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form values
  var name = document.getElementById('name').value;
  var date = document.getElementById('date').value;
  var time = document.getElementById('time').value;
  var comments = document.getElementById('comments').value;

  // Create appointment object
  var appointment = {
    name: name,
    date: date,
    time: time,
    comments: comments
  };

  // Call function to add appointment to the list
  addAppointment(appointment);

  // Reset form fields
  bookingForm.reset();
});

// Function to add appointment to the list
function addAppointment(appointment) {
  // Create list item element
  var listItem = document.createElement('li');

  // Set appointment details as innerHTML of the list item
  listItem.innerHTML = `
    <strong>${appointment.name}</strong>
    <br>Date: ${appointment.date}
    <br>Time: ${appointment.time}
    <br>Comments: ${appointment.comments}
  `;

  // Append the list item to the appointments list
  appointmentsList.appendChild(listItem);
  
  // Add event listener to the delete button
  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function() {
    // Call function to delete all data from local storage
    deleteAppointment();

    // Remove the list item from the appointments list
    listItem.remove();
  });

  // Append the delete button to the list item
  listItem.appendChild(deleteButton);

   // Add event listener to the edit button
   var editButton = document.createElement('button');
   editButton.textContent = 'Edit';
   editButton.addEventListener('click', function() {
     // Call function to edit the appointment in local storage
     editAppointment(appointment);
   });
 
   // Append the edit button to the list item
   listItem.appendChild(editButton);
}
function deleteAppointment() {
  // Clear all data from local storage
  localStorage.clear();
}
function editAppointment(appointment) {
  // Update the appointment details based on user input
  var newName = prompt('Enter a new name:', appointment.name);
  var newDate = prompt('Enter a new date:', appointment.date);
  var newTime = prompt('Enter a new time:', appointment.time);
  var newComments = prompt('Enter new comments:', appointment.comments);

  // Create a new appointment object with the updated details
  var updatedAppointment = {
    name: newName,
    date: newDate,
    time: newTime,
    comments: newComments
  };

  // Update the appointment in local storage
  updateAppointment(appointment, updatedAppointment);

  // Update the appointment details in the list item
  var listItem = document.querySelector('li');
  listItem.innerHTML = `
    <strong>${updatedAppointment.name}</strong>
    <br>Date: ${updatedAppointment.date}
    <br>Time: ${updatedAppointment.time}
    <br>Comments: ${updatedAppointment.comments}
  `;
}
function updateAppointment(oldAppointment, newAppointment) {
  // Retrieve the existing appointments from local storage
  var appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  // Find the index of the old appointment in the array
  var index = appointments.findIndex(function(item) {
    return (
      item.name === oldAppointment.name &&
      item.date === oldAppointment.date &&
      item.time === oldAppointment.time &&
      item.comments === oldAppointment.comments
    );
  });

  // Update the appointment in the array if found
  if (index !== -1) {
    appointments[index] = newAppointment;
  }

  // Save the updated appointments array back to local storage
  localStorage.setItem('appointments', JSON.stringify(appointments));
}
