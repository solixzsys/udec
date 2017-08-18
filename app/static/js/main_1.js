$(function(){

    sessionStorage.clear();



    $.ajax({
        url:'/dynamictemp',

    })
    .done(function(data){
        console.log('data length..........................'+data.length)
        for(var i=0;i<data.length;i++){
            if(i<2){


            var template=$('#dynamictemplate').html();
             $('#poll-spot').prepend(template.replace(/%surveydescription%/,data[i]['fields'].surveytag_description)
             .replace(/%surveytitle%/,data[i]['fields'].surveytag_title)
             .replace(/%colid%/g,"col_"+i)
             .replace(/%titletext%/g,"titletext_"+i)
             .replace(/%btntag%/,data[i]['fields'].surveytag_tag)
             .replace(/%banner%/,"banner_"+i)
             .replace(/%next%/,"next_"+i)
             .replace(/%myChart%/,"myChart_"+i)
             .replace(/%twitter-shareid%/,"twitter_share_"+i)
             .replace(/%poll-shareid%/,"poll-shareid_"+i)
             );

        // console.log(data[i]['fields']);
        makeajax(data[i]['fields'].surveytag_tag,0,"titletext_"+i,"col_"+i);
        getpollcount(data[i]['fields'].surveytag_tag,"col_"+i);
        }

    }
    retrive_quotes();
    retrive_feed();

     attachbtn();
     retrive_polls();

     attachsharebtn();
     

     $('.customer.share').on("click", function(e) {
      $(this).customerPopup(e);
    });


    })
    .fail(function(){
         console.log('error..............')
    })








    sessionStorage.setItem('num',0);
    // $.ajax({
    //     url:'/jsonpoll',
    //     data:{'page':'0','section':'Economy'}

    // })
    // .done(
    //     function(data){
    //         // console.log('from 1..............'+data)
    //         h=$('#titletext')
    //         optionajax(data[0]['fields'].poll_code)
    //          h.html(data[0]['fields'].poll_question)
    //     }
    // )
    // .fail(
    //     function(){
    //         console.log('error..............')
    //     }
    // )

var getpollcount=function(stag,cid){
    $.ajax({
        url:'/pollcount',
        data:{'tag': stag}
    })
    .done(function(data){
        console.log(cid+'..................poll count: '+data.pcount)
        $('#'+cid).attr({'data-pollcount':data.pcount})

    })

}

    var makeajax=function(stag,page,sect,cid){

         $.ajax({
        url:'/jsonpoll',
        data:{'page': page,'stag':stag}

    })
    .done(
        function(data){
            // console.log('1************************* inside makeajax')
            //  console.log('uuu...........................'+ cid)
             optionajax(data[0]['fields'].poll_code,cid)
            h=$('#'+sect)
            // console.log('tttttttttttttttttnn    '+cid.split('col_')[1])
             h.html(data[0]['fields'].poll_question).hide().show('slow')
            //   txt=$('#twitter_share_'+cid.split('col_')[1]+' i').attr('href')
            txt=$('#'+cid+' .twitter').attr('href')

              $('#'+cid+' .panel-title').attr({'data-pollid':page})
            //  console.log('################################'+txt+'text='+h.text())
             // $('#twitter_share_'+cid.split('col_')[1]+' i').attr('href',txt+'text='+h.text())
            // console.log('2************************* inside makeajax--txt'+txt)
             newval = txt.replace(new RegExp('%mytext%'),h.text())
            //  console.log('3************************* inside makeajax')
             $('#twitter_share_'+cid.split('col_')[1]+' i').attr('href',newval);

               var pc=parseInt($('#'+cid).attr('data-pollcount'))
            var pid=parseInt($('#'+cid).find('h4.panel-title').attr('data-pollid'))
            
             console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~'+(pc-pid))
              if((pc-pid)==1){
              
                  $('#'+cid+' button.btnpoll').addClass('disabled')
                  var pollfinish=0
                  var pollbtn=$('.btnpoll')
                  console.log(pollbtn)
                  $.each(pollbtn,function(i,e){
                      if(!($(e).hasClass('disabled'))){
                            pollfinish=1;
                      }
                  })
                  if(pollfinish==0){
                      setTimeout(function() {
                           $('#modal2').modal();
                      $('#modal2').modal('open');
                          
                      }, 3000);
                     
                  }

              } 

        }
    )
    .fail(
        function(){
            
            sessionStorage[stag]=0;
            console.log('error..............'+sessionStorage[stag])
            makeajax(stag,sessionStorage[stag],sect,cid)
        }
    )

}



var optionajax=function(code,cid){

         $.ajax({
        url:'/jsonpolloption',
        data:{'code': code}

    })
    .done(
        function(data){
            // console.log('from 1..............'+data)
            // console.log('ssss'+data.length)
            a=$('#'+cid +' ul#optionarea')
            console.log('xxxxxxxxxxxxxxxx...'+'#'+cid +' ul#optionarea')
            // a=$('#optionarea')
            a.html("")
            for(var i=0;i<data.length;i++){
               // a.append('kkk')
                //  a.append('<li class="optionslist'+i+'   list-group-item radio">\
                //  <label>\
                //  <input type="radio" data-colid="'+cid+'" data-value='+data[i]['fields'].polloption_code+' name="optionsRadios" id="optionsRadios'+i+'" value="option'+i+'" checked><span style="" class="optext">'+data[i]["fields"].polloption_text+'</span>\
                //  </label><b  class="scoreboard badge pull-right">'+ data[i]['fields'].polloption_score+'  </b></li>').hide().show('slow')
                 a.append('<li class="optionslist'+i+'   list-group-item radio"><label><input type="radio" data-colid="'+cid+'" data-value='+data[i]['fields'].polloption_code+' name="optionsRadios" id="optionsRadios'+i+'" value="option'+i+'" ><span class="optext">'+data[i]['fields'].polloption_text+'</span></label><b  class="scoreboard badge pull-right">'+ data[i]['fields'].polloption_score+'  </b></li>').hide().show('slow')
            }
            //  a.html(data[0]['fields'].polloption_text)
           attachradio();
            
        }
    )
    .fail(
        function(){
            console.log('error..............')
            
        }
    )

}

var retrive_feed=function(){

     $.ajax({
        url:'/getfeed',

    })
    .done(function(data){        
          
        console.log('reading........................'+data.length)

        for(var i=0;i<data.length;i++){


            var feedtemplate=$('#feedtemplate').html();
             var feedtemplate1=$('#feedtemplate1').html();
            if(i==0){
                $('#carousel-inner-section').prepend(feedtemplate.replace(/%feed-title%/,"feed-title_"+i)
                .replace(/%title%/,data[i]['fields'].title)
                .replace(/%feed-content%/,"feed-content_"+i)
                .replace(/%active%/,"active")
                .replace(/%content%/,data[i]['fields'].description));

                 $('#carousel-inner-section1').prepend(feedtemplate1.replace(/%feed-title%/,"feed-title_"+i)
                .replace(/%title%/,data[i+2]['fields'].title)
                .replace(/%feed-content%/,"feed-content_1"+i)
                .replace(/%active%/,"active")
                .replace(/%content%/,data[i+2]['fields'].description)
                
                );
            }else{
                 $('#carousel-inner-section').prepend(feedtemplate.replace(/%feed-title%/,"feed-title1_"+i)
                .replace(/%title%/,data[i]['fields'].title)
                .replace(/%feed-content%/,"feed-content_"+i)
                //  .replace(/%titletext%/g,"titletext_"+i)
                .replace(/%content%/,data[i]['fields'].description)
                 );

                  $('#carousel-inner-section1').prepend(feedtemplate1.replace(/%feed-title%/,"feed-title1_"+i)
                .replace(/%title%/,data[i+2]['fields'].title)
                .replace(/%feed-content%/,"feed-content_1"+i)
                //  .replace(/%titletext%/g,"titletext_"+i)
                .replace(/%content%/,data[i+2]['fields'].description)
                 );
            }






       
    }





       
         $('#feed1-title').html(data[0]['fields'].title)
        $('#feed1-content').html(data[0]['fields'].description)
         $('#feed2-title').html(data[0]['fields'].title)
        $('#feed2-content').html(data[1]['fields'].description)
       

       


    })
    

}


var retrive_polls=function(){
    $.ajax({
        url:'/getpolls',

    }).done(function(data){

        

        console.log('from getpolls...........'+data)
        var x1=0;
        var x2=0;
        var x3=0;
        var x4=0;
        obj={};
        objs=[];
        opts=[]
        $('.result h6').html(data[0]['fields'].poll_title)
        

        console.log('+++++++++++++++++++++++ '+data[0]['fields'].poll_surveytag.surveytag_tag)

        $.ajax({
            url:'/getsurvey',
            data:{'num': data[0]['fields'].poll_surveytag}

        }).done(
            function(data){
            
                console.log('survey+++++++++++++++++++++++ '+data[0]['fields'])
                $('.result p').html(data[0]['fields'].surveytag_description)
                if(data[0]['fields'].survey_image !=""){
                    $('.result img').attr('src',data[0]['fields'].survey_image)
                }
                }
                )
            .fail(
                function(){
                    console.log('error..............')
                    
                }
             ) 



        
        
        
        
        
        
        $.each(data,function(i,v){

            // FOR SLIDING Chart
            

                var polltemplate=$('#pollresulttemplate').html();
                            $('#latestpoll').prepend(polltemplate.replace(/%title%/,data[i]['fields'].poll_title)
                            .replace(/%question%/,data[i]['fields'].poll_question)
                            .replace(/%myChart%/,"myChart_"+i)
                    
                    );





                    console.log('data,,,,,,,,,,,,,,,,,,,,,'+v['fields'].poll_question)

                    obj['question'+i]=v['fields'].poll_question;
                    $('#row_'+i+' #feedspace h3.title').html(v['fields'].poll_question)
                    // $('#row_'+i+'  #feedspace p.desc').html('abc')
                    $.ajax({
                        url:'/jsonpolloption',
                        data:{'code': v['fields'].poll_code}

                        
                    })
                    .done(function(data){
                        console.log('first ajax................'+obj['question'+i])
                        obj['options']=data
                        x1 =data[0]['fields'].polloption_text
                        x2=data[1]['fields'].polloption_text
                        x3=data[2]['fields'].polloption_text
                        x4=data[3]['fields'].polloption_text

                        y1 =data[0]['fields'].polloption_score
                        y2=data[1]['fields'].polloption_score
                        y3=data[2]['fields'].polloption_score
                        y4=data[3]['fields'].polloption_score

                        var ts=parseInt(y1)+parseInt(y2)+parseInt(y3)+parseInt(y4)
                        y1= Math.floor( (y1/ts)*100)
                        y2= Math.floor( (y2/ts)*100)
                        y3= Math.floor( (y3/ts)*100)
                        y4= Math.floor( (y4/ts)*100)
                        console.log('from getoptions...........'+obj['question'+i])
                        makechart(i,x1,x2,x3,x4,y1,y2,y3,y4,obj['question'+i]);

                    })
                    .fail(function(){
                        console.log('error from getoptions.........................')
                    })
            objs.push(obj);

        })
        // console.log('Complete objs................'+opts[0].object);


       






            })
            .fail(function(){
                console.log('error from getpolls.........................')

            })
    }


var makechart=function(i,x1,x2,x3,x4,y1,y2,y3,y4,ques){

    // FOR SLIDING CHART
    if(i==0){
        var ctx0=$('#chart'+i)
        ctx0.css('width','100%');
        $('#chart0 ~ div.carousel-caption').html(ques)
         $('#chart0 ~ div.carousel-caption').css({'color':'blue'})
        var myChart0 = new Chart(ctx0, {
                type: 'line',
                data: {
                    labels: [x1,x2,x3,x4],
                    datasets: [{
                    label: "Udec Interractive Chart",
                    data: [y1,y2,y3,y4],
                    backgroundColor:[ "rgba(92,184,92,1)",
                                 "rgba(240,173,78,1)",
                                 "rgba(91,192,222,1)",
                                 "rgba(217,83,79,1)"

                                 ],
                    borderColor: "rgba(0,0,0,0.1)",
                     borderWidth: 1
                    }]
                },
                options:{
                    maintainAspectRatio: false,
                    responsive: false
                }
            });
    }
    if(i==1){
        var ctx1=$('#chart'+i)
        ctx1.css('width','100%');
         $('#chart1 ~ div.carousel-caption').html(ques)
          $('#chart1 ~ div.carousel-caption').css({'color':'blue'})

        var myChart0 = new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels: [x1,x2,x3,x4],
                    datasets: [{
                    label: "Udec Interractive Chart",
                    data: [y1,y2,y3,y4],
                     backgroundColor:[ "rgba(92,184,92,1)",
                                 "rgba(240,173,78,1)",
                                 "rgba(91,192,222,1)",
                                 "rgba(217,83,79,1)"

                                 ],
                     borderColor: "rgba(0,0,0,0.1)",
                      borderWidth: 1
                    }]
                },
                options:{
                    maintainAspectRatio: false,
                    responsive: false
                }
            });
    }



     var ctx = $('#myChart_'+i);
    //  ctx.height=100;
    //  ctx.width=100;
    var graphtype="bar";
            if(i%2==0){
                graphtype='line';
            }
            var myChart = new Chart(ctx, {
            type: graphtype,
            data: {
                labels: [x1,x2,x3,x4],
                datasets: [{
                 label: "Udec Interractive Chart",
                data: [y1,y2,y3,y4],
                 backgroundColor:[ "rgba(92,184,92,1)",
                                 "rgba(240,173,78,1)",
                                 "rgba(91,192,222,1)",
                                 "rgba(217,83,79,1)"

                                 ],
                }]
            },
            options:{
                 maintainAspectRatio: false,
                 responsive: false
            }
        });
        
        // ctx.attr('height','20px');
        // ctx.attr('width','20px');


}

