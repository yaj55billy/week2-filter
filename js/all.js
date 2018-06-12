



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
        console.log(locationValue); //選到就印出那個區域

        var filterData =[];

        // dataLen為100筆，在這100筆中撈出條件符合的
        for (var i = 0; i< dataLen; i++) {

            //存取 dataArea 為這個物件的區域
            var dataArea = data.result.records[i].Zone;

            //經過篩選資料的 name
            var dataName = data.result.records[i].Name;
        
            if(locationValue == dataArea){
                //filterData 為經過篩選的資料 +入陣列
                filterData.push(data.result.records[i]);

                updateContent(filterData,dataName);
            }
        }
        
    }
}


var content = document.querySelector('.content-list');

// 組字串

function updateContent(filterData,dataName){
    var str = '';
    // console.log(dataName);
    console.log(filterData.length);
    // console.log(filterData[i].dataName);
    
    for (var i = 0; i< filterData.length; i++) {
        // console.log(filterData[i]);
        console.log(dataName);
        str = str +  `
        <li class="row">
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 list-img" style="background-image: url(images/content.png)"></div>
            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12 list-text">
                <h2>${21}</h2>
                <p>Donec euismod scelerisque ligula. Maecenas eu varius risus, eu aliquet arcu. Curabitur fermentum suscipit est, tincidunt mattis lorem luctus id. Donec eget massa a diam condimentum pretium. Aliquam erat volutpat. Integer ut tincidunt orci. Etiam tristique, elit ut consectetur iaculis, metus lectus mattis justo, vel mollis eros neque quis augue. Sed lobortis ultrices lacus, a placerat metus rutrum sit amet. Aenean ut suscipit justo.</p>
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
                    <span class="list-time">
                        <i class="fa fa-calendar" aria-hidden="true"></i>
                        2018/5/24 - 2018/5/31
                    </span>
                </div>
            </div>
            <a href="detail.html" class="link"></a>
        </li>`
    }
    content.innerHTML = str;

}

















