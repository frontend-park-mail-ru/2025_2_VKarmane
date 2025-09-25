(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['Login.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                  "
    + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : "")
    + "\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"container\">\n  <div class=\"login-section\">\n    <form id=\"login\">\n\n      <div class=\"login-form\">\n        <h1 class=\"login-title\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":6,"column":32},"end":{"line":6,"column":41}}}) : helper)))
    + "</h1>\n\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"loginInput") || (depth0 != null ? lookupProperty(depth0,"loginInput") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"loginInput","hash":{},"data":data,"loc":{"start":{"line":8,"column":8},"end":{"line":8,"column":24}}}) : helper))) != null ? stack1 : "")
    + "\n\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"passwordInput") || (depth0 != null ? lookupProperty(depth0,"passwordInput") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"passwordInput","hash":{},"data":data,"loc":{"start":{"line":10,"column":8},"end":{"line":10,"column":27}}}) : helper))) != null ? stack1 : "")
    + "\n\n        <div class=\"forgot-password\">\n          <a href=\"#\">Забыли пароль?</a>\n        </div>\n        <div>\n          "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"loginButton") || (depth0 != null ? lookupProperty(depth0,"loginButton") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"loginButton","hash":{},"data":data,"loc":{"start":{"line":16,"column":10},"end":{"line":16,"column":27}}}) : helper))) != null ? stack1 : "")
    + "\n        </div>\n\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"absenceText") || (depth0 != null ? lookupProperty(depth0,"absenceText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"absenceText","hash":{},"data":data,"loc":{"start":{"line":19,"column":8},"end":{"line":19,"column":25}}}) : helper))) != null ? stack1 : "")
    + "\n      </div>\n    </form>\n\n  </div>\n\n  <div class=\"preview-section\">\n    <div class=\"planero-logo\">PLANERO</div>\n    <div>\n      <div class=\"phone-mockup-container-outer\">\n        <div class=\"phone-mockup-container-inner\">\n          <div class=\"phone-mockup\">\n            <div class=\"statistics-section\">\n              <div class=\"mockup-header\">\n                <div class=\"mockup-title\">Расходы за июль</div>\n\n              </div>\n              <div class=\"expense-chart\">\n                <div class=\"chart-circle\">\n                  <div class=\"chart-center\">₽102 907</div>\n                </div>\n              </div>\n              <div class=\"category-tags\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"categories") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":42,"column":16},"end":{"line":44,"column":25}}})) != null ? stack1 : "")
    + "              </div>\n\n            </div>\n            <div\n              style=\"display: flex; flex-direction: column;\"\n              class=\"card-section\"\n            >\n              <div style=\"display: flex; justify-content: flex-end;\">\n                <a href=\"#\" class=\"show-more\">показать больше</a>\n              </div>\n\n              <div class=\"expense-cards\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"expenseCards") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":57,"column":16},"end":{"line":59,"column":25}}})) != null ? stack1 : "")
    + "              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"vectors-bottom\">\n        <div class=\"vector-row\">\n          <img src=\"../../static/imgs/Vector.png\" alt=\"\" />\n          <div class=\"bottom-text\">Планируй вместе с нами!</div>\n          <img src=\"../../static/imgs/Vector.png\" alt=\"\" />\n        </div>\n        <div class=\"vector-row\">\n          <img src=\"../../static/imgs/Vector.png\" alt=\"\" />\n          <img src=\"../../static/imgs/Vector.png\" alt=\"\" />\n        </div>\n\n      </div>\n    </div>\n\n  </div>\n</div>";
},"useData":true});
templates['StartButton.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button class=\"start-button\" type=\"submit\" form=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"form") || (depth0 != null ? lookupProperty(depth0,"form") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"form","hash":{},"data":data,"loc":{"start":{"line":1,"column":49},"end":{"line":1,"column":57}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":1,"column":59},"end":{"line":1,"column":67}}}) : helper)))
    + "</button>";
},"useData":true});
templates['InputField.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"input-group\">\n  <input\n    type=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":3,"column":10},"end":{"line":3,"column":18}}}) : helper)))
    + "\"\n    name=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":4,"column":10},"end":{"line":4,"column":18}}}) : helper)))
    + "\"\n    class=\"input-field\"\n    placeholder=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":6,"column":17},"end":{"line":6,"column":25}}}) : helper)))
    + "\"\n  />\n</div>";
},"useData":true});
templates['AbsenceText.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"absence-text\">\n  "
    + alias4(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":2,"column":2},"end":{"line":2,"column":10}}}) : helper)))
    + "<a href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"link") || (depth0 != null ? lookupProperty(depth0,"link") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data,"loc":{"start":{"line":2,"column":19},"end":{"line":2,"column":27}}}) : helper)))
    + "\"> "
    + alias4(((helper = (helper = lookupProperty(helpers,"linkText") || (depth0 != null ? lookupProperty(depth0,"linkText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"linkText","hash":{},"data":data,"loc":{"start":{"line":2,"column":30},"end":{"line":2,"column":42}}}) : helper)))
    + "</a>\n</div>";
},"useData":true});
templates['Category.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<span\n  class=\"category-tag\"\n  style=\"background: "
    + alias4(((helper = (helper = lookupProperty(helpers,"color") || (depth0 != null ? lookupProperty(depth0,"color") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data,"loc":{"start":{"line":3,"column":21},"end":{"line":3,"column":30}}}) : helper)))
    + ";\"\n>"
    + alias4(((helper = (helper = lookupProperty(helpers,"category_name") || (depth0 != null ? lookupProperty(depth0,"category_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"category_name","hash":{},"data":data,"loc":{"start":{"line":4,"column":1},"end":{"line":4,"column":18}}}) : helper)))
    + "</span>";
},"useData":true});
templates['ExpenseCard.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"expense-card\">\n  <div class=\"expense-amount\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"currency") || (depth0 != null ? lookupProperty(depth0,"currency") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currency","hash":{},"data":data,"loc":{"start":{"line":2,"column":30},"end":{"line":2,"column":42}}}) : helper)))
    + alias4(((helper = (helper = lookupProperty(helpers,"formated") || (depth0 != null ? lookupProperty(depth0,"formated") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"formated","hash":{},"data":data,"loc":{"start":{"line":2,"column":42},"end":{"line":2,"column":54}}}) : helper)))
    + "</div>\n  <div class=\"expense-label\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":3,"column":29},"end":{"line":3,"column":37}}}) : helper)))
    + "</div>\n  "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"status") || (depth0 != null ? lookupProperty(depth0,"status") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data,"loc":{"start":{"line":5,"column":2},"end":{"line":5,"column":14}}}) : helper))) != null ? stack1 : "")
    + "\n</div>";
},"useData":true});
templates['Status.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<span class=\"status\" style=\"background: "
    + alias4(((helper = (helper = lookupProperty(helpers,"color") || (depth0 != null ? lookupProperty(depth0,"color") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data,"loc":{"start":{"line":1,"column":40},"end":{"line":1,"column":49}}}) : helper)))
    + ";\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"status") || (depth0 != null ? lookupProperty(depth0,"status") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data,"loc":{"start":{"line":1,"column":52},"end":{"line":1,"column":62}}}) : helper)))
    + "</span>";
},"useData":true});
templates['SignUp.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"container\">\r\n\r\n  <div class=\"preview-section\">\r\n            <div class=\"decorative-leaves\">\r\n                <div class=\"leaf\"></div>\r\n                <div class=\"leaf\"></div>\r\n                <div class=\"leaf\"></div>\r\n            </div>\r\n\r\n            <div class=\"dashboard-mockup\">\r\n                <div class=\"income-section\">\r\n                    <div class=\"income-item\">\r\n                        <div class=\"income-label\">Доход:</div>\r\n                        <div class=\"income-amount\">₽125,677</div>\r\n                    </div>\r\n                    <div class=\"income-item\">\r\n                        <div class=\"income-label\">Расход:</div>\r\n                        <div class=\"income-amount\">₽73,566</div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"chart-container\">\r\n                    <div class=\"chart-bars\">\r\n                        <div class=\"chart-bar\" style=\"height: 40%\"></div>\r\n                        <div class=\"chart-bar\" style=\"height: 60%\"></div>\r\n                        <div class=\"chart-bar\" style=\"height: 80%\"></div>\r\n                        <div class=\"chart-bar\" style=\"height: 90%\"></div>\r\n                        <div class=\"chart-bar active\" style=\"height: 100%\"></div>\r\n                        <div class=\"chart-bar\" style=\"height: 70%\"></div>\r\n                        <div class=\"chart-bar\" style=\"height: 85%\"></div>\r\n                        <div class=\"chart-bar\" style=\"height: 95%\"></div>\r\n                        <div class=\"chart-bar\" style=\"height: 75%\"></div>\r\n                        <div class=\"chart-bar\" style=\"height: 65%\"></div>\r\n                        <div class=\"chart-bar\" style=\"height: 45%\"></div>\r\n                        <div class=\"chart-bar\" style=\"height: 55%\"></div>\r\n                    </div>\r\n                    <div class=\"chart-labels\">\r\n                        <span>9 сентября</span>\r\n                        <span>10 сентября</span>\r\n                        <span>11 сентября</span>\r\n                        <span>12 сентября</span>\r\n                        <span>13 сентября</span>\r\n                    </div>\r\n                    <div style=\"position: absolute; top: 20px; right: 20px; background: #333; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;\">\r\n                        ₽10,573\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"services-list\">\r\n                    <div class=\"service-item\">\r\n                        <div class=\"service-icon beeline\">Б</div>\r\n                        <div class=\"service-info\">\r\n                            <div class=\"service-name\">Билайн доставка</div>\r\n                            <div class=\"service-date\">Списание 1.10.25</div>\r\n                        </div>\r\n                        <div class=\"service-amount\">-893₽</div>\r\n                    </div>\r\n                    <div class=\"service-item\">\r\n                        <div class=\"service-icon spotify\">♪</div>\r\n                        <div class=\"service-info\">\r\n                            <div class=\"service-name\">Spotify</div>\r\n                            <div class=\"service-date\">Списание 4.10.25</div>\r\n                        </div>\r\n                        <div class=\"service-amount\">-169₽</div>\r\n                    </div>\r\n                    <div class=\"service-item\">\r\n                        <div class=\"service-icon telegram\">✈</div>\r\n                        <div class=\"service-info\">\r\n                            <div class=\"service-name\">Телеграм нефть</div>\r\n                            <div class=\"service-date\">Списание 6.10.25</div>\r\n                        </div>\r\n                        <div class=\"service-amount\">-133₽</div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"content-section\">\r\n                <div class=\"bottom-text\">Планируй, Управляй и Приумножай</div>\r\n                <p class=\"description\">\r\n                    Наш сервис поможет тебе правильно распределить твои финансы, \r\n                    чтобы ты мог копить не на что-то, а на что-то ради чего-то: \r\n                    на мечту, свободу и уверенность в завтрашнем дне.\r\n                </p>\r\n                <div class=\"pagination\">\r\n                    <div class=\"pagination-dot\"></div>\r\n                    <div class=\"pagination-dot active\"></div>\r\n                    <div class=\"pagination-dot\"></div>\r\n                </div>\r\n                <div class=\"planero-logo\">PLANERO</div>\r\n            </div>\r\n\r\n            <div class=\"decorative-patterns\">\r\n                <div class=\"pattern\" style=\"bottom: 0;\"></div>\r\n                <div class=\"pattern\" style=\"bottom: 20px; transform: scaleX(-1);\"></div>\r\n                <div class=\"pattern\" style=\"bottom: 40px;\"></div>\r\n            </div>\r\n    </div>\r\n\r\n\r\n    <div class=\"signup-section\">\r\n    <form id=\"signup\">\r\n\r\n      <div class=\"signup-form\">\r\n        <h1 class=\"signup-title\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":104,"column":33},"end":{"line":104,"column":42}}}) : helper)))
    + "</h1>\r\n\r\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"loginInput") || (depth0 != null ? lookupProperty(depth0,"loginInput") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"loginInput","hash":{},"data":data,"loc":{"start":{"line":106,"column":8},"end":{"line":106,"column":24}}}) : helper))) != null ? stack1 : "")
    + "\r\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"emailInput") || (depth0 != null ? lookupProperty(depth0,"emailInput") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"emailInput","hash":{},"data":data,"loc":{"start":{"line":107,"column":8},"end":{"line":107,"column":24}}}) : helper))) != null ? stack1 : "")
    + "\r\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"passwordInput") || (depth0 != null ? lookupProperty(depth0,"passwordInput") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"passwordInput","hash":{},"data":data,"loc":{"start":{"line":108,"column":8},"end":{"line":108,"column":27}}}) : helper))) != null ? stack1 : "")
    + "\r\n\r\n        <div>\r\n          "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"loginButton") || (depth0 != null ? lookupProperty(depth0,"loginButton") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"loginButton","hash":{},"data":data,"loc":{"start":{"line":111,"column":10},"end":{"line":111,"column":27}}}) : helper))) != null ? stack1 : "")
    + "\r\n        </div>\r\n\r\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"absenceText") || (depth0 != null ? lookupProperty(depth0,"absenceText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"absenceText","hash":{},"data":data,"loc":{"start":{"line":114,"column":8},"end":{"line":114,"column":25}}}) : helper))) != null ? stack1 : "")
    + "\r\n      </div>\r\n    </form>\r\n\r\n  </div>\r\n</div>\r\n  </div>";
},"useData":true});
})();