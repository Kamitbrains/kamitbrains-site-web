$(document).ready(function (e) {
        
        $('form.contact-form').submit(function (e) {
            e.preventDefault();
            var $self  = $(this);
            var datas = $self.serialize();
            $.post('/sendmail', datas).then(function (response) {
                console.log(response);
                if(response.status){
                    swal('Okay...', response.text, 'success');                    
                    $self.find(':input').val('');
                }else{
                    swal('Oops...', response.text, 'error');
                }
            });

        });
});