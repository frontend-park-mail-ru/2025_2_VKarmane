(function () {
  var template = Handlebars.template,
    templates = (Handlebars.templates = Handlebars.templates || {});
  templates["Login.hbs"] = template({
    compiler: [8, ">= 4.3.0"],
    main: function (container, depth0, helpers, partials, data) {
      var helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = "function",
        alias4 = container.escapeExpression,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '\r\n<div class="container">\r\n        <div class="login-section">\r\n  <div class="login-form">\r\n    <h1 class="login-title">' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "title") ||
              (depth0 != null ? lookupProperty(depth0, "title") : depth0)) !=
            null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "title",
                hash: {},
                data: data,
                loc: {
                  start: { line: 5, column: 28 },
                  end: { line: 5, column: 37 },
                },
              })
            : helper),
        ) +
        '</h1>\r\n\r\n    <div class="input-group">\r\n        <input type="text" class="input-field" placeholder="' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "loginPlaceholder") ||
              (depth0 != null
                ? lookupProperty(depth0, "loginPlaceholder")
                : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "loginPlaceholder",
                hash: {},
                data: data,
                loc: {
                  start: { line: 8, column: 60 },
                  end: { line: 8, column: 80 },
                },
              })
            : helper),
        ) +
        '">\r\n    </div>\r\n\r\n    <div class="input-group">\r\n        <input type="password" class="input-field" placeholder="' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "passwordPlaceholder") ||
              (depth0 != null
                ? lookupProperty(depth0, "passwordPlaceholder")
                : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "passwordPlaceholder",
                hash: {},
                data: data,
                loc: {
                  start: { line: 12, column: 64 },
                  end: { line: 12, column: 87 },
                },
              })
            : helper),
        ) +
        '">\r\n    </div>\r\n\r\n    <div class="forgot-password">\r\n        <a href="#">' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "forgotPasswordText") ||
              (depth0 != null
                ? lookupProperty(depth0, "forgotPasswordText")
                : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "forgotPasswordText",
                hash: {},
                data: data,
                loc: {
                  start: { line: 16, column: 20 },
                  end: { line: 16, column: 42 },
                },
              })
            : helper),
        ) +
        '</a>\r\n    </div>\r\n\r\n\r\n    <div class="register-link">\r\n        ' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "registerText") ||
              (depth0 != null
                ? lookupProperty(depth0, "registerText")
                : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "registerText",
                hash: {},
                data: data,
                loc: {
                  start: { line: 22, column: 8 },
                  end: { line: 22, column: 24 },
                },
              })
            : helper),
        ) +
        ' <a href="#">' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "registerLinkText") ||
              (depth0 != null
                ? lookupProperty(depth0, "registerLinkText")
                : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "registerLinkText",
                hash: {},
                data: data,
                loc: {
                  start: { line: 22, column: 37 },
                  end: { line: 22, column: 57 },
                },
              })
            : helper),
        ) +
        '</a>\r\n    </div>\r\n</div>\r\n\r\n        </div>\r\n    \r\n        <div class="preview-section">\r\n            <div class="planero-logo">PLANERO</div>\r\n            \r\n            <div class="decorative-dots"></div>\r\n            \r\n            <div class="phone-mockup" style="display: flex;">\r\n                <div>\r\n                    <div class="mockup-header">\r\n                        <div class="mockup-title">Расходы за июль</div>\r\n                        <a href="#" class="show-more">показать больше</a>\r\n                    </div>\r\n                    <div class="expense-chart">\r\n                            <div class="chart-circle">\r\n                            <div class="chart-center">P102 907</div>\r\n                        </div>\r\n                    </div>\r\n                    <div class="category-tags">\r\n                        <span class="category-tag tag-green">Банковские</span>\r\n                        <span class="category-tag tag-pink">Развлечения</span>\r\n                        <span class="category-tag tag-yellow">Покупки</span>\r\n                        <span class="category-tag tag-blue">Подписки</span>\r\n                    </div>\r\n                    \r\n\r\n                </div>\r\n                <div style="display: flex; flex-direction: column;">\r\n                    <div class="expense-cards">\r\n                    <div class="expense-card">\r\n                        <div class="expense-amount">P50 102</div>\r\n                        <div class="expense-label">Планируемый расход за период</div>\r\n                        <span class="expense-status status-green">Сбалансировано</span>\r\n                    </div>\r\n                    \r\n                    <div class="expense-card">\r\n                        <div class="expense-amount">P152 104</div>\r\n                        <div class="expense-label">Расходы за прошлый период</div>\r\n                    </div>\r\n                </div>\r\n                </div>\r\n            </div>\r\n            \r\n            <div class="bottom-text">Планируй вместе с нами!</div>\r\n        </div>\r\n    </div>\r\n'
      );
    },
    useData: true,
  });
})();