var retrive_quotes=function(){
    $.ajax({
        url:'/getquotes',

    })
    .done(function(data){
        $('.quote span').html(data[0]['fields'].quote).hide('slow').show('slow')
             $('.quote i').html("--- "+data[0]['fields'].author).hide('slow').show('slow')
        var k=1
        setInterval(function(){
            if(k>data.length-1){
                k=1;
            }
            // console.log('k============== '+k)
             $('.quote span').html(data[k]['fields'].quote).hide('slow').show('slow')
             $('.quote i').html("--- "+data[k]['fields'].author).hide('slow').show('slow')

        // console.log('quote--------------------------------  '+data[k]['fields'].quote)
            k=k+1
        },7000)

       


    })
    
}




// $('#next').on('click',function(e){
//     $('#next').click(function(){
//     console.log('eeeeeeeeeeeeeeeeeeeeeee')
//     // var rid=$()
//     if(sessionStorage.num){
//         sessionStorage.num=Number(sessionStorage.num)+1;
    
//     }

//     makeajax(sessionStorage.num);
// })


var attachbtn=function(){
var dynamicbtn=$('.btnpoll');
var swt=0
for(var i=0;i< dynamicbtn.length;i++){
    var btn=$(dynamicbtn[i])
    btn.click(function(){
        var n=$(this).attr('name');
        // n = survey tag
        
        if(sessionStorage[n]){
            console.log('############################## first click')
            sessionStorage[n]=Number(sessionStorage[n])+1;
            // var pc=parseInt($(this).parent().parent().parent().parent().attr('data-pollcount'))
            // var pid=parseInt($(this).parent().parent().find('h4.panel-title').attr('data-pollid'))
            //   if(!((pc-pid)==1)){
                console.log('############################## session n is'+sessionStorage[n])
                makeajax($(this).attr('name'),sessionStorage[n],$(this).attr('data-titletext'),$(this).attr('data-col'))
                console.log('££££---------------------------'+sessionStorage[n])
            //   }else{
            //       $(this).addClass('disabled')

            //   } 
              
              

        }else{
            console.log('############################## setting session to 1')
            sessionStorage.setItem(n,1)
            makeajax($(this).attr('name'),1,$(this).attr('data-titletext'),$(this).attr('data-col'))
        }



        console.log('i am dynamicbtn '+sessionStorage[n])
        $('.progress-bar').css({'width':'0'})
    })
}


}

