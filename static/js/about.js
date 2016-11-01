$('.form-container').hide();

$('.cta-button').on('click', ()=>{
   $('.form-container').slideToggle();
});

$('.submit-button').on('click', () => {

    var email = $('#email').val();
    var company = $('#company').val();
    var website = $('#website').val();
    var jobDescription = $('#jobDescription').val();
    var budget = $('#budget').val();

    var data = {

      email,
      company,
      website,
      jobDescription,
      budget

    };

    console.log(data);

    $.post('/api/hire', data , function (res, statusString, responseData) {
        console.log(status, responseData.status);
    });

});
