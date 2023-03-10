import jQuery from "jquery";

(function ($) {
  class CheckboxDropdown {
    constructor(el) {
      var _this = this;
      this.isOpen = false;
      this.areAllChecked = false;
      this.$el = $(el);
      this.$label = this.$el.find(".dropdown-label");
      this.$checkAll = this.$el.find('[data-toggle="check-all"]').first();
      this.$inputs = this.$el.find('[type="checkbox"]');

      console.log("2313");
      this.onCheckBox();

      this.$label.on("click", function (e) {
        e.preventDefault();
        _this.toggleOpen();
      });

      this.$checkAll.on("click", function (e) {
        e.preventDefault();
        _this.onCheckAll();
      });

      this.$inputs.on("change", function (e) {
        _this.onCheckBox();
      });
    }
    onCheckBox() {
      this.updateStatus();
    }
    updateStatus() {
      var checked = this.$el.find(":checked");

      this.areAllChecked = false;
      this.$checkAll.html("Check All");

      if (checked.length <= 0) {
        this.$label.html("Select Options");
      } else if (checked.length === 1) {
        this.$label.html(checked.parent("label").text());
      } else if (checked.length === this.$inputs.length) {
        this.$label.html("All Selected");
        this.areAllChecked = true;
        this.$checkAll.html("Uncheck All");
      } else {
        this.$label.html(checked.length + " Selected");
      }
    }
    onCheckAll(checkAll) {
      if (!this.areAllChecked || checkAll) {
        this.areAllChecked = true;
        this.$checkAll.html("Uncheck All");
        this.$inputs.prop("checked", true);
      } else {
        this.areAllChecked = false;
        this.$checkAll.html("Check All");
        this.$inputs.prop("checked", false);
      }

      this.updateStatus();
    }
    toggleOpen(forceOpen) {
      var _this = this;

      if (!this.isOpen || forceOpen) {
        this.isOpen = true;
        this.$el.addClass("on");
        $(document).on("click", function (e) {
          if (!$(e.target).closest("[data-control]").length) {
            _this.toggleOpen();
          }
        });
      } else {
        this.isOpen = false;
        this.$el.removeClass("on");
        $(document).off("click");
      }
    }
  }

  var checkboxesDropdowns = document.querySelectorAll(
    '[data-control="checkbox-dropdown"]'
  );
  for (var i = 0, length = checkboxesDropdowns.length; i < length; i++) {
    new CheckboxDropdown(checkboxesDropdowns[i]);
  }
})(jQuery);

// export default $;