var incrementscore=function(tag,cid){
    console.log('radio incrementscore call with..........................'+cid)
    var progressbar=$("#"+cid+ ' .progress-bar');
     

    $.ajax({
        url:'/incrementscore',
        data:{'tag':tag}

    })
    .done(function(data){
        var totalscore=0
        $("#"+cid+ ' .scoreboard').css({'display':'block'})
        //  console.log('New score.................. '+data.length)
        for (var i=0;i<$("#"+cid+ ' .scoreboard').length;i++){
            $($("#"+cid+ ' .scoreboard')[i]).html(data[i]['fields'].polloption_score)
            totalscore= totalscore+ data[i]['fields'].polloption_score;
        }

        
        // console.log(progressbar.length +' ------------ bars')
        for(var j=0;j<progressbar.length;j++){
            var p= Math.floor( (data[j]['fields'].polloption_score/totalscore)*100)
            // console.log(j+' ------------ '+p)
            $((progressbar)[j]).css({'width':p+'%'})
            $((progressbar)[j]).html(p+'%')

        }
        

    })
}

var attachradio=function(){

    // console.log('radio attached..........................')

    $('input[type=radio]').each(function(i,v){

    $(v).change(function(){
    if($(v).is(":checked")){
    // console.log($(v).attr('data-value'))
    incrementscore(  $(v).attr('data-value'),$(v).attr('data-colid') )    

    }

    })
    })
    
}





