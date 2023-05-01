

const requestURL = 'Store_info.json';
let request = new XMLHttpRequest();
request.open('GET',requestURL);
request.responseType='json';
request.send();

request.onload = function() {
    const locate = request.response;
    let locate_city=[];
    for(let x=0; x<locate.length; x++){
        locate_city[x] = locate[x].locate;
    }
    $(function(){

        /* 매장검색 & 지역검색*/
        /* 매장검색 버튼누를시 */
        $('.search_Store_button_wrap a').on('click focus',function(){
            $('.search_Store_input_label').removeClass('screen_out');
            $('.locate_Store_input_label').addClass('screen_out');
            $('.locate_Store_input_label').css('display','none');
        });

        /* 지역검색 버튼누를시 */
        $('.locate_Store_button_wrap a').on('click focus',function(){
            $('.locate_Store_input_label').removeClass('screen_out');
            $('.search_Store_input_label').addClass('screen_out');
            $('.locate_Store_input_label').css('display','block');
        });

        
        let local_text ='';
        for(let x =0; x<$('.local_city li').length; x++){
            local_text=local_text+' '+$('.local_city li').eq(x).text();
        }
        local_text=local_text.split(' ');
        local_text.shift();/* 배열 처음 빈공간 제거*/


        
        /* 검색버튼 누를시 검색하는곳 나옴 */
        $('.open_close').on('click',function(){
            $('.search_Store').toggleClass('active');

            if($('.search_Store').hasClass('active')==true){
                $('.open_close').text('닫기');
                $('.search_Store_wrap').css('display','flex');
            }else{
                $('.open_close').text('검색');
                $('.search_Store_wrap').css({'display':'none'});
            }
        });


        /* 버튼 누를시 section_three 숨김 */
        $('.hide').on('click',function(){
            $('.sec_one, .sec_two, .sec_three').removeClass('active');
        });






        /****** 지역검색하는 곳 *****/
        let Store_name_text='할리스 케이지할리스에프앤비 서울 중구';
        $('.local_city li').on('click',function(){
            var city=$(this).text();    //내가 클릭했을때 지정할 도시
            let bor=[]; //도시중 '시/구'만 저장할 공간
            let bor_index=0;
            let bor_remove_dup=['뒤로가기'];
            let bor_remove_dup_index=1;
            /* click시 도시중 '구'만 뽑아내기 ex(서울 '송파구', 서울 '서초구', 서울 '마포구)*/
            locate_city.forEach(function(el){
                if(el.match(city)){
                    bor[bor_index]=el.slice(3);
                    bor_index++;
                }
            });

            //'~구'들중에 중복을 제거하고 '구'는 하나만 출력
            bor.forEach(function(el){
                let count=0;
                for(let x=0; x<=bor_remove_dup.length; x++){
                    if(el==bor_remove_dup[x]){
                        count++;
                    }
                }
                if(count==0){
                    bor_remove_dup[bor_remove_dup_index]=el;
                    bor_remove_dup_index++;
                }
            })
            $('.local_city').css({'display':'none'});
            for(let x=0; x<bor_remove_dup.length; x++){
                let myLi = document.createElement('li');
                let myA = document.createElement('a');
                myA.setAttribute('href','#none');
                myA.textContent=bor_remove_dup[x];
                myLi.append(myA);
                document.querySelector('.local_city_bor').append(myLi);
            }
            
            $('.local_city_bor li').on('click',function(){
                /* 뒤로가기 버튼 누를시 다시 지역이 뜰 수 있도록 설정 */
                if($(this).index()===0){
                    $('.local_city').css({'display':'flex'});
                    $('.local_city_bor').text('');
                }else{
                    /* 지역 '~구' 클릭시 관련지역 매장들 테이블에 출력 */
                    $('.Store_detail_table tbody').text('');
                    var myTbody=$('.Store_detail_table tbody');
                    for(let x=0; x<locate.length; x++){
                        if(locate[x].locate.match(city +" "+ $(this).text())){
                            /* table안에 요소들 생성해서 이어주는 작업 */
                            let myTR= document.createElement('tr');
                            let myTD_locate= document.createElement('td');

                            let myTD_Store_name = document.createElement('td');
                            let myA_myTdStore_name= document.createElement('a');
                            myA_myTdStore_name.setAttribute('href','#none');
                            myTD_Store_name.append(myA_myTdStore_name);

                            let myTD_addr = document.createElement('td');
                            let myA_myTdAddr = document.createElement('a');
                            myA_myTdAddr.setAttribute('href','#none');
                            myTD_addr.append(myA_myTdAddr);

                            let myTD_service = document.createElement('td');
                            let myTD_Tel = document.createElement('td');

                            myTD_locate.textContent=locate[x].locate;
                            myA_myTdStore_name.textContent=locate[x].Store;
                            myA_myTdAddr.textContent=locate[x].addr;
                            myTD_service.textContent=locate[x].Service;
                            myTD_Tel.textContent=locate[x].Tel;
                            
                            myTR.append(myTD_locate);
                            myTR.append(myTD_Store_name);
                            myTR.append(myTD_addr);
                            myTR.append(myTD_service);
                            myTR.append(myTD_Tel);
                            
                            myTbody.append(myTR);
                        }
                    }
                    /* 테이블 누를때 section_three 나타남 */
                    $('.Store_detail_table tbody tr td a').on('click',function(){

                        /* section_three 열고닫기 */
                        $('.sec_three, .sec_two, .sec_one').addClass('active');

                        let Store_TR=$(this).parent().parent();
                        let Store_TR_copy=Store_TR;
                            Store_TR='할리스 '+Store_TR.children('td:eq(1)').text();
                        
                        // 키워드로 장소를 검색합니다
                        ps.keywordSearch(Store_TR, placesSearchCB)
                            let Store_name_value = Store_TR.slice(4); /* '할리스 매장명' 에서 할리스를 제외하는 작업 */
                        document.querySelector('.sec_three .Store_name').textContent=Store_name_value;

                        //매장의 이미지 로드
                        for(let num=0; num<3; num++){
                                let StoreImg_txt ='Store_img_box/'+Store_name_value+'/img_'+(num+1)+'.jpg';
                                $('.sec_three_img_box .sub_img_box img').eq(num).attr('src',StoreImg_txt);
                        }
                        $('.sec_three_main_img').attr('src', $('.sec_three_img_box .sub_img_box img').eq(0).attr('src'));
                        //매장 이미지 클릭시 매장정보의  바뀜
                        $('.sec_three_img_box .sub_img_box img').on('click',function(){
                            let Store_main_img=$(this).attr('src');
                            $('.sec_three_main_img').attr('src', Store_main_img);
                        });
                        document.querySelector('.sec_three .Store_introduce .addr').textContent=Store_TR_copy.children('td:eq(2)').text();
                        document.querySelector('.sec_three .Store_introduce .Tel').textContent=Store_TR_copy.children('td:eq(4)').text();
                    });
                }
            });
        });
        /* 테이블 누를때 section_three 나타내는 초기값 */
        $('.Store_detail_table tbody tr td a').on('click',function(){
            let Store_TR=$(this).parent().parent();
            Store_TR=Store_name_text;
        
            // 키워드로 장소를 검색합니다
            ps.keywordSearch(Store_TR, placesSearchCB);
            $('.sec_three, .sec_two, .sec_one').addClass('active');
        });



        




        $('.input_label_detail a').on('click',function(){
            let search_keyword=$('#get_Store_name').val();
            
            let locate_Store = [];  //전체 매장명 들어갈공간
            let locate_addr = [];   //전체 매장주소 들어갈 공간

            for(let x=0; x<locate.length; x++){
                locate_Store[x]=locate[x].Store;
                locate_addr[x]=locate[x].addr;
            }

            let my_search_addr =[]; //내가 검색한 주소 들어갈 공간

            locate_Store.forEach(function(el){
                console.log(el);
            });

            // 키워드로 장소를 검색합니다
            ps.keywordSearch(search_keyword, placesSearchCB);
        });

        
        
    });


}