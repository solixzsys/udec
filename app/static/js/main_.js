
function mobileview(){
    var w=window.outerWidth
    if(w<=800){
        $('#index-banner').remove();
        $('#index-mobile').css('display','block')
    }
    
}









mobileview()

$(function(){



$('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '1%', // Ending top style attribute
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        $.ajax({
            url:'/login',
            context:document.body
        }).done(function(response){
            // console.log(response)
            modal.html(response);
        })
        // console.log(modal, trigger);
      },
      complete: function() {
        //    alert('Closed'); 
        } // Callback for Modal close
    }
  );



function header_anim(){    
   var line1= $('#msg-wrapper > h1');
   var line2=$($('#msg-wrapper > div.row.center.msg > h5')[0])
   var line3=$($('#msg-wrapper > div.row.center.msg')[1])

//    setInterval(function(){})
  setTimeout(function(){



        line1.animate({top:'-500px','opacity':0},5000)
        line2.animate({'opacity':0},5000)
        line3.animate({top:'500px','opacity':0},5000,function(){
            // $("#index-banner > div.parallax > img").attr("src","/static/img/Lagos8.jpg").fadeIn();
            // $("#index-banner").animate({'opacity':0},function(){});

            // $("#index-banner").css('background','url("/static/img/Lagos8.jpg")');
            // $("#index-banner").animate({'opacity':1})

            $("#index-banner").fadeOut(1000,function(){
                //  $("#index-banner").css('background','url("/static/img/Lagos8.jpg")');
                $("#index-banner").css({'background-image':'url("/static/img/Lagos8.jpg")','background-repeat': 'no-repeat','background-size': 'cover'})
                 $("#index-banner").fadeIn(1000,function(){

                 });
            })
            line1.html('Are You Scared?')
            line2.html('Your competitors are out-performing you?<br> We can help you turn the tide ')
            line3.html(' <a href="#" id="download-button" class="btn-large waves-effect waves-light blue lighten-1">Services and Solution</a>')
            
            line1.css({'left':'-1000px','top':0})            
            line3.css({'left':'1000px','top':0})

            line1.animate({left:'0px','opacity':1},2000).delay(5000)            
            line2.animate({'opacity':1},2000).delay(5000)
            line3.animate({left:'0px','opacity':1},2000,function(){
                line1.animate({top:'-500px','opacity':0},5000)
                line2.animate({'opacity':0},5000)
                line3.animate({top:'500px','opacity':0},5000,function(){
                    // $("#index-banner > div.parallax > img").attr("src","/static/img/Lagos14.jpg").fadeIn();
                    // $("#index-banner").css('background','url("/static/img/Lagos14.jpg")');
                     $("#index-banner").fadeOut(1000,function(){
                //  $("#index-banner").css('background','url("/static/img/Lagos14.jpg")');
                $("#index-banner").css({'background-image':'url("/static/img/Lagos14.jpg")','background-repeat': 'no-repeat','background-size': 'cover'})
                 $("#index-banner").fadeIn(1000,function(){

                 });
            })
                    line1.html('Are U Wondering ')
                    line2.html('How Big Are U?<br>we provide a robust platform for that')
                    line3.html(' <a id="pollandservice"   class="btn-large waves-effect waves-light blue lighten-1">Poll & Survey</a>')
                    
                    line1.css({'left':'-1000px','top':0})            
                    line3.css({'left':'1000px','top':0})
                                      
                    line1.animate({left:'0px','opacity':1},2000).delay(5000)            
                    line2.animate({'opacity':1},2000).delay(5000)
                    line3.animate({left:'0px','opacity':1},2000,function(){
                        $('#pollandservice').on('click',function(e){
                               e.preventDefault();
                                if ($('#uid').text()==""){
                                    $('#modal3').modal();
                                    $('#modal3').modal('open');
                                    
                                }else{
                                    window.location.href='/opinion/all'
                                }
                                })


                        line1.animate({top:'-500px','opacity':0},2000)
                        line2.animate({'opacity':0},2000)
                        line3.animate({top:'500px','opacity':0},2000,function(){

                            
                            // $("#index-banner > div.parallax > img").attr("src","/static/img/Lagos-new.jpg")
                            // $("#index-banner").css('background','url("/static/img/Lagos-new.jpg")');
                             $("#index-banner").fadeOut(1000,function(){
                //  $("#index-banner").css('background','url("/static/img/Lagos-new.jpg")');
                $("#index-banner").css({'background-image':'url("/static/img/kano2v2.jpg")','background-repeat': 'no-repeat','background-size': 'cover'})
                 $("#index-banner").fadeIn(1000,function(){

                 });
            })
                            line1.html('Are U Tired')
                            line2.html('watching your competitors up the ladder ? <br>Udec can raise you up from that basement ')
                            line3.html(' <a href="#" id="download-button" class="btn-large waves-effect waves-light blue lighten-1">Analysis</a>')
                        
                            line1.css({'left':'-1000px','top':0})            
                            line3.css({'left':'1000px','top':0})                 
                                       
                            line1.animate({left:'0px','opacity':1},2000).delay(5000)
                            line2.animate({'opacity':1},2000).delay(5000)
                            line3.animate({left:'0px','opacity':1},2000,function(){
                                // header_anim();
                                line1.animate({top:'-500px','opacity':0},2000)
                                line2.animate({'opacity':0},2000)
                                line3.animate({top:'500px','opacity':0},2000,function(){
                                    // $("#index-banner > div.parallax > img").attr("src","/static/img/queuing1.jpg")
                                    // $("#index-banner").css('background','url("/static/img/queuing1.jpg")');
                                     $("#index-banner").fadeOut(1000,function(){
                //  $("#index-banner").css('background','url("/static/img/queuing1.jpg")');
                $("#index-banner").css({'background-image':'url("/static/img/queuing1.jpg")','background-repeat': 'no-repeat','background-size': 'cover'})
                 $("#index-banner").fadeIn(1000,function(){

                 });
            })

                                     line1.html('Welcome To Udec')
                                     line2.html('A Platform That Gives Life To Your Opinion')
                                     line3.html(' <a href="#" id="download-button" class="btn-large waves-effect waves-light blue lighten-1">Get Started</a>')

                                     line1.css({'left':'-1000px','top':0})            
                                     line3.css({'left':'1000px','top':0})     

                                     line1.animate({left:'0px','opacity':1},2000).delay(5000)            
                                     line2.animate({'opacity':1},2000).delay(5000)
                                     line3.animate({left:'0px','opacity':1},2000,function(){ 
                                         header_anim();

                                     }).delay(5000)
                        

                                })

                            }).delay(5000)

                    })

                 }).delay(5000)


        })
            }).delay(5000)

        })
        

    },1000)

}

