$(document).ready(function(){
    $("#hide").click(function(){
      $(".finishedcard").hide(1000);
    });
    $("#show").click(function(){
      $(".finishedcard").show(1000);
    });
  });

  $(document).ready(function(){
    $("#send").click(function(){
      $(".tasks").show(1000);
    });
  });