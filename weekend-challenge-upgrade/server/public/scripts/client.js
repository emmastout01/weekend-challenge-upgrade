console.log('script sourced.');

$(document).ready(readyNow);

function readyNow() {
  console.log('document ready.');
  $('#submit').on('click', onClick);
  // removeEmployee();
  removeEmployeePro();
}

var monthlySpending = 0;
var annualSpending = 0;

function onClick() {
  var $firstName = $('#first-name').val();
  var $lastName = $('#last-name').val();
  var $idNumber = $('#id-number').val();
  var $jobTitle = $('#job-title').val();
  var $annualSalary = $('#annual-salary').val();

//Append input field values to the DOM and check whether or not annual salary is a number:
  var $tbody = $('tbody');

   if (!isNaN($annualSalary)) {
    $tbody.prepend('<tr><td class = "input">' + $firstName + '</td><td>' + $lastName +
    '</td><td>' +  $idNumber + '</td><td>' + $jobTitle + '</td><td>' +
    $annualSalary +'</td><td><button id ="delete-employee">Delete Employee</button></td></tr>');
  } else {
      alert('Please enter a valid number (containing digits only) for annual salary.');
     }
 /* I tried to find a way to check if there was something written in the
'annual salary' input box, and if nothing was written it would send an alert
for the user to write something, because otherwise the monthly spending will
change to NaN as soon as someone does not enter an annual salary. For this, I
tried:

else if ($annualSalary == '') {
  alert('Please enter an annual salary');
}
and

else if ($annualSalary.length === 0) {
  alert('Please enter an annual salary');
}
Neither of these worked for me.
*/

//Style appended text

//Clear input fields:
  $('#first-name').val('');
  $('#last-name').val('');
  $('#id-number').val('');
  $('#job-title').val('');
  $('#annual-salary').val('');

//Calculate monthly spending:
  annualSpending += parseInt($annualSalary);
  monthlySpending = annualSpending/12;

//Append monthly spending to DOM:
  $('#monthly-spending').text(monthlySpending.toFixed(2));
}

//Removing employee in pro mode:
function removeEmployeePro() {
  $('tbody').on('click', '#delete-employee', function() {
      //Remove employee data from table:
      $(this).parent().parent().remove();
      //Remove employee salary from monthly cost calculation:
      var deletedSalary = $(this).parent().prev().text();
      monthlySpending *= 12;
      monthlySpending -= deletedSalary;
      monthlySpending /= 12;

      //Append updated monthly spending to DOM:
      $('#monthly-spending').text(monthlySpending.toFixed(2));
    });
}

//Removing employee in hard mode:
// function removeEmployee() {
//   $('tbody').on('click', '#delete-employee', function() {
//     console.log('delete employee' + $('#first-name').val());
//     $(this).parent().parent().remove();
//   });
// }
