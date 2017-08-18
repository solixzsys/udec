$(function(){



    $.ajax({
        url:'/dynamictemp',

    })
    .done(function(data){
        for(var i=0;i<data.length;i++){


            var template=$('#dynamictemplate').html();
             $('#content div.container').prepend(template.replace(/%surveydescription%/,data[i]['fields'].surveytag_description)
             .replace(/%surveytitle%/,data[i]['fields'].surveytag_title)
             .replace(/%rowid%/g,"row_"+i)
             .replace(/%titletext%/g,"titletext_"+i)
             .replace(/%btntag%/,data[i]['fields'].surveytag_tag)
             .replace(/%banner%/,"banner_"+i)
             .replace(/%next%/,"next_"+i)
             .replace(/%myChart%/,"myChart_"+i)
             );






        // console.log(data[i]['fields']);
        makeajax(data[i]['fields'].surveytag_tag,0,"titletext_"+i,"row_"+i);

    }
    retrive_quotes();
    // retrive_feed();

     attachbtn();
     retrive_polls();


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


    var makeajax=function(stag,page,sect,rid){

         $.ajax({
        url:'/jsonpoll',
        data:{'page': page,'stag':stag}

    })
    .done(
        function(data){
             console.log('uuu...........................'+ data[0]['fields'].poll_question)
             optionajax(data[0]['fields'].poll_code,rid)
            h=$('#'+sect)
            console.log('tttttttttttttttttnn    '+h)
             h.html(data[0]['fields'].poll_question).hide().show('slow')
        }
    )
    .fail(
        function(){
            
            sessionStorage[stag]=0;
            console.log('error..............'+sessionStorage[stag])
            makeajax(stag,sessionStorage[stag],sect,rid)
        }
    )

}



var optionajax=function(code,rid){

         $.ajax({
        url:'/jsonpolloption',
        data:{'code': code}

    })
    .done(
        function(data){
            // console.log('from 1..............'+data)
            // console.log('ssss'+data.length)
            a=$('#'+rid +' ul#optionarea')
            console.log('#'+rid +' ul#optionarea')
            // a=$('#optionarea')
            a.html("")
            for(var i=0;i<data.length;i++){
               // a.append('kkk')
                 a.append('<li class="optionslist'+i+'   list-group-item radio"><label><input type="radio" data-rowid="'+rid+'" data-value='+data[i]['fields'].polloption_code+' name="optionsRadios" id="optionsRadios'+i+'" value="option'+i+' checked><span class="optext"><span>'+data[i]['fields'].polloption_text+'</span></label><b  class="scoreboard badge pull-right">'+ data[i]['fields'].polloption_score+'  </b></li>').hide().show('slow')
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

        
          
        console.log('reading........................')
       // $('#row_1 #feedspace').show('slow')
        //      $('.quote i').html("--- "+data[0]['fields'].author).hide('slow').show('slow')
        //  var k=1
        //  $('#row_1 #feedspace h3.title').html(data[0]['fields'].title)
        // $('#row_1 #feedspace p.desc').html(data[0]['fields'].description)
        setInterval(function(){
           
            
             $('#feedspace').css({'top':'-200px','opacity':1})
            
            if(k>data.length-1){
                k=1;
            }
            // console.log('k============== '+k)
             $('#row_1 #feedspace h3.title').html(data[k]['fields'].title)
        $('#row_1 #feedspace p.desc').html(data[k]['fields'].description)
        $('#feedspace').animate({top:"+100px"},3000).animate({top:"-20px"},1000).animate({opacity:1},2000).animate({opacity:0},1000)

        //  console.log('title--------------------------------  '+data[0]['fields'].title)
            k=k+1
        },10000)

       


    })
    

}


var retrive_polls=function(){
    $.ajax({
        url:'/getpolls',

    })
    .done(function(data){
         console.log('from getpolls...........'+data)
        var x1=0;
        var x2=0;
        var x3=0;
        var x4=0;
        obj={};
        objs=[];
        opts=[]
        $.each(data,function(i,v){
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
                 console.log('from getoptions...........'+obj['question'+i])
                 makechart(i,x1,x2,x3,x4,obj['question'+i]);

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


var makechart=function(i,x1,x2,x3,x4,ques){
     var ctx = $('#myChart_'+i);
            var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [x1,x2,x3,x4],
                datasets: [{
                // label: ques,
                data: [12, 19, 3, 17],
                backgroundColor: "rgba(153,255,51,0.4)"
                }]
            }
            });


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
for(var i=0;i< dynamicbtn.length;i++){
    var btn=$(dynamicbtn[i])
    btn.click(function(){
        var n=$(this).attr('name');

        if(sessionStorage[n]){
            sessionStorage[n]=Number(sessionStorage[n])+1;
              makeajax($(this).attr('name'),sessionStorage[n],$(this).attr('data-titletext'),$(this).attr('data-row'))

        }else{
            sessionStorage.setItem(n,1)
            makeajax($(this).attr('name'),1,$(this).attr('data-titletext'),$(this).attr('data-row'))
        }



        console.log('i am dynamicbtn '+sessionStorage[n])
        $('.progress-bar').css({'width':'0'})
    })
}


}

var incrementscore=function(tag,rowid){
    console.log('radio incrementscore call..........................')
    var progressbar=$("#"+rowid+ ' .progress-bar');
     

    $.ajax({
        url:'/incrementscore',
        data:{'tag':tag}

    })
    .done(function(data){
        var totalscore=0
        $("#"+rowid+ ' .scoreboard').css({'display':'block'})
        // console.log('New score.................. '+data.length)
        for (var i=0;i<$("#"+rowid+ ' .scoreboard').length;i++){
            $($("#"+rowid+ ' .scoreboard')[i]).html(data[i]['fields'].polloption_score)
            totalscore= totalscore+ data[i]['fields'].polloption_score;
        }

        
        console.log(progressbar.length +' ------------ bars')
        for(var j=0;j<progressbar.length;j++){
            var p= Math.floor( (data[j]['fields'].polloption_score/totalscore)*100)
            console.log(j+' ------------ '+p)
            $((progressbar)[j]).css({'width':p+'%'})
            $((progressbar)[j]).html(p+'%')

        }
        

    })
}

var attachradio=function(){

    console.log('radio attached..........................')

    $('input[type=radio]').each(function(i,v){

    $(v).change(function(){
    if($(v).is(":checked")){
    console.log($(v).attr('data-value'))
    incrementscore(  $(v).attr('data-value'),$(v).attr('data-rowid') )    

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
















});