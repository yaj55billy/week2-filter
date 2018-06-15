
// $('.sidebar-filter li h3 .fa.fa-plus').each(function(){
//     $(this).click(function(){
//         $(this).parents('').siblings('.location').slideDown(500);
//         $(this).css('display','none');
//         $(this).siblings('.fa-minus').css('display','block');
//     });
// });

// $('.sidebar-filter li h3 .fa.fa-minus').each(function(){
//     $(this).click(function(){
//         $(this).parents('').siblings('.location').slideUp(500);
//         $(this).css('display','none');
//         $(this).siblings('.fa-plus').css('display','block');
//     });
// });


var xhr = new XMLHttpRequest();

//readyState 
//0 創建了XMLHttpRequest，但並沒有連結資料
//1 open 設定了資料，但還沒有傳送資料
//4 撈到資料，數據完全接收

//補充 2表示偵測到 send   3表示loading中，有的檔案內容很大

// get post
//網址
// 同步和非同步
xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true);


// 同步和非同步
// true 非同步: 不會等資料傳回來，就會繼續往下跑，等到回傳才會自動回傳
// false 同步: 會等資料傳回來，才繼續往下跑
// 較常使用ture的概念，像是現在常用的框架都有非同步概念

xhr.send(null);

// onload事件
xhr.onload = function(){
    //將整個data 透過JSON.parse轉成物件，並把此物件的總長存取
    var data = JSON.parse(xhr.responseText);
    var dataLen = data.result.records.length;
    
    //將地區選擇存取，如果發生change事件則執行areaFilter
    var location = document.getElementById('location');
    location.addEventListener('change',areaFilter);

    //location 篩選
    function areaFilter(){
        var locationValue = document.getElementById('location').value;
        // console.log(locationValue); //選到就印出那個區域

        var filterData =[];

        // dataLen為100筆，在這100筆中撈出條件符合的
        for (var i = 0; i< dataLen; i++) {

            //存取 dataArea 為這個物件的區域
            var dataArea = data.result.records[i].Zone;

            if(locationValue == dataArea){
                //filterData 為經過篩選的資料 +入陣列
                filterData.push(data.result.records[i]);   
            }
        }
        pageProcess(filterData);
    }

    //將地區選擇存取，如果發生change事件則執行areaFilter
    var searchBtn = document.querySelector('.search button');
    searchBtn.addEventListener('click',searchFilter);

    function searchFilter(){
        var searchTextValue = document.getElementById('search-text').value;
        // console.log(searchTextValue);

        var filterData =[];
        for (var i = 0; i< dataLen; i++) {

            //存取 相關資訊 為這個物件的區域
            var dataDescription = data.result.records[i].Description;
            // 判斷變數dataDescription值是否包含 searchTextValue,如果dataDescription.indexOf(searchTextValue)不等於-1說明包含 “searchTextValue” 為true繼續執行
            if(dataDescription.indexOf(searchTextValue)!=-1){
                //filterData 為經過篩選的資料 +入陣列
                filterData.push(data.result.records[i]);   
            }
        }
        pageProcess(filterData);
    }

    var checkAll = document.getElementById('check-all');
    checkAll.addEventListener('click',checkCate);

    var checkFree = document.getElementById('check-free');
    checkFree.addEventListener('click',checkCate);

    function checkCate(){

        var filterData =[];
        $('#check-all').toggleClass('active');
        $('#check-free').toggleClass('active');
        
        if($('#check-all').hasClass('active')){
            for (var i = 0; i< dataLen; i++) {
                filterData.push(data.result.records[i]);
            }
            pageProcess(filterData);
        } else{
            // 回到初始狀態
            content.innerHTML = '';
            page.innerHTML = '';
            pageProcess(filterData);
        }

        if($('#check-free').hasClass('active')){
            for (var i = 0; i< dataLen; i++) {
                var dataArea = data.result.records[i].Ticketinfo;

                if(dataArea == '免費參觀'){
                    filterData.push(data.result.records[i]);   
                }
            }
            pageProcess(filterData);
        } else{
            // 回到初始狀態
            content.innerHTML = '';
            page.innerHTML = '';
            pageProcess(filterData);
        }

    }
}






// --------------------------------------- 頁碼的處理
var page = document.querySelector(".page_no");

var pageNum = 6;
var nowPage = 1;

function pageProcess(array){

    var result = [];
    var btnStr = "";
    
    for(var i=0 ; i<array.length ; i+=pageNum){
        // array.slice(i,i+pageNum),做一新陣列，範圍從 i到 i+pageNum
        result.push(array.slice(i,i+pageNum));  
        btnStr += '<button class="page"><a href="#">'+ result.length +'</a></button>';
    }
    page.innerHTML = '<button class="page_prev"><a href="#"><p> < </p></a></button>'+'<div class="page_ul">'+ btnStr +'</div>' + '<button class="page_next"><a href="#"><p> > </p></a></button>';

    // --------------- page.innerHTML 為組頁碼


    var resultLen = result.length;
    
    if (array.length > pageNum){
        page.style.display = "block";
    }else{
        page.style.display = "none";
    }
    // --------------------------  判斷顯示頁數


    var startInfo = (nowPage-1) * pageNum + 1; 
    //開始顯示的資料
    var endInfo = nowPage * pageNum; 
    //最後顯示的資料

    pageJudgment(startInfo,endInfo,array,resultLen);
  }

  // --------------------------------------- 頁碼的處理 END  往下為判斷點擊的是數字頁碼、Next Prev



  function pageJudgment(startInfo,endInfo,array,resultLen){

    numJudgment(1); //一點擊後，判定為第一頁

    var pageChild = document.querySelectorAll(".page_no .page"); 
    var prevBtn = document.querySelector('.page_prev');
    var nextBtn = document.querySelector('.page_next');
    var num = 1; //num初始
    
    for(i= 0 ;i<pageChild.length;i++){
        pageChild[i].addEventListener('click',function(e){
            e.preventDefault();
            num = e.target.textContent;
            startInfo = (num-1) * pageNum + 1;
            endInfo = num * pageNum;
            numJudgment(num);
            updateContent(startInfo,endInfo,array);
        });
    }

    
    prevBtn.addEventListener('click',function(e){
        num = Number(num) -1;
        startInfo = (num-1) * pageNum + 1;
        endInfo = num * pageNum;
        numJudgment(num);
        
    });

    nextBtn.addEventListener('click',function(){
        num = Number(num) +1;
        startInfo = (num-1) * pageNum + 1;
        endInfo = num * pageNum;
        console.log(num);
        numJudgment(num);
    });

    function numJudgment(num){

        var prevBtn = document.querySelector('.page_prev');
        var nextBtn = document.querySelector('.page_next');
        var pageChild = document.querySelectorAll(".page_no .page"); 

        // 偵測最後一頁
        if(num == resultLen){
            nextBtn.style.display= 'none';
            prevBtn.style.display= 'inline-block';
            addActive(num);
            updateContent(startInfo,endInfo,array);
        }

        // 偵測第一頁
        if (num == 1){
            //初始渲染
            prevBtn.style.display= 'none';
            nextBtn.style.display= 'inline-block';
            addActive(num);
            updateContent(startInfo,endInfo,array);
        } 

        if(num>1 && num<resultLen){
            prevBtn.style.display= 'inline-block';
            nextBtn.style.display= 'inline-block';
            addActive(num);
            updateContent(startInfo,endInfo,array);
        }

        function addActive(num){
            for(i= 0 ;i<pageChild.length;i++){
                if(num == pageChild[i].textContent){
                    pageChild[i].setAttribute('class','page active');
                } else{
                    pageChild[i].setAttribute('class','page');
                }
            }
        }
    }

  }



var content = document.querySelector('.content-list');

// 組字串

function updateContent(startInfo,endInfo,array){
    var str = '';

    var dataTotal = document.querySelector('.dataTotal');
    dataTotal.textContent = array.length;

    // 如果資料未滿4筆時，則將endInfo帶入陣列長度，例如array只有2筆資料
    // ，但如果endInfo為4時，則for迴圈跑的第2、第3筆將會出錯
    if(array.length < endInfo){
        endInfo = array.length;
    }


    for (var i =startInfo-1; i< endInfo; i++) {
        str = str +  `
        <li class="row">
            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 list-img" style="background-image: url(${array[i].Picture1})"></div>
            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12 list-text">
                <h2>${array[i].Name}</h2>
                <p>${array[i].Description}</p>
                <div style="margin-bottom: 16px;">
                    <span class="list-organizer">
                        Ethan Foster
                    </span>
                    <span class="list-categories">
                        Entertainment
                    </span>
                </div>
                <div>
                    <span class="list-location">
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                        Kaohsiung City
                    </span>
                    <span class="list-phone">
                        <i class="fa fa-phone" aria-hidden="true"></i>
                        ${array[i].Tel}
                    </span>
                </div>
            </div>
            <a href="detail.html" class="link"></a>
        </li>`
    }
    content.innerHTML = str;

    $('html,body').animate({scrollTop:$('.content-list').offset().top},1000);

}

