$('#navctrl').on('click',function(){
    $('#sidebar_id').css({'width':'250px'});
    $('#content').css({'margin-left':'250px'});

})

$('.closebtn').on('click',function(){
    $('#sidebar_id').css({'width':'0'});
    $('#content').css({'margin-left':'0'});
})






// sessionStorage.setItem('num2',0);
//     $.ajax({
//         url:'/jsonpoll',
//         data:{'page':'0','section':'Others'}

//     })
//     .done(
//         function(data){
//             //  console.log('from 2..............'+data)
//             h=$('#titletext2')
//             optionajax2(data[0]['fields'].poll_code)
//              h.html(data[0]['fields'].poll_question)
//         }
//     )
//     .fail(
//         function(){
//             console.log('error..............')
//         }
//     )


//     var makeajax2=function(page){

//          $.ajax({
//         url:'/jsonpoll',
//         data:{'page': page,'section':'Others'}

//     })
//     .done(
//         function(data){
//             // console.log(data)
//              optionajax2(data[0]['fields'].poll_code)
//             h=$('#titletext2')
//              h.html(data[0]['fields'].poll_question).hide().show('slow')
//         }
//     )
//     .fail(
//         function(){
//             console.log('error..............')
//             sessionStorage.num2=-1;
//         }
//     )

