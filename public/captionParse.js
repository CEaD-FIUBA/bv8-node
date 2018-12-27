var captions = [];
var timesOfChapters = [];
var chapters = [];

function parserCaption(caption){
  console.log('Caption:'+caption);
  var caption_string = String(caption);

  var array = caption_string.split(",");
  var len = array.length;
   for (var i = 0; i < len-1; i=i+2) {
        var time = array[i];
        var text = array[i+1];
        var line = $("<p></p>");
        line.val(time);
        //Aca me fijo si mi caption es un indice o un caption
        var n = text.search("Tema:");
        //Si no es un indice
        if (n == -1){
          line.text(text);
          line.addClass('line');
          $("#caption").append(line);
          captions.push(line);
        }else{
          var chapter_name = text.split(":")[1];
          line.text(chapter_name);
          //console.log("chapter_name:"+chapter_name);
          line.addClass('chapter');
          $("#chapters").append(line);
          timesOfChapters.push(time);
          chapters.push(line);
    }
    console.log('text: '+text+'time: '+time);
  }
}
