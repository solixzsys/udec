$(function(){
    
var slidding=false;
    $(window).scroll(function(){



// $('iframe.ticker').css('top',(window.innerHeight-200)+'px');

        if($(window).width()<1000){
            // $('.m').css({'display':'none'});
            // $('.carousel-inner ul.l').css({'float':'none !important'});
            // $('ul.l').addClass('center-block')
            $('canvas').css({'width':'100%','height':'100%'});

    // $('#carousel').carouFredSel({ 

    //     items                : 1,
    //     responsive: true,
	//     width: '100%', 
    //     direction            : "left", 
    //     scroll : { 
    //         items            : 2, 
    //         // easing           : "elastic", 
    //         duration         : 1000, 
    //         pauseOnHover     : true 
    //     } 
    // }); 
     }else{


    //       $('#carousel').carouFredSel({ 

    //     items                : 4,
    //     responsive: true,
	//     width: '100%', 
    //     direction            : "left", 
    //     scroll : { 
    //         items            : 2, 
    //         // easing           : "elastic", 
    //         duration         : 1000, 
    //         pauseOnHover     : true 
    //     } 
    // }); 
     }

     $('.carousel-inner li span').parent().css({'margin-top':'10px'})







        if($(window).width()> 1000){
            $('#col_1 div.agenda').removeClass('center-block');
            $('#col_1 div.agenda').addClass('pull-right');
            $('#col_0 div.agenda').removeClass('center-block');

             if($('#heroid').visible(true,true)==false){
        //$('nav').addClass('hidden').hide().show('normal')
        // $('nav').removeClass('hidden') 
         $('nav').slideDown('slow')
         $('#mainnav').css({'display':'none'})
        // console.log(' mybox visible.........................');
// if(parseInt($('#sidebar_id').css('width'))<1){
//     $('#sidebar_id').css({'width':'250px'});
    // $('body').css({'margin-left':'250px'});
 }else{
//     $('#sidebar_id').css({'width':'0'});
//     // $('body').css({'margin-left':'0'});

//     }
        $('nav').slideUp('slow')
        $('#mainnav').css({'display':'block'})
        
       // $('nav').addClass('hidden') 
        // console.log('mybox not visible.........................');
    }


        }else{
             $('#col_1 div.agenda').css({'margin-bottom':'50px'});
             $('ul.service-list').addClass('center-block');
             $('.msg1').css({'padding':'50px 10px'});

        }

        var msgs=$('div.col-sm-12.msg1 h4 p');
        // console.log('SCROLLING...................................'+msgs.length)
        
        for(var i=0;i<msgs.length;i++){

        if($(msgs[i]).visible()==true){
            $(msgs[i]).addClass('textanim')
            // $(msgs[i]).animate({'font-size':'28px'})
        //  console.log('msg1 visible.........................');

    }else{
        // $(msgs[i]).animate({'font-size':'10px'})
         $(msgs[i]).removeClass('textanim')
        
        //  console.log('msg1 not visible.........................');
    }
        }

     if($('.textboard').visible()==true){
            $('.textboardwrapper div').addClass('.textboardanim')
        // console.log(' .textboard visible.........................');

    }else{
        $('.textboardwrapper div').removeClass('.textboardanim')
        // console.log('.textboard not visible.........................');
    }

    // if($('#headerwrapper').visible(true,true)==false){
    //     $('div.nav').hide();
    // }







   



})


//  $(window).resize(function(){
//     if($(window).width()<1000){
//         $('nav').removeClass('hidden');
//         $('mynav').addClass('hidden');
//         // $('div.quote span').css({'position':'relative'})
//         $('.textboard img').css({'display':'none'})
//          console.log('xxxxxxxxxxxxxxxxxxxxx')
//     }else{
//         $('nav').addClass('hidden');
//          $('mynav').removeClass('hidden');

//     }
//  });


$('.toggleit').on('click',function(){
    if(parseInt($('#sidebar_id').css('width'))<1){
    $('#sidebar_id').css({'width':'250px'});
    // $('body').css({'margin-left':'250px'});
}else{
    $('#sidebar_id').css({'width':'0'});
    // $('body').css({'margin-left':'0'});

    }

})

$('.closebtn').on('click',function(){
    $('#sidebar_id').css({'width':'0'});
    // $('body').css({'margin-left':'0'});
})


$('#navbtn').on('click',function(){
    console.log('navbtn click................................')
    if($(window).width()<768){
        console.log('less than 768................................')
       if(parseInt($('#sidebar_id').css('width'))<1){
    $('#sidebar_id').css({'width':'250px'});
    // $('body').css({'margin-left':'250px'});
}else{
    $('#sidebar_id').css({'width':'0'});
    // $('body').css({'margin-left':'0'});
console.log('navbtn click................................')
    }
    }
})
    










})