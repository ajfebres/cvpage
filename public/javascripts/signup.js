$(document).ready(()=>{
    $('#showPassword').click(()=>{
        let label = $('#password');
        let icon = $('#passwd');
        if(label.attr('type') === 'text'){
            label.attr('type','password');
            icon.attr('class', 'fas fa-eye-slash');
        }else {
            label.attr('type', 'text');
            icon.attr('class', 'fas fa-eye');
        }
    })
});

