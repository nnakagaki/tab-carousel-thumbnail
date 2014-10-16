$.Carousel = function ($el) {
  this.$el = $el;
  this.activeIdx = 0;
  this.$el.find("section img:first-child").addClass("active");

  var that = this;

  this.$el.find(".slide-left").on("click", function (event) {
    that.slide(1, "left")
  })

  this.$el.find(".slide-right").on("click", function () {
    that.slide(-1, "right")
  })

  this.slide = function (dir, dirStr) {
    var prev = that.$el.find("section img.active");

    that.activeIdx += dir;
    that.activeIdx = that.activeIdx % that.$el.find("section img").length;

    var next = that.$el.find("section img").eq(that.activeIdx);
    next.addClass(dirStr === "left" ? "right" : "left");

    setTimeout(function() {
      prev.addClass(dirStr);
    }, 1)

    setTimeout(function() {
      next.addClass("active").removeClass(dirStr === "left" ? "right" : "left");
    }, 0)
    prev.one("transitionend", function() {
      prev.removeClass("active " + dirStr);
    })
  }

};

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel($(this));
  });
};