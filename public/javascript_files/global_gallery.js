$(function() {
  $(".img-w").each(function() {
    $(this).wrap("<div class='img-c'></div>")
    let imgSrc = $(this).find("img").attr("src");
     $(this).css('background-image', 'url(' + imgSrc + ')');
  })
            
  
  $(".img-c").click(function() {
    let w = $(this).outerWidth()
    let h = $(this).outerHeight()
    let x = $(this).offset().left
    let y = $(this).offset().top
    
    $(".activeness").not($(this)).remove()
   
    let copy = $(this).clone();
    copy.insertAfter($(this)).height(h).width(w).delay(500).addClass("activeness")
    $(".activeness").css('top', y - 8);
    $(".activeness").css('left', x - 8);
    
      setTimeout(function() {
    copy.addClass("positioned")
  }, 0)
    
  }) 
  
  

  
})

$(document).on("click", ".img-c.activeness", function() {
  let copy = $(this)
  copy.removeClass("positioned activeness").addClass("postactive")
  setTimeout(function() {
    copy.remove();
  }, 500)
})