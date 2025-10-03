(function () {
  var template = Handlebars.template,
    templates = (Handlebars.templates = Handlebars.templates || {});
  templates["StartButton.hbs"] = template({
    compiler: [8, ">= 4.3.0"],
    main: function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '<button class="start-button">' +
        container.escapeExpression(
          ((helper =
            (helper =
              lookupProperty(helpers, "text") ||
              (depth0 != null ? lookupProperty(depth0, "text") : depth0)) !=
            null
              ? helper
              : container.hooks.helperMissing),
          typeof helper === "function"
            ? helper.call(
                depth0 != null ? depth0 : container.nullContext || {},
                {
                  name: "text",
                  hash: {},
                  data: data,
                  loc: {
                    start: { line: 1, column: 29 },
                    end: { line: 1, column: 37 },
                  },
                },
              )
            : helper),
        ) +
        "</button>"
      );
    },
    useData: true,
  });
})();
