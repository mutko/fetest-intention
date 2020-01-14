$(document).ready(function() {
  console.log("App started");

  // init slick carousel
  if ($(".hero__carousel").length) {
    $(".hero__carousel").slick({
      arrows: false,
      autoplay: true,
      autoplaySpeed: 5000,
      dots: true
    });

    // remove numbers from slick dots
    $(".slick-dots button").each(function() {
      this.textContent = "";
    });
  }
  // init iCheck replacer
  if ($(".filter input").length) {
    $(".filter input").iCheck();
  }

  // mobile menu toggle
  $("#hamb-btn").click(function() {
    $("#collapse").toggle(500);
    $(".page-nav__toggler").toggleClass("list-open");
  });

  // resizing browser properly opens and close navigation
  $(window).resize(function() {
    let vpwidth = $(window).outerWidth();
    if (vpwidth > 991) {
      $("#collapse").css({ display: "block" });
    }
    if (vpwidth <= 991) {
      $("#collapse").css({ display: "none" });
    }
  });

  // dropdown toggle
  $(".dropdown").click(function() {
    $(".dropdown__list").toggleClass("open");
  });

  // changes dropdown text
  $(".dropdown__item").each(function(index) {
    $(this).on("click", function() {
      $(".dropdown__select").text(this.textContent);
    });
  });

  // click outside dropdown to close it
  $(window).click(function(e) {
    const $menu = $(".dropdown__wrapper");
    if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
      $(".dropdown__list").removeClass("open");
    }
  });
});
