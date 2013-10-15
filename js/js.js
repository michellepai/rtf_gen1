$(document).ready(function() {
    var ls = window.localStorage;
    $('.hide').css('display', 'none');
    $(document).on("mobileinit", function() {
        $.mobile.selectmenu.prototype.options.nativeMenu = false;
    });

    var i = 1;
    var cloneIndent = $('#indent_1').clone();
    $('#add_op').click(function(){
        i++;
        $('#op_summary1').clone()
                .appendTo('#input_form')
                .attr('id', 'op_summary' + i)
                .find("*[name]")
                .each(function() {
            $(this).attr("name", $(this).attr("name").replace(($(this).attr("name").charAt(3)), i));
        });
        cloneDiv = cloneIndent.clone();
        cloneDiv.appendTo('#input_form')
                .attr('id', 'indent_' + i)
                .sisyphus({timeout: 5});
        cloneDiv.find('*[name]').each(function() {
            var new_name = $(this).attr("name").slice(0, 3) + i + $(this).attr("name").slice(4);
            this.name = new_name;
            this.id = new_name;
        });
        cloneDiv.find(':button.btn_clone, table.tbl_clone, :button.obj_btn').each(function() {
            var new_id = $(this).attr("id").slice(0, 5) + i + $(this).attr("id").slice(6);
            this.id = new_id;
        });
        cloneDiv.find("div[id*='Obj']").each(function(){
            var new_id = $(this).attr("id").slice(0, 3) + i + $(this).attr("id").slice(4);
            this.id = new_id;
        });
        var newOp = $('#indent_' + i).prev().attr("id");
        window.location = '#' + newOp;
    });

    $('#input_form').on('click', '#rm_op', function() {
        opsCount--;
        $('#op_summary tr').last('tr').remove();
        divToRemove = 'operation_' + (opsCount + 1);
        $('#' + divToRemove).remove();
        ls.setItem('1opsCount', opsCount);

    });

    $('#input_form').on('click', '.btn_clone', function() {
        var b_id = $(this).attr('id');
        var t_id = '#t' + b_id.substring(1).replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&");
        cloneDiv = $(t_id + ' tr').last('tr').clone().find('input')
                .val('').end()
                .appendTo(t_id);
//        console.log('last clone name ' + cloneDiv.find('tr:last'));

        cloneDiv.find('*[name]').each(function() {
            var i = parseInt($(this).attr("name").slice(9, 10)) + 1;
            var new_name = $(this).attr("name").slice(0, 9) + i + $(this).attr("name").slice(10);
            this.name = new_name;
            this.id = new_name;
            //console.log('name: ' + this.name + ' id: ' + this.id);
        });
    });
    
    var forClone = $('#ops1_ipObj_1').clone();
    $('#input_form').on('click', '.obj_btn', function() {
        opNum = parseInt($(this).attr('id').slice(5, 6));
        inOrOut = $(this).attr('id').slice(7, 8);
        console.log(inOrOut);
        var io= (inOrOut === 'i'?6:7);
        console.log('io:'+io);
        //
        console.log('this:'+$(this).attr('id'));
        cloneDiv = forClone.clone()
                .attr('id', '#ops'+opNum+'_'+inOrOut+'pObj_' + (opNum+1))
                .appendTo('#ops'+opNum+'_'+inOrOut+'pObj');
        objNum = $('#ops'+opNum+'_'+inOrOut+'pObj').find("input[name*='_name']").size();
        console.log('objNum'+objNum);
        cloneDiv.find("*[name]")
                .each(function() {
            console.log($(this).attr('name'));
            var name=$(this).attr("name");
            new_id = name.slice(0,3)+opNum+'/'+io+name.slice(6,7)+(objNum+1)+name.slice(8);
           this.name = new_id;
        });
        cloneDiv.find(':button.btn_clone, table.tbl_clone').each(function() {
            var new_id = $(this).attr("id").slice(0, 9) + (objNum+1) + $(this).attr("id").slice(10);
            this.id = new_id;
        });
    });
//
//    $(function() {
//        $("form").sisyphus({
//            timeout: 3});
//    });

    $("#form_op_01_clear").click(function() {
        ls.clear();

        for (key in ls) {
            delete ls[key];
        }
        $('form')[0].reset();
    });

   $(window).scroll(function() {
    if ($(this).scrollTop()) {
        $('#toTop').fadeIn();
        $('#add_op').fadeIn();
    } else {
        $('#toTop').fadeOut();
        $('#add_op').fadeOut();
    }
});

$("#toTop").click(function() {
    $("html, body").animate({scrollTop: 0}, 1000);
 });
});