// }



// var optionajax2=function(code){

//          $.ajax({
//         url:'/jsonpolloption',
//         data:{'code': code}

//     })
//     .done(
//         function(data){
//             // console.log(data)
//             //console.log('ssss'+data.length)
//             a=$('#optionarea2')
//             a.html("")
//             for(var i=0;i<data.length;i++){
//                  a.append('<li  class="optionslist'+i+'  list-group-item radio"><label><input type="radio" name="optionsRadios" id="optionsRadios'+i+' value="option'+i+' checked><span class="optext">'+data[i]['fields'].polloption_text+'</span></li></label></li>').hide().show('slow')
//             }
//             //  a.html(data[0]['fields'].polloption_text)
            
//         }
//     )
//     .fail(
//         function(){
//             console.log('error..............')
            
//         }
//     )

// }
var getsurveycount=function(){
    $.ajax({
        url:'/surveycount',

    })
    .done(function(data){
        console.log(data['surveycount'] +' surveys..................................')
        processsurvey(data['surveycount']);
    })
    .fail(function(){
        console.log('get surveycount error...........................')
    })
}

getsurveycount();

var processsurvey=function(num){

}




$('#next2').on('click',function(){
    if(sessionStorage.num2){
        sessionStorage.num2=Number(sessionStorage.num2)+1;
    
    }
    makeajax2(sessionStorage.num2);
})


$('#avatar').click(function(e){
    console.log('x: '+e.pageX)
    var avatarstate=$('#avatarbox').css('display')
    if(avatarstate=='none'){
    $('#avatarbox').css({'display':'block'});
    // $('#avatarbox').css({'left':e.pageX+'px'})
}else{
    $('#avatarbox').css({'display':'none'});

    }
});

var loadstate=function(){
    $.ajax({
        url:'/loadstate',

    }
    ).done(function(data){
        console.log('state...........................'+data)

    })
}






var attachsharebtn=function(){
    $('.poll-share').each(function(i,v){ 
        
        $(v).click(function(){
            console.log('click.........................'+$(v).attr('id'))

            var col=$(v).attr('data-col')
            var desc=$('#'+col+' .panel-title p').text()
            var mycaption=$('#'+col+' .agenda-title').text().trim()
            console.log('caption  ooooooooooooooooooooooo'+mycaption)
             console.log(' desc  ooooooooooooooooooooooo'+desc)
            FB.ui({
                display: 'popup',
                method: 'share',
                href: window.location['href'],

                picture: 'http://fbrell.com/f8.jpg',
                caption: mycaption,
                description: desc,
                quote:desc
            }, function(response){});  
        
        })

    })
}














});