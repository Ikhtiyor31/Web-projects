$(document).ready(function () {
    $(".btn-delete").click(function () {

        var _id = $(this).data("id");
        swal({
            title: '경고',
            text: "정말 지우시겠습니까?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '네 삭제하겠습니다',
            cancelButtonText: '아니요'
        }).then(function () {
            $.ajax({
                url: '/delete',
                type: 'post',
                data: {id: _id},
                success: function (response) {
                    location.href = '/';
                }
            });
        })
    })


    $(".btn-submit").click(function () {

        var name = $("input[name='comments']").val();
       var file_name = $("input[name='file']").val();

        if(!file_name && !name) {
            swal('Ogohlantirish', 'Iltimos rasmni va comment kiriting!.', 'error')
        }
        else if(!name){
            swal('Ogohlantirish', 'Iltimos comment kiriting!.', 'error')
        } else if(!file_name) {
            swal('Ogohlantirish', 'Iltimos rasmni kiriting!', 'error')
        }
            else {
            $(this).closest("form").submit();
        }


    });


});