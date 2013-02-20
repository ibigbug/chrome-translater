(function(){
  var config = {
    'title': '翻译选中文字至中文',
    'contexts': ['selection'],
    'onclick': doTranslate
  };
  chrome.contextMenus.create(config);

  function doTranslate(info, tab){
    var word = info.selectionText;
    var BASE_URL = 'http://dict.cn/';

   // try{
      var html = get(BASE_URL + word);
      var doc = setDocument(parseDom(html));
      var match = doc.getElementsByClassName('basic').length;
      if ( !match ){
        alert('查无此词');
        return
      }
      else {
        alert(match);
      }
    /*
    }
    catch(e){
      alert(e);
      alert('查询失败，请再试一次:(');
    }
    */

  }


  /*=== helpers ===*/

  var preferredDoc = window.document;

  function get(url){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
    return xhr.responseText;
  }

  function parseDom(str){
    var div = document.createElement('div');
    div.innerHTML = str;
    dom = div.childNodes;
    div = null;
    return dom
  }

  function setDocument( node ){
    alert(node);
    return preferredDoc.appendChild(node);
  }
})();
