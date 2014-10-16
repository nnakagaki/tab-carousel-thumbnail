$.Tabs = function ($el) {
  this.$el = $el;

  this.$contentTabs = this.$el.find("#content-tabs");
  this.istransitioning = false
  var that = this;
  this.clickTab = function (event) {
    if (!that.istransitioning) {
      that.istransitioning = true
      that.$activeTab = that.$el.find(".tab-pane.active");

      event.preventDefault();

      that.$el.find("li a.active").removeClass("active"); //link stuff
      that.$activeTab.removeClass("active").addClass("transitioning");

      that.$activeTab.one("transitionend", function() {
        console.log("Here")
        that.$activeTab.removeClass("transitioning")

        $(event.currentTarget).addClass("active");

        var $tab = that.$contentTabs.find($(event.currentTarget).attr("href"));
        console.log($tab)
        $tab.addClass("transitioning");
        console.log($tab)
        setTimeout(function(){
          $tab.addClass("active");
          that.istransitioning = false;
        }, 0)
        console.log($tab)
      });
    } else {
      setTimeout(function () {
        that.clickTab(event);
      }, 1100);
    }


  };

  this.$el.on("click", "a", this.clickTab);
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs($(this));
  });
};