$(document).ready(function(){
    $("#search").keyup(function(){
        _this = this;
        $.each($("#table tbody tr"), function() {
            if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();
        });
    });
});


$(document).ready(function() {
    $('.btn-apply').click(function() {
        const selectedState = $('.filter-menu select').val();
        $('.register-item').each(function() { 
            const itemState = $(this).data('state'); 
            if (selectedState === 'Todos los estados' || itemState === selectedState) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $('.btn-reset').click(function() {
        $('.register-item').show(); 
    });
});