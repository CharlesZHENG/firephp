
function IsNumeric(sText)
{
  
  if(sText=='') return false;
  
   var ValidChars = "0123456789.";
   var IsNumber=true;
   var Char;
 
   for (i = 0; i < sText.length && IsNumber == true; i++) 
      { 
      Char = sText.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) 
         {
         IsNumber = false;
         }
      }
   return IsNumber;
}

function countAttributes(obj) {
  var count = 0;
  if(!obj) return count;
  for (var key in obj) {
    count++;
  }
  return count;  
}

function str_repeat(str, repeat) {
  var output = '';
  for (var i = 0; i < repeat; i++) {
    output += str;
  }
  return output;
}


var MAX_DEPTH = 10;

var UniqueIndex = 0;

function print_r(RequestKey,obj, indent, depth) {
  var nl = '<br/>\n';
  var ws = '&nbsp;';
  var output = '';
  indent = (!indent) ? 0 : indent;
  depth = (!depth) ? 0 : depth;
  UniqueIndex = (!UniqueIndex) ? 0 : UniqueIndex;
  
  if (depth > MAX_DEPTH) {
    return str_repeat(ws, indent) + '<font color="orange">*Maximum Depth Reached*</font>'+nl;
  }
  if (typeof(obj) == "object") {
    
    if(indent == 0) {
      output += 'array(' + nl;
    }
    
    indent++;
    var child = '';
    var child_count = countAttributes(obj);
    var child_index = 0;
    for (var key in obj) {
      
      UniqueIndex++;
      
      try {
        child = obj[key];
      }
      catch (e) {
        child = '<font color="orange">*Unable To Evaluate*</font>';
      }
      
      if ( key == '__SKIP__' || child=='__SKIP__' ) {
        /* Skip */
      }
      else {
      
        output += '<div class="name" key="' + hex_md5(UniqueIndex + key) + '">';
        
        if (IsNumeric(key)) {
          output += str_repeat(ws, indent) + '[' + '<font color="green">' + key + '</font>' + '] => ';
        }
        else 
        if (typeof(key) == "string") {
          output += str_repeat(ws, indent) + '[' + '<font color="red">\'' + key + '\'</font>' + '] => ';
        }
        else {
          output += str_repeat(ws, indent) + '[' + key + '] => ';
        }
        
        output += '</div>';
        
        if (typeof(child) == "object") {
          indent++;

          output += '<div class="name" key="' + hex_md5(UniqueIndex + key) + '">';
          
          output += 'array(';
          output += '<div class="hide" id="' + RequestKey + hex_md5(UniqueIndex + key) + 'k">';
          var count = countAttributes(child);
          output += ' <font color="blue">... ' + count + ' element' + ((count > 1 || count == 0) ? 's' : '') + ' ...</font> )';
          output += '</div>';
          output += nl;
          
          output += '</div>';
          
          //        output += typeof(child) + nl;
          //        output += str_repeat(ws, indent) + '(' + nl;
          
          output += '<div id="' + RequestKey + hex_md5(UniqueIndex + key) + 'v">';
          
          output += print_r(RequestKey, child, indent, depth + 1);
          
          output += str_repeat(ws, indent) + ')' + nl;
          
          output += '</div>';
          indent--;
        }
        else 
        if (IsNumeric(child)) {
        
          output += '<div id="' + RequestKey + hex_md5(UniqueIndex + key) + 'v">';
          output += '<font color="green">' + child + '</font>';
          output += '</div>';
          output += '<div class="hide" id="' + RequestKey + hex_md5(UniqueIndex + key) + 'k">';
          output += '<div class="name" key="' + hex_md5(UniqueIndex + key) + '">';
          output += ' <font color="blue">...</font>';
          output += '</div>';
          output += '</div>';
          output += nl;
          
        }
        else 
        if (typeof(child) == "string") {
        
          output += '<div id="' + RequestKey + hex_md5(UniqueIndex + key) + 'v">';
          output += '<font color="red">\'' + child + '\'</font>';
          output += '</div>';
          output += '<div class="hide" id="' + RequestKey + hex_md5(UniqueIndex + key) + 'k">';
          output += '<div class="name" key="' + hex_md5(UniqueIndex + key) + '">';
          output += ' <font color="blue">...</font>';
          output += '</div>';
          output += '</div>';
          output += nl;
          
        }
        else {
        
          output += '<div id="' + RequestKey + hex_md5(UniqueIndex + key) + 'v">';
          output += child;
          output += '</div>';
          output += '<div class="hide" id="' + RequestKey + hex_md5(UniqueIndex + key) + 'k">';
          output += '<div class="name" key="' + hex_md5(UniqueIndex + key) + '">';
          output += ' <font color="blue">...</font>';
          output += '</div>';
          output += '</div>';
          output += nl;
        }
      }
      child_index++;
    }
    indent--;
    output += (indent == 0) ? ')' + nl : '';
    return output;
  }
  else {
    return str_repeat(ws, indent) + obj + nl;
  }
}


 
 /*
 * Variable: data      Contains data from FirePHP-Data header
 * Variable: html      Will be displayed in the panel
 * Variable: key       A unique hash for every request
 * Variable: FirePHPRenderer    The FirePHPRenderer object
 */

data = json_parse(data);

html = '<style>                                  '+
       '  #'+key+' DIV      { display: inline; } '+
       '  #'+key+' DIV.name { cursor:pointer;  } '+
       '  #'+key+' DIV.hide { display: none;   } '+
       '</style>                                 '+
       '<div id="'+key+'">                       ';
			 
html += print_r(key,data);
html += '</div>';

/* 
 * Called once when FirePHP initializes
 */
FirePHPRenderer.Init = function() {
}

/* 
 * Called once for each request when "Server" tab is clicked
 */
FirePHPRenderer.InitRequest = function(Key) {
  $('#'+Key+' DIV.name').bind("click", function(e) {
    var obj = $('#'+Key+' #'+Key+$(this).attr('key')+'k');
    obj.css('display',
            (obj.css('display')=='none')?
            'inline':'none');
    var obj = $('#'+Key+' #'+Key+$(this).attr('key')+'v');
    obj.css('display',
            (obj.css('display')=='none')?
            'inline':'none');
  });
}
