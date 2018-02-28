$(document).ready(function (e) {
        
        

        $('form.contact-form').submit(function (e) {
            e.preventDefault();
            var $self  = $(this);
            var datas = $self.serialize();
            $.post('/sendmail', datas).then(function (response) {
                console.log(response);
            });

        });
});