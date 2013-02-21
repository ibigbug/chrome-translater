(function(){
  var config = {
    'title': '翻译选英文翻译为中文',
    'contexts': ['selection'],
    'onclick': doTranslate
  };
  chrome.contextMenus.create(config);

  function doTranslate(info, tab){
    var word = info.selectionText;
    var BASE_URL = 'http://dict.cn/';

    try{
      var html = get(BASE_URL + word);
      var doc = parseDom(html);
      var match = getByClass(doc, 'basic');
      if ( !match.length ){
        alert('查无此词');
        return
      }
      else {
        var arr = []; //储存单词释义
        var resultArr = match[0].getElementsByTagName('li');
        forEach(resultArr, function(item){
          arr.push(item.innerText);
        });
        alert(arr.join('\n'));
      }
    }
    catch(e){
      alert(e);
      alert('查询失败，请再试一次:(');
    }

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

  function getByClass( nodelist, className ){
    var ret = [];
    (function wrapper(nodelist, className){
      var length = nodelist.length;
      for (var i=0; i<length; i++){
        if (typeof nodelist[i].className != 'undefined'){
          if ( nodelist[i].className.indexOf(className) > -1){
            ret.push(nodelist[i])
          }
        }
        if (nodelist[i].childNodes){
          wrapper(nodelist[i].childNodes, className);
        }
      }
    })(nodelist, className);
    return ret
  }

  function hasClass( node, className ){
    var classNameArray = node.className.split(/\s+/);
    for (var i=0; i<classNameArray.length; i++){
      return classNameArray[i] == className;
    }
  }

  function forEach(arr, fn){
    var length = arr.length;
    for (var i=0; i<length; i++){
      fn(arr[i])
    }
  }

  function traverseProperty(obj) {
    for (prop in obj) {
      console.log(prop);
    }
  }

})();