if(window.outerWidth>550){
    header_anim();
}



    // var carousel_time=5000;
    // $('.carousel.carousel-slider').carousel();
    // setInterval(function(){
    //    if($('.carousel').mouseover()){
    //         carousel_time=5000000;
    //    }

    //     $('.carousel').carousel('next');
    // },carousel_time);

    var autoScrollTimer=4000;
    var scrollspeed=2000;
    var v;
    $('#carousel1').carousel({
        time_constant:scrollspeed,
        dist:0,
        // padding:65,
        // full_width:false

    });
    autoScrollQuick();


    $('#carousel1').mouseenter(function(){
        stopScroll();
    });
    $('#carousel1').mouseleave(function(){
        autoScrollQuick();
    });
    function autoScroll(){
        v=setInterval(next,autoScrollTimer)

    }
    function autoScrollQuick(){
        setTimeout(next,0);
        autoScroll();

    }
    function stopScroll(){
        clearInterval(v);
        $('#carousel1').carousel({
            time_constant:0
        })
    }
    function next(){
         $('#carousel1').carousel('next')

    }




    // SECOND carousel



     $('#carousel2').carousel({
        time_constant:scrollspeed,
        dist:0,
        // padding:65,
        // full_width:false

    });
     var v2;
    autoScrollQuick2();


    $('#carousel2').mouseenter(function(){
        stopScroll2();
    });
    $('#carousel2').mouseleave(function(){
        autoScrollQuick2();
    });
    function autoScroll2(){
        v2=setInterval(next2,autoScrollTimer)

    }
    function autoScrollQuick2(){
        setTimeout(next2,0);
        autoScroll2();

    }
    function stopScroll2(){
        clearInterval(v2);
        $('#carousel2').carousel({
            time_constant:0
        })
    }
    function next2(){
         $('#carousel2').carousel('next')

    }

    $('#to_top').on('click',function(){
        $('html,body').animate({scrollTop:$('.nav-wrapper').offset().top},2000);
    })
    $('#to_poll').on('click',function(){
        $('html,body').animate({scrollTop:$('#poll-container').offset().top},2000);
    })
    $('#to_service').on('click',function(){
        $('html,body').animate({scrollTop:$('#service').offset().top},2000);
    })
    $('#to_team').on('click',function(){
        $('html,body').animate({scrollTop:$('#team').offset().top},2000);
    })
    $('#to_contact').on('click',function(){
        $('html,body').animate({scrollTop:$('#contact').offset().top},2000);
    })



    var options=[
        {selector:'.our-service1',offset:200, callback:function(el){   
           $(el).animate({'left':0,'opacity':1},500)
        }
    },
    {selector:'.our-service2',offset:200, callback:function(el){   
            Materialize.showStaggeredList($(el)); 
            //  Materialize.toast("This is our ScrollFire Demo!", 1500 );
        }
    },
    {selector:'.our-service3',offset:200, callback:function(el){   
            $(el).animate({'left':0,'opacity':1},500)
        }
    }

    ]
Materialize.scrollFire(options);

 


 $('#pollandservice').on('click',function(e){
  e.preventDefault();
  if ($('#uid').text()==""){
    $('#modal3').modal();
    $('#modal3').modal('open');
    
  }else{
    window.location.href='/opinion/all'
  }

})



})

