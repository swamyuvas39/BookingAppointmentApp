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
}
