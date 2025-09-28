(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['AbsenceText'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
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
templates['Add'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"Add\"></div>";
},"useData":true});
templates['addCard'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"addNewCard\">\r\n    <a class=\"addCard\" href=\"#\">+ Добавить счет</a>\r\n</div>\r\n\r\n";
},"useData":true});
templates['cards'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"Card-balance-text\" style=\"display: flex\">\r\n                <p class=\"Fact-plus-text\" >+"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"has_update_for_2_week") || (depth0 != null ? lookupProperty(depth0,"has_update_for_2_week") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"has_update_for_2_week","hash":{},"data":data,"loc":{"start":{"line":11,"column":44},"end":{"line":11,"column":72}}}) : helper)))
    + "₽&nbsp;<p>\r\n                <p class=\"Fact-text\"> за последние 2 недели</p>\r\n            </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"Card-balance-text\" style=\"display: flex\">\r\n                <p class=\"Fact-minus-text\" >"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"has_update_for_2_week") || (depth0 != null ? lookupProperty(depth0,"has_update_for_2_week") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"has_update_for_2_week","hash":{},"data":data,"loc":{"start":{"line":16,"column":44},"end":{"line":16,"column":71}}}) : helper)))
    + "₽&nbsp;<p>\r\n                <p class=\"Fact-text\"> за последние 2 недели</p>\r\n            </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"cards\">\r\n    <div class=\"card1\">\r\n        <h3 class=\"Card-One-text\">\r\n            Карта №1\r\n        </h3>\r\n        <div class=\"CheckSumCard\">\r\n            <h2>"
    + alias4(((helper = (helper = lookupProperty(helpers,"balance") || (depth0 != null ? lookupProperty(depth0,"balance") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"balance","hash":{},"data":data,"loc":{"start":{"line":7,"column":16},"end":{"line":7,"column":29}}}) : helper)))
    + " ₽</h2>\r\n        </div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasUpdateFactPlan") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":9,"column":8},"end":{"line":19,"column":15}}})) != null ? stack1 : "")
    + "        <div class=\"rashod-card\">\r\n            <p class=\"NaibolshRashod\">наибольший расход за период</p>\r\n            <div style=\"display: flex;\">\r\n                <div style=\"display: grid;\">\r\n                    <h1 class=\"rashod_sum\"> "
    + alias4(((helper = (helper = lookupProperty(helpers,"naibolsh_rashod") || (depth0 != null ? lookupProperty(depth0,"naibolsh_rashod") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"naibolsh_rashod","hash":{},"data":data,"loc":{"start":{"line":24,"column":44},"end":{"line":24,"column":63}}}) : helper)))
    + " ₽</h1>\r\n                    <div class=\"actions\"><p class=\"rashod-sum-action\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"action") || (depth0 != null ? lookupProperty(depth0,"action") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"action","hash":{},"data":data,"loc":{"start":{"line":25,"column":70},"end":{"line":25,"column":82}}}) : helper)))
    + "</p></div>\r\n                </div>\r\n                <div class=\"rashod-img\"><img class=\"drawing\" src=\"../../static/imgs/draw_for_cards.png\" alt=\"img\"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
