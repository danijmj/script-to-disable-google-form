/**
 * A trigger-driven function that get the current Google Docs form
 * and dishable it after a specify number of responses.
 *
 * @param {Object} e The event parameter for form submission to a spreadsheet;
 *     see https://developers.google.com/apps-script/understanding_events
 */
function onFormSubmit(e) {

  ////////////////////////////////////////////////
  // Set custom variables 
  ////////////////////////////////////////////////

  // Put the value of the max responses that you want 
  var maxResponses = 150;

  // The subject of the email
  var subject = "A subject example";

  // The body of the email
  var body = "A body example";


  ////////////////////////////////////////////////
  // Start the script
  ////////////////////////////////////////////////

  // Get the current form
  var form = FormApp.getActiveForm();

  // Check if the form is not null or undefined
  if (form != null && form != undefined) {
    
    // Set the emails to send a message when the form is disabled 
    var emails = ["example@example.com"];

    // Get the number of responses of the current form
    var numItems = form.getResponses().length
    console.log("Current responses: ", numItems);

    // Check if the responses are more or equal that you want  
    if (numItems >= maxResponses) {

      // Send emails when the form is disabled  
      emails.forEach(function(el) {
        sendEmail_(el, subject, body);
      });

      // Disable the form
      form.setAcceptingResponses(false);
      console.log("Form disabled");
    }
  }
  
  
}

/**
 * Send a email.
 * @param {string} user email.
 */
function sendEmail_(email, subject, body) {
    MailApp.sendEmail({
    to: email,
    subject: subject,
    body: body
  });
}
