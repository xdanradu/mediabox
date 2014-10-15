winPlugin = {};

winPlugin.open = function(source, title, caption) {

  var re = /(?:\.([^.]+))?$/;

  var ext = re.exec(source)[1];

  if (ext === 'mp4') {
    winPlugin.appendVideo(source, title, caption);
  }

  if (ext === 'jpg' || ext === 'png') {
    winPlugin.appendImage(source, title, caption);
  }
}

winPlugin.getModalHtmlTemplate = function(sourceTemplate, title, caption){
  var template = "<div class='modalHeader'>";
  template += "<a href='' onClick='winPlugin.close();return false;'>";
  template += "<img src='images/close.png'></a></div>";
  template += "<div class='modalContent'>";
  template += sourceTemplate;
  template += "</div>";
  template +="<div class='modalFooter'>"+caption+"</div>"
  return template;
}

winPlugin.appendVideo = function(source, title, caption) {
  //if image or video
  var overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.className = "overlay";
  overlay.innerHTML = "";

  var modal = document.createElement("modal");
  modal.className = "modal hide";
  modal.id = "modal";
  var sourceHtmlTemplate = '<video id="videoPlay" controls="" autoplay="" name="media"><source src="' + source + '" type="video/mp4"></video>';
  modal.innerHTML = winPlugin.getModalHtmlTemplate(sourceHtmlTemplate, title, caption);
  overlay.appendChild(modal);

  var loading = document.createElement("div");
  loading.id="loading";
  overlay.appendChild(loading);

  document.body.appendChild(overlay);

  document.getElementById("videoPlay")
  .addEventListener('loadedmetadata', function(e){
    winPlugin.scaleTheWindow(this.videoWidth, this.videoHeight);
  });
}

winPlugin.appendImage = function(source, title, caption) {
  //if image or video
  var overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.className = "overlay";
  overlay.innerHTML = "";

  var modal = document.createElement("modal");
  modal.className = "modal hide";
  modal.id = "modal";
  var img = new Image();
  img.src = source;
  img.id = "imagePlay";
  modal.innerHTML = winPlugin.getModalHtmlTemplate(img.outerHTML, title, caption);
  overlay.appendChild(modal);

  var loading = document.createElement("div");
  loading.id="loading";
  overlay.appendChild(loading);

  document.body.appendChild(overlay);

  img.onload = function() {
    winPlugin.scaleTheWindow(this.width, this.height);
  }
}

winPlugin.scaleTheWindow = function(width, height){
  var modal = document.getElementById("modal");
  modal.style.width = width + "px";
  modal.style.height = 80+height + "px";
  modal.style.marginTop = -(height / 2) + "px";
  modal.style.marginLeft = -(width / 2) + "px";

  var loading = document.getElementById("loading");
  loading.className="hide";

  modal.className = "modal";
};

winPlugin.close = function() {
  //var overlay = document.getElementById("overlay");
  //console.dir(overlay);
  $(".overlay").remove();
};

document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.keyCode == 27) {
    $(".overlay").remove();
  }
};


$(function() {
  $("body").click(function(e) {
    if (e.target.id == "modal" || $(e.target).parents("#modal").size()) { 
    } else { 
      if (document.getElementById("loading").className==="hide"){
       $(".overlay").remove();
     }

   }
 });
});