templates['Category'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
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
templates['ExpenseCard'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
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
templates['FactBalance'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"ProcentUp\">\r\n                    <p  class=\"ProcTextUp\">	↑"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"GetBalance") || (depth0 != null ? lookupProperty(depth0,"GetBalance") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"GetBalance","hash":{},"data":data,"loc":{"start":{"line":9,"column":45},"end":{"line":9,"column":59}}}) : helper)))
    + "%</p>\r\n                </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"ProcentDown\" style=\"align-items: center;\">\r\n                    <p class=\"ProcTextDown\">↓"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"GetBalance") || (depth0 != null ? lookupProperty(depth0,"GetBalance") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"GetBalance","hash":{},"data":data,"loc":{"start":{"line":13,"column":45},"end":{"line":13,"column":61}}}) : helper)))
    + "%</p>\r\n                </div>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"Fact-balance-text\" style=\"display: flex\">\r\n                <p class=\"Fact-plus-text\" >+"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"updateFactFortwoWeek") || (depth0 != null ? lookupProperty(depth0,"updateFactFortwoWeek") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"updateFactFortwoWeek","hash":{},"data":data,"loc":{"start":{"line":19,"column":44},"end":{"line":19,"column":70}}}) : helper)))
    + "₽&nbsp;<p>\r\n                <p class=\"Fact-text\"> за последние 2 недели</p>\r\n            </div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"Fact-balance-text\" style=\"display: flex\">\r\n                <p class=\"Fact-minus-text\" >"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"updateFactFortwoWeek") || (depth0 != null ? lookupProperty(depth0,"updateFactFortwoWeek") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"updateFactFortwoWeek","hash":{},"data":data,"loc":{"start":{"line":24,"column":44},"end":{"line":24,"column":70}}}) : helper)))
    + "₽&nbsp;<p>\r\n                <p class=\"Fact-text\"> за последние 2 недели</p>\r\n            </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"Fact-Balance\">\r\n    <h3 class=\"Fact-Plan-text\">\r\n        Фактический\r\n    </h3>\r\n        <div class=\"CheckSum\">\r\n            <h2 class=\"FactSum\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"FactSum") || (depth0 != null ? lookupProperty(depth0,"FactSum") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"FactSum","hash":{},"data":data,"loc":{"start":{"line":6,"column":32},"end":{"line":6,"column":45}}}) : helper)))
    + " ₽</h2>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasUpdateFactPlan") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":7,"column":12},"end":{"line":15,"column":19}}})) != null ? stack1 : "")
    + "        </div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasUpdateFactPlan") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":17,"column":8},"end":{"line":27,"column":15}}})) != null ? stack1 : "")
    + "</div>";
},"useData":true});
templates['head'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"utf-8\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\r\n    <meta charset=\"utf-8\">\r\n    <title>PLANERO</title>\r\n</head>";
},"useData":true});
templates['InputField'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
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
templates['menu'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"menu\">\r\n    <div class=\"logo\"></div>\r\n    <div class=\"pages\">\r\n        <div class=\"mainPage\">\r\n            <button type=\"button\" class=\"butMain\"></button>\r\n            <button type=\"button\" class=\"logout\"></button>\r\n        </div>\r\n\r\n    </div>\r\n</div>";
},"useData":true});
templates['operations'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"operations-list\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"operationsItems") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":18,"column":21}}})) != null ? stack1 : "")
    + "        </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"operations-item\">\r\n                    <div class=\"operation\" style=\"display: flex;\">\r\n                        <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"image_oper") || (depth0 != null ? lookupProperty(depth0,"image_oper") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_oper","hash":{},"data":data,"loc":{"start":{"line":7,"column":34},"end":{"line":7,"column":48}}}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"title_oper") || (depth0 != null ? lookupProperty(depth0,"title_oper") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title_oper","hash":{},"data":data,"loc":{"start":{"line":7,"column":55},"end":{"line":7,"column":69}}}) : helper)))
    + "\">\r\n                        <div class=\"title_with_category\">\r\n                            <div class=\"title_oper\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"title_oper") || (depth0 != null ? lookupProperty(depth0,"title_oper") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title_oper","hash":{},"data":data,"loc":{"start":{"line":9,"column":52},"end":{"line":9,"column":66}}}) : helper)))
    + "</div>\r\n                            <div class=\"category_oper\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"category_oper") || (depth0 != null ? lookupProperty(depth0,"category_oper") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"category_oper","hash":{},"data":data,"loc":{"start":{"line":10,"column":55},"end":{"line":10,"column":72}}}) : helper)))
    + "</div>\r\n                        </div>\r\n                        <div class=\"price_and_time\">\r\n                            <div class=\"price_oper\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"price_oper") || (depth0 != null ? lookupProperty(depth0,"price_oper") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"price_oper","hash":{},"data":data,"loc":{"start":{"line":13,"column":52},"end":{"line":13,"column":66}}}) : helper)))
    + "₽</div>\r\n                            <div class=\"time_oper\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"time_oper") || (depth0 != null ? lookupProperty(depth0,"time_oper") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time_oper","hash":{},"data":data,"loc":{"start":{"line":14,"column":51},"end":{"line":14,"column":64}}}) : helper)))
    + "</div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"oper_not_exists\">\r\n            <div class=\"oper_not_exists_img\"></div>\r\n            <h2 style=\"color: #949494; font-size: 20px\">\r\n                Тут пока ничего нет :(\r\n            </h2>\r\n            <a class=\"add_operation\" href=\"#\">+ Добавить операцию</a>\r\n        </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"operations\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"operations_exists") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":28,"column":11}}})) != null ? stack1 : "")
    + "</div>\r\n";
},"useData":true});
templates['PlanBalance'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"Plan-Balance\">\r\n    <h3 class=\"Fact-Plan-text\">\r\n        Планируемый\r\n    </h3>\r\n    <div class=\"CheckSum\">\r\n        <h2 class=\"PlanSum\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"PlanSum") || (depth0 != null ? lookupProperty(depth0,"PlanSum") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"PlanSum","hash":{},"data":data,"loc":{"start":{"line":6,"column":28},"end":{"line":6,"column":41}}}) : helper)))
    + " ₽</h2>\r\n    </div>\r\n        <div class=\"Plan-Balance-text\" style=\"display: flex\">\r\n            <a style=\"display: flex; text-decoration: none; color: black\" href=\"#\">\r\n                <p class=\"Fact-text\"> посмотреть &nbsp</p>\r\n                <p class=\"Plan-text\" >расходы &nbsp<p>\r\n                <p class=\"Fact-text\"> за 2 недели→ &nbsp</p>\r\n            </a>\r\n        </div>\r\n</div>";
},"useData":true});
templates['serviceItem'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"service-item\">\n  <div class=\"service-icon "
    + alias4(((helper = (helper = lookupProperty(helpers,"db_name") || (depth0 != null ? lookupProperty(depth0,"db_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"db_name","hash":{},"data":data,"loc":{"start":{"line":2,"column":27},"end":{"line":2,"column":38}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"logo") || (depth0 != null ? lookupProperty(depth0,"logo") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"logo","hash":{},"data":data,"loc":{"start":{"line":2,"column":40},"end":{"line":2,"column":48}}}) : helper)))
    + "</div>\n  <div class=\"service-info\">\n    <div class=\"service-name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":4,"column":30},"end":{"line":4,"column":38}}}) : helper)))
    + "</div>\n    <div class=\"service-date\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"date_text") || (depth0 != null ? lookupProperty(depth0,"date_text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date_text","hash":{},"data":data,"loc":{"start":{"line":5,"column":30},"end":{"line":5,"column":43}}}) : helper)))
    + "</div>\n  </div>\n  <div class=\"service-amount\">-"
    + alias4(((helper = (helper = lookupProperty(helpers,"sum") || (depth0 != null ? lookupProperty(depth0,"sum") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sum","hash":{},"data":data,"loc":{"start":{"line":7,"column":31},"end":{"line":7,"column":38}}}) : helper)))
    + alias4(((helper = (helper = lookupProperty(helpers,"curr") || (depth0 != null ? lookupProperty(depth0,"curr") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"curr","hash":{},"data":data,"loc":{"start":{"line":7,"column":38},"end":{"line":7,"column":46}}}) : helper)))
    + "</div>\n</div>";
},"useData":true});
templates['StartButton'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
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
templates['Status'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
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
templates['Login'] = template({"1":function(container,depth0,helpers,partials,data) {
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
templates['main'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"container\">\r\n    <div class=\"LeftPart\">\r\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"menu") || (depth0 != null ? lookupProperty(depth0,"menu") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"menu","hash":{},"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":3,"column":20}}}) : helper))) != null ? stack1 : "")
    + "\r\n    </div>\r\n    \r\n    <div id=\"main\">\r\n        <h1 class=\"general\">Общее</h1>\r\n        <div class=\"section\">\r\n        \r\n        <div class=\"left-section\">\r\n        \r\n        <div style=\"max-width: 54%;\">\r\n            <div class=\"balance\">\r\n                <h2 class=\"balance-text\">\r\n                    Баланс\r\n                </h2>\r\n                "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"FactBal") || (depth0 != null ? lookupProperty(depth0,"FactBal") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"FactBal","hash":{},"data":data,"loc":{"start":{"line":17,"column":16},"end":{"line":17,"column":31}}}) : helper))) != null ? stack1 : "")
    + "\r\n                "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"PlanBal") || (depth0 != null ? lookupProperty(depth0,"PlanBal") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"PlanBal","hash":{},"data":data,"loc":{"start":{"line":18,"column":16},"end":{"line":18,"column":31}}}) : helper))) != null ? stack1 : "")
    + "\r\n                "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"Add") || (depth0 != null ? lookupProperty(depth0,"Add") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Add","hash":{},"data":data,"loc":{"start":{"line":19,"column":16},"end":{"line":19,"column":27}}}) : helper))) != null ? stack1 : "")
    + "\r\n            </div>\r\n            </div>\r\n        </div>\r\n            <div class=\"right-section\">\r\n            <div class=\"banks\">\r\n                <h2 class=\"balance-text\">\r\n                    Счета\r\n                </h2>\r\n                <div class=\"card_handler\" style=\"display: flex;\">\r\n                    "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"cards") || (depth0 != null ? lookupProperty(depth0,"cards") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cards","hash":{},"data":data,"loc":{"start":{"line":29,"column":20},"end":{"line":29,"column":33}}}) : helper))) != null ? stack1 : "")
    + "\r\n                        <div class=\"card_but_hand\">\r\n                            "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"addCard") || (depth0 != null ? lookupProperty(depth0,"addCard") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"addCard","hash":{},"data":data,"loc":{"start":{"line":31,"column":28},"end":{"line":31,"column":43}}}) : helper))) != null ? stack1 : "")
    + "\r\n                        </div>\r\n                </div>\r\n                "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"operations") || (depth0 != null ? lookupProperty(depth0,"operations") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"operations","hash":{},"data":data,"loc":{"start":{"line":34,"column":16},"end":{"line":34,"column":34}}}) : helper))) != null ? stack1 : "")
    + "\r\n            </div>\r\n            </div>\r\n        </div>\r\n        </div>\r\n    </div>";
},"useData":true});
templates['SignUp'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "          "
    + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : "")
    + "\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"container\">\r\n\r\n  <div class=\"preview-section\">\r\n    <div class=\"decorative-leaves\">\r\n      <div class=\"leaf\"></div>\r\n      <div class=\"leaf\"></div>\r\n      <div class=\"leaf\"></div>\r\n    </div>\r\n\r\n    <div class=\"dashboard-mockup\">\r\n      <div class=\"income-section\">\r\n        <div class=\"income-item\">\r\n          <div class=\"income-label\">Доход:</div>\r\n          <div class=\"income-amount\">₽125,677</div>\r\n        </div>\r\n        <div class=\"income-item\">\r\n          <div class=\"income-label\">Расход:</div>\r\n          <div class=\"income-amount\">₽73,566</div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"chart-container\">\r\n        <div class=\"chart-bars\">\r\n          <div class=\"chart-bar\" style=\"height: 40%\"></div>\r\n          <div class=\"chart-bar\" style=\"height: 60%\"></div>\r\n          <div class=\"chart-bar\" style=\"height: 80%\"></div>\r\n          <div class=\"chart-bar\" style=\"height: 90%\"></div>\r\n          <div class=\"chart-bar active\" style=\"height: 100%\"></div>\r\n\r\n          <div class=\"chart-bar\" style=\"height: 70%\"></div>\r\n          <div class=\"chart-bar\" style=\"height: 85%\"></div>\r\n          <div class=\"chart-bar\" style=\"height: 95%\"></div>\r\n          <div class=\"chart-bar\" style=\"height: 75%\"></div>\r\n          <div class=\"chart-bar\" style=\"height: 65%\"></div>\r\n          <div class=\"chart-bar\" style=\"height: 45%\"></div>\r\n          <div class=\"chart-bar\" style=\"height: 55%\"></div>\r\n        </div>\r\n        <div class=\"chart-labels\">\r\n          <span>9 сентября</span>\r\n          <span>10 сентября</span>\r\n          <span>11 сентября</span>\r\n          <span>12 сентября</span>\r\n          <span>13 сентября</span>\r\n        </div>\r\n        <div\r\n          style=\"position: absolute; top: 20px; right: 20px; background: #333; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;\"\r\n        >\r\n          ₽10,573\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"services-list\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"items") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":53,"column":8},"end":{"line":55,"column":17}}})) != null ? stack1 : "")
    + "      </div>\r\n    </div>\r\n\r\n    <div class=\"content-section\">\r\n      <div class=\"bottom-text\">Планируй, Управляй и Приумножай</div>\r\n      <p class=\"description\">\r\n        Наш сервис поможет тебе правильно распределить твои финансы, чтобы ты\r\n        мог копить не на что-то, а на что-то ради чего-то: на мечту, свободу и\r\n        уверенность в завтрашнем дне.\r\n      </p>\r\n      <div class=\"pagination\">\r\n        <div class=\"pagination-dot\"></div>\r\n        <div class=\"pagination-dot active\"></div>\r\n        <div class=\"pagination-dot\"></div>\r\n      </div>\r\n      <div class=\"planero-logo\">PLANERO</div>\r\n    </div>\r\n\r\n    <div class=\"decorative-patterns\">\r\n      <div class=\"pattern\" style=\"bottom: 0;\"></div>\r\n      <div class=\"pattern\" style=\"bottom: 20px; transform: scaleX(-1);\"></div>\r\n      <div class=\"pattern\" style=\"bottom: 40px;\"></div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"signup-section\">\r\n    <form id=\"signup\">\r\n\r\n      <div class=\"signup-form\">\r\n        <h1 class=\"signup-title\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":85,"column":33},"end":{"line":85,"column":42}}}) : helper)))
    + "</h1>\r\n\r\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"loginInput") || (depth0 != null ? lookupProperty(depth0,"loginInput") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"loginInput","hash":{},"data":data,"loc":{"start":{"line":87,"column":8},"end":{"line":87,"column":24}}}) : helper))) != null ? stack1 : "")
    + "\r\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"emailInput") || (depth0 != null ? lookupProperty(depth0,"emailInput") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"emailInput","hash":{},"data":data,"loc":{"start":{"line":88,"column":8},"end":{"line":88,"column":24}}}) : helper))) != null ? stack1 : "")
    + "\r\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"passwordInput") || (depth0 != null ? lookupProperty(depth0,"passwordInput") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"passwordInput","hash":{},"data":data,"loc":{"start":{"line":89,"column":8},"end":{"line":89,"column":27}}}) : helper))) != null ? stack1 : "")
    + "\r\n\r\n        <div>\r\n          "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"signUpButton") || (depth0 != null ? lookupProperty(depth0,"signUpButton") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"signUpButton","hash":{},"data":data,"loc":{"start":{"line":92,"column":10},"end":{"line":92,"column":28}}}) : helper))) != null ? stack1 : "")
    + "\r\n        </div>\r\n\r\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"absenceText") || (depth0 != null ? lookupProperty(depth0,"absenceText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"absenceText","hash":{},"data":data,"loc":{"start":{"line":95,"column":8},"end":{"line":95,"column":25}}}) : helper))) != null ? stack1 : "")
    + "\r\n      </div>\r\n    </form>\r\n\r\n  </div>\r\n</div>";
},"useData":true});
})();