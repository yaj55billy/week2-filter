



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
        updateContent(filterData);
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
        updateContent(filterData);
    }
}


var content = document.querySelector('.content-list');

// 組字串

function updateContent(filterData){
    var str = '';
    var dataTotal = document.querySelector('.dataTotal');
    dataTotal.textContent = filterData.length;
    // console.log(filterData);
    // console.log(filterData.length);
    // Description
    for (var i = 0; i< filterData.length; i++) {
        str = str +  `
        <li class="row">
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 list-img" style="background-image: url(${filterData[i].Picture1})"></div>
            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12 list-text">
                <h2>${filterData[i].Name}</h2>
                <p>${filterData[i].Description}</p>
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
                        ${filterData[i].Tel}
                    </span>
                </div>
            </div>
            <a href="detail.html" class="link"></a>
        </li>`
    }
    content.innerHTML = str;

}

















