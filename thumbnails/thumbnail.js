$.Thumbnail = function ($el) {
  this.$el = $el;
  this.$gutterImages = this.$el.find(".gutter-images img");
  this.$gutter = this.$el.find("section.gutter");
  this.gutterIdx = 0;

  var that = this;
  this.activate = function ($img) {
    console.log("hereeee")
    that.$el.find("section.active img").remove();
    that.$el.find($img).clone().appendTo("section.active");
    that.$activeImg = $img;
  }

  this.mouseOver = function ($img) {
    that.$el.find("section.active img").remove();
    that.$el.find($img).clone().appendTo("section.active");
  }

  this.activate(this.$gutterImages[0]);

  this.$gutter.on("click", "img", function (event) {
    var imgAlt = $(event.currentTarget).attr("alt")
    var $img = that.$el.find(".gutter-images img[alt=" + imgAlt + "]")
    that.activate($img);
  })

  this.$gutter.on("mouseenter", "img", function (event) {
    console.log("here")
    that.mouseOver($(event.currentTarget));
  });

  this.$gutter.on("mouseleave", "img", function (event) {
    that.activate(that.$activeImg);
  });


  this.fillGutterImages = function() {
    that.$el.find("section.gutter img").remove();
    for (var i = 0; i < 5; i++) {
      var idx = (i + that.gutterIdx) % that.$gutterImages.length
      var $img = $(that.$gutterImages[idx]);
      $img.clone().appendTo("section.gutter");
    }
  }

  this.fillGutterImages();

  this.$el.find(".left").on("click", function (event) {
    that.gutterIdx -= 1;
    var mod = that.$gutterImages.length
    that.gutterIdx = (that.gutterIdx + mod) % mod;
    that.fillGutterImages();

  })

  this.$el.find(".right").on("click", function (event) {
    that.gutterIdx += 1;
    var mod = that.$gutterImages.length
    that.gutterIdx = (that.gutterIdx + mod) % mod;
    that.fillGutterImages();

  })

}

$.fn.thumbnail = function () {
  return this.each(function () {
    new $.Thumbnail($(this));
  })
}