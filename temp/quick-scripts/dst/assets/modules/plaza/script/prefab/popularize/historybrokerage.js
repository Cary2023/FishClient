
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/popularize/historybrokerage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c07e0tLfa1D14yc7WXtX3Jd', 'historybrokerage');
// modules/plaza/script/prefab/popularize/historybrokerage.js

"use strict";

glGame.baseclass.extend({
  properties: {
    histroyCommission: cc.Prefab,
    norecord: cc.Node,
    //noneLab
    infoItem: cc.Node,
    content: cc.Node,
    Lab_CurPage: cc.Label,
    Lab_totalPage: cc.Label,
    history_direct_achievement: cc.Label,
    history_achievement: cc.Label,
    history_commission: cc.Label,
    kuang: cc.Node
  },
  onLoad: function onLoad() {
    this.page = 1;
    this.Lab_CurPage.string = this.page;
    this.date = "";
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "close":
        this.remove();
        break;

      case "btn_pageup":
        this.pageup_CB();
        break;

      case "btn_pagedown":
        this.pagedown_CB();
        break;

      case "btn_detail":
        this.btn_detailCB(node);
        break;
    }
  },
  ReqPlayerExtensionCountlessRecord: function ReqPlayerExtensionCountlessRecord() {
    var _this = this;

    var page = this.page,
        date = this.date;
    this.Lab_CurPage.string = this.page;
    glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessRecord', {
      page: page,
      date: date,
      page_size: 8
    }, function (route, msg) {
      _this.recordData = msg;
      _this.Lab_CurPage.string = page;
      _this.Lab_totalPage.string = _this.recordData.page_total == 0 ? 1 : _this.recordData.page_total;

      _this.setTable(_this.recordData.list);
    });
  },
  initUI: function initUI(data) {
    this.recordData = data;
    this.history_direct_achievement.string = this.getFloat(this.recordData.history_direct_achievement);
    this.history_achievement.string = this.getFloat(this.recordData.history_achievement);
    this.history_commission.string = this.getFloat(this.recordData.history_commission);
    this.totalPage = this.recordData.page_total;
    this.Lab_totalPage.string = this.recordData.page_total == 0 ? 1 : this.recordData.page_total;
    this.setTable(this.recordData.list);
  },
  setTable: function setTable(data) {
    this.content.destroyAllChildren();
    this.content.removeAllChildren();
    var count = data.length;

    if (count == 0) {
      this.norecord.active = true;
      return;
    }

    this.hiadShowNode(count > 0);

    for (var i = 0; i < count; i++) {
      var infoItem = cc.instantiate(this.infoItem);
      infoItem.parent = this.content;
      infoItem.active = false;
      infoItem.getChildByName("bg").active = i % 2 == 1;
      infoItem.getChildByName("time").getComponent(cc.Label).string = data[i].date;
      infoItem.getChildByName("Directachieve").getComponent(cc.Label).string = this.getFloat(data[i].direct_achievement); //直推业绩

      var DirectCommission = infoItem.getChildByName("DirectCommission");
      DirectCommission.getComponent(cc.Label).string = this.getFloat(data[i].direct_commission); //直推佣金

      glGame.panel.settingTableLabelColor(DirectCommission);
      infoItem.getChildByName("teamachieve").getComponent(cc.Label).string = this.getFloat(data[i].achievement); //团队业绩

      var teamDiffachieve = infoItem.getChildByName("teamDiffachieve");
      teamDiffachieve.getComponent(cc.Label).string = this.getFloat(data[i].sub_commission); //级差佣金

      glGame.panel.settingTableLabelColor(teamDiffachieve);
      var totalCommission = infoItem.getChildByName("totalCommission");
      totalCommission.getComponent(cc.Label).string = this.getFloat(data[i].direct_commission + data[i].sub_commission);
      glGame.panel.settingTableLabelColor(totalCommission);
      infoItem.name = "".concat(data[i].date);
    }

    glGame.panel.showEffectNode(this, this.content, 0.02, true);
  },
  hiadShowNode: function hiadShowNode(isBool) {
    this.node.getChildByName("btn_pageup").active = isBool;
    this.node.getChildByName("pagelayout").active = isBool;
    this.node.getChildByName("btn_pagedown").active = isBool;
    this.node.getChildByName("explain").active = isBool;
  },
  getFloat: function getFloat(value) {
    return Number(value).div(100).toString();
  },
  btn_detailCB: function btn_detailCB(node) {
    var _this2 = this;

    glGame.gameNet.send_msg('http.ReqPlayerExtensionCountlessRecordDetail', {
      page: 1,
      date: node.parent.name,
      page_size: 8
    }, function (route, msg) {
      _this2.histroyCommissiondata = msg;
      var histroyCommission = glGame.panel.showChildPanel(_this2.histroyCommission, _this2.node.parent.parent);
      var script = histroyCommission.getComponent("histroyCommission");
      script.initUI(_this2.histroyCommissiondata, node.parent.name);
    });
  },
  pageup_CB: function pageup_CB() {
    this.page--;

    if (this.page < 1) {
      this.page = 1;
      return;
    }

    this.ReqPlayerExtensionCountlessRecord();
  },
  pagedown_CB: function pagedown_CB() {
    this.page++;

    if (this.page > Number(this.Lab_totalPage.string)) {
      this.page = Number(this.Lab_totalPage.string);
      return;
    }

    this.ReqPlayerExtensionCountlessRecord();
  },
  OnDestroy: function OnDestroy() {}
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFxwb3B1bGFyaXplXFxoaXN0b3J5YnJva2VyYWdlLmpzIl0sIm5hbWVzIjpbImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJoaXN0cm95Q29tbWlzc2lvbiIsImNjIiwiUHJlZmFiIiwibm9yZWNvcmQiLCJOb2RlIiwiaW5mb0l0ZW0iLCJjb250ZW50IiwiTGFiX0N1clBhZ2UiLCJMYWJlbCIsIkxhYl90b3RhbFBhZ2UiLCJoaXN0b3J5X2RpcmVjdF9hY2hpZXZlbWVudCIsImhpc3RvcnlfYWNoaWV2ZW1lbnQiLCJoaXN0b3J5X2NvbW1pc3Npb24iLCJrdWFuZyIsIm9uTG9hZCIsInBhZ2UiLCJzdHJpbmciLCJkYXRlIiwib25DbGljayIsIm5hbWUiLCJub2RlIiwicmVtb3ZlIiwicGFnZXVwX0NCIiwicGFnZWRvd25fQ0IiLCJidG5fZGV0YWlsQ0IiLCJSZXFQbGF5ZXJFeHRlbnNpb25Db3VudGxlc3NSZWNvcmQiLCJnYW1lTmV0Iiwic2VuZF9tc2ciLCJwYWdlX3NpemUiLCJyb3V0ZSIsIm1zZyIsInJlY29yZERhdGEiLCJwYWdlX3RvdGFsIiwic2V0VGFibGUiLCJsaXN0IiwiaW5pdFVJIiwiZGF0YSIsImdldEZsb2F0IiwidG90YWxQYWdlIiwiZGVzdHJveUFsbENoaWxkcmVuIiwicmVtb3ZlQWxsQ2hpbGRyZW4iLCJjb3VudCIsImxlbmd0aCIsImFjdGl2ZSIsImhpYWRTaG93Tm9kZSIsImkiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50IiwiZGlyZWN0X2FjaGlldmVtZW50IiwiRGlyZWN0Q29tbWlzc2lvbiIsImRpcmVjdF9jb21taXNzaW9uIiwicGFuZWwiLCJzZXR0aW5nVGFibGVMYWJlbENvbG9yIiwiYWNoaWV2ZW1lbnQiLCJ0ZWFtRGlmZmFjaGlldmUiLCJzdWJfY29tbWlzc2lvbiIsInRvdGFsQ29tbWlzc2lvbiIsInNob3dFZmZlY3ROb2RlIiwiaXNCb29sIiwidmFsdWUiLCJOdW1iZXIiLCJkaXYiLCJ0b1N0cmluZyIsImhpc3Ryb3lDb21taXNzaW9uZGF0YSIsInNob3dDaGlsZFBhbmVsIiwic2NyaXB0IiwiT25EZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCO0FBQ3BCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsaUJBQWlCLEVBQUVDLEVBQUUsQ0FBQ0MsTUFEZDtBQUVSQyxJQUFBQSxRQUFRLEVBQUVGLEVBQUUsQ0FBQ0csSUFGTDtBQUVVO0FBQ2xCQyxJQUFBQSxRQUFRLEVBQUVKLEVBQUUsQ0FBQ0csSUFITDtBQUlSRSxJQUFBQSxPQUFPLEVBQUVMLEVBQUUsQ0FBQ0csSUFKSjtBQUtSRyxJQUFBQSxXQUFXLEVBQUVOLEVBQUUsQ0FBQ08sS0FMUjtBQU1SQyxJQUFBQSxhQUFhLEVBQUVSLEVBQUUsQ0FBQ08sS0FOVjtBQVFSRSxJQUFBQSwwQkFBMEIsRUFBRVQsRUFBRSxDQUFDTyxLQVJ2QjtBQVNSRyxJQUFBQSxtQkFBbUIsRUFBRVYsRUFBRSxDQUFDTyxLQVRoQjtBQVVSSSxJQUFBQSxrQkFBa0IsRUFBRVgsRUFBRSxDQUFDTyxLQVZmO0FBWVJLLElBQUFBLEtBQUssRUFBRVosRUFBRSxDQUFDRztBQVpGLEdBRFE7QUFlcEJVLEVBQUFBLE1BZm9CLG9CQWVYO0FBQ0wsU0FBS0MsSUFBTCxHQUFZLENBQVo7QUFDQSxTQUFLUixXQUFMLENBQWlCUyxNQUFqQixHQUEwQixLQUFLRCxJQUEvQjtBQUNBLFNBQUtFLElBQUwsR0FBWSxFQUFaO0FBQ0gsR0FuQm1CO0FBcUJwQkMsRUFBQUEsT0FyQm9CLG1CQXFCWkMsSUFyQlksRUFxQk5DLElBckJNLEVBcUJBO0FBQ2hCLFlBQVFELElBQVI7QUFDSSxXQUFLLE9BQUw7QUFBYyxhQUFLRSxNQUFMO0FBQWU7O0FBQzdCLFdBQUssWUFB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LEtBQUtBLElBQUwsR0FBWSxDQUFoQixFQUFtQjtBQUNmLFdBQUtBLElBQUwsR0FBWSxDQUFaO0FBQ0E7QUFDSDs7QUFDRCxTQUFLVSxpQ0FBTDtBQUNILEdBN0dtQjtBQThHcEJGLEVBQUFBLFdBOUdvQix5QkE4R047QUFDVixTQUFLUixJQUFMOztBQUNBLFFBQUksS0FBS0EsSUFBTCxHQUFZK0MsTUFBTSxDQUFDLEtBQUtyRCxhQUFMLENBQW1CTyxNQUFwQixDQUF0QixFQUFtRDtBQUMvQyxXQUFLRCxJQUFMLEdBQVkrQyxNQUFNLENBQUMsS0FBS3JELGFBQUwsQ0FBbUJPLE1BQXBCLENBQWxCO0FBQ0E7QUFDSDs7QUFDRCxTQUFLUyxpQ0FBTDtBQUNILEdBckhtQjtBQXNIcEIyQyxFQUFBQSxTQXRIb0IsdUJBc0hSLENBQ1g7QUF2SG1CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJnbEdhbWUuYmFzZWNsYXNzLmV4dGVuZCh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgaGlzdHJveUNvbW1pc3Npb246IGNjLlByZWZhYixcclxuICAgICAgICBub3JlY29yZDogY2MuTm9kZSwvL25vbmVMYWJcclxuICAgICAgICBpbmZvSXRlbTogY2MuTm9kZSxcclxuICAgICAgICBjb250ZW50OiBjYy5Ob2RlLFxyXG4gICAgICAgIExhYl9DdXJQYWdlOiBjYy5MYWJlbCxcclxuICAgICAgICBMYWJfdG90YWxQYWdlOiBjYy5MYWJlbCxcclxuXHJcbiAgICAgICAgaGlzdG9yeV9kaXJlY3RfYWNoaWV2ZW1lbnQ6IGNjLkxhYmVsLFxyXG4gICAgICAgIGhpc3RvcnlfYWNoaWV2ZW1lbnQ6IGNjLkxhYmVsLFxyXG4gICAgICAgIGhpc3RvcnlfY29tbWlzc2lvbjogY2MuTGFiZWwsXHJcblxyXG4gICAgICAgIGt1YW5nOiBjYy5Ob2RlLFxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuTGFiX0N1clBhZ2Uuc3RyaW5nID0gdGhpcy5wYWdlO1xyXG4gICAgICAgIHRoaXMuZGF0ZSA9IFwiXCI7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjogdGhpcy5yZW1vdmUoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fcGFnZXVwXCI6IHRoaXMucGFnZXVwX0NCKCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3BhZ2Vkb3duXCI6IHRoaXMucGFnZWRvd25fQ0IoKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5fZGV0YWlsXCI6IHRoaXMuYnRuX2RldGFpbENCKG5vZGUpOyBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgUmVxUGxheWVyRXh0ZW5zaW9uQ291bnRsZXNzUmVjb3JkKCkge1xyXG4gICAgICAgIGxldCBwYWdlID0gdGhpcy5wYWdlLFxyXG4gICAgICAgICAgICBkYXRlID0gdGhpcy5kYXRlO1xyXG4gICAgICAgIHRoaXMuTGFiX0N1clBhZ2Uuc3RyaW5nID0gdGhpcy5wYWdlO1xyXG4gICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLlJlcVBsYXllckV4dGVuc2lvbkNvdW50bGVzc1JlY29yZCcsIHsgcGFnZTogcGFnZSwgZGF0ZTogZGF0ZSwgcGFnZV9zaXplOiA4IH0sIChyb3V0ZSwgbXNnKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb3JkRGF0YSA9IG1zZztcclxuICAgICAgICAgICAgdGhpcy5MYWJfQ3VyUGFnZS5zdHJpbmcgPSBwYWdlO1xyXG4gICAgICAgICAgICB0aGlzLkxhYl90b3RhbFBhZ2Uuc3RyaW5nID0gdGhpcy5yZWNvcmREYXRhLnBhZ2VfdG90YWwgPT0gMCA/IDEgOiB0aGlzLnJlY29yZERhdGEucGFnZV90b3RhbDtcclxuICAgICAgICAgICAgdGhpcy5zZXRUYWJsZSh0aGlzLnJlY29yZERhdGEubGlzdCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBpbml0VUkoZGF0YSkge1xyXG4gICAgICAgIHRoaXMucmVjb3JkRGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5oaXN0b3J5X2RpcmVjdF9hY2hpZXZlbWVudC5zdHJpbmcgPSB0aGlzLmdldEZsb2F0KHRoaXMucmVjb3JkRGF0YS5oaXN0b3J5X2RpcmVjdF9hY2hpZXZlbWVudCk7XHJcbiAgICAgICAgdGhpcy5oaXN0b3J5X2FjaGlldmVtZW50LnN0cmluZyA9IHRoaXMuZ2V0RmxvYXQodGhpcy5yZWNvcmREYXRhLmhpc3RvcnlfYWNoaWV2ZW1lbnQpO1xyXG4gICAgICAgIHRoaXMuaGlzdG9yeV9jb21taXNzaW9uLnN0cmluZyA9IHRoaXMuZ2V0RmxvYXQodGhpcy5yZWNvcmREYXRhLmhpc3RvcnlfY29tbWlzc2lvbik7XHJcbiAgICAgICAgdGhpcy50b3RhbFBhZ2UgPSB0aGlzLnJlY29yZERhdGEucGFnZV90b3RhbFxyXG4gICAgICAgIHRoaXMuTGFiX3RvdGFsUGFnZS5zdHJpbmcgPSB0aGlzLnJlY29yZERhdGEucGFnZV90b3RhbCA9PSAwID8gMSA6IHRoaXMucmVjb3JkRGF0YS5wYWdlX3RvdGFsO1xyXG4gICAgICAgIHRoaXMuc2V0VGFibGUodGhpcy5yZWNvcmREYXRhLmxpc3QpO1xyXG4gICAgfSxcclxuICAgIHNldFRhYmxlKGRhdGEpIHtcclxuICAgICAgICB0aGlzLmNvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgaWYgKGNvdW50ID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5ub3JlY29yZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGlhZFNob3dOb2RlKGNvdW50ID4gMCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpbmZvSXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaW5mb0l0ZW0pO1xyXG4gICAgICAgICAgICBpbmZvSXRlbS5wYXJlbnQgPSB0aGlzLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGluZm9JdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpbmZvSXRlbS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZSA9IGkgJSAyID09IDE7XHJcbiAgICAgICAgICAgIGluZm9JdGVtLmdldENoaWxkQnlOYW1lKFwidGltZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGRhdGFbaV0uZGF0ZTtcclxuICAgICAgICAgICAgaW5mb0l0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJEaXJlY3RhY2hpZXZlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5nZXRGbG9hdChkYXRhW2ldLmRpcmVjdF9hY2hpZXZlbWVudCk7ICAgICAvL+ebtOaOqOS4mue7qVxyXG5cclxuICAgICAgICAgICAgbGV0IERpcmVjdENvbW1pc3Npb24gPSBpbmZvSXRlbS5nZXRDaGlsZEJ5TmFtZShcIkRpcmVjdENvbW1pc3Npb25cIilcclxuICAgICAgICAgICAgRGlyZWN0Q29tbWlzc2lvbi5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZ2V0RmxvYXQoZGF0YVtpXS5kaXJlY3RfY29tbWlzc2lvbik7ICAgLy/nm7TmjqjkvaPph5FcclxuICAgICAgICAgICAgZ2xHYW1lLnBhbmVsLnNldHRpbmdUYWJsZUxhYmVsQ29sb3IoRGlyZWN0Q29tbWlzc2lvbik7XHJcblxyXG4gICAgICAgICAgICBpbmZvSXRlbS5nZXRDaGlsZEJ5TmFtZShcInRlYW1hY2hpZXZlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5nZXRGbG9hdChkYXRhW2ldLmFjaGlldmVtZW50KTsgICAgICAgICAgICAgIC8v5Zui6Zif5Lia57upXHJcbiAgICAgICAgICAgIGxldCB0ZWFtRGlmZmFjaGlldmUgPSBpbmZvSXRlbS5nZXRDaGlsZEJ5TmFtZShcInRlYW1EaWZmYWNoaWV2ZVwiKVxyXG4gICAgICAgICAgICB0ZWFtRGlmZmFjaGlldmUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLmdldEZsb2F0KGRhdGFbaV0uc3ViX2NvbW1pc3Npb24pOyAgICAgICAvL+e6p+W3ruS9o+mHkVxyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2V0dGluZ1RhYmxlTGFiZWxDb2xvcih0ZWFtRGlmZmFjaGlldmUpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRvdGFsQ29tbWlzc2lvbiA9IGluZm9JdGVtLmdldENoaWxkQnlOYW1lKFwidG90YWxDb21taXNzaW9uXCIpXHJcbiAgICAgICAgICAgIHRvdGFsQ29tbWlzc2lvbi5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuZ2V0RmxvYXQoZGF0YVtpXS5kaXJlY3RfY29tbWlzc2lvbiArIGRhdGFbaV0uc3ViX2NvbW1pc3Npb24pO1xyXG4gICAgICAgICAgICBnbEdhbWUucGFuZWwuc2V0dGluZ1RhYmxlTGFiZWxDb2xvcih0b3RhbENvbW1pc3Npb24pO1xyXG5cclxuICAgICAgICAgICAgaW5mb0l0ZW0ubmFtZSA9IGAke2RhdGFbaV0uZGF0ZX1gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsR2FtZS5wYW5lbC5zaG93RWZmZWN0Tm9kZSh0aGlzLHRoaXMuY29udGVudCwwLjAyLHRydWUpO1xyXG4gICAgfSxcclxuICAgIGhpYWRTaG93Tm9kZShpc0Jvb2wpIHtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fcGFnZXVwXCIpLmFjdGl2ZSA9IGlzQm9vbDtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwYWdlbGF5b3V0XCIpLmFjdGl2ZSA9IGlzQm9vbDtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fcGFnZWRvd25cIikuYWN0aXZlID0gaXNCb29sO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImV4cGxhaW5cIikuYWN0aXZlID0gaXNCb29sO1xyXG4gICAgfSxcclxuICAgIGdldEZsb2F0KHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIChOdW1iZXIodmFsdWUpLmRpdigxMDApKS50b1N0cmluZygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBidG5fZGV0YWlsQ0Iobm9kZSkge1xyXG4gICAgICAgIGdsR2FtZS5nYW1lTmV0LnNlbmRfbXNnKCdodHRwLlJlcVBsYXllckV4dGVuc2lvbkNvdW50bGVzc1JlY29yZERldGFpbCcsIHsgcGFnZTogMSwgZGF0ZTogbm9kZS5wYXJlbnQubmFtZSwgcGFnZV9zaXplOiA4IH0sIChyb3V0ZSwgbXNnKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlzdHJveUNvbW1pc3Npb25kYXRhID0gbXNnO1xyXG4gICAgICAgICAgICBsZXQgaGlzdHJveUNvbW1pc3Npb24gPSBnbEdhbWUucGFuZWwuc2hvd0NoaWxkUGFuZWwodGhpcy5oaXN0cm95Q29tbWlzc2lvbiwgdGhpcy5ub2RlLnBhcmVudC5wYXJlbnQpO1xyXG4gICAgICAgICAgICBsZXQgc2NyaXB0ID0gaGlzdHJveUNvbW1pc3Npb24uZ2V0Q29tcG9uZW50KFwiaGlzdHJveUNvbW1pc3Npb25cIik7XHJcbiAgICAgICAgICAgIHNjcmlwdC5pbml0VUkodGhpcy5oaXN0cm95Q29tbWlzc2lvbmRhdGEsIG5vZGUucGFyZW50Lm5hbWUpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIHBhZ2V1cF9DQigpIHtcclxuICAgICAgICB0aGlzLnBhZ2UtLVxyXG4gICAgICAgIGlmICh0aGlzLnBhZ2UgPCAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IDFcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUmVxUGxheWVyRXh0ZW5zaW9uQ291bnRsZXNzUmVjb3JkKClcclxuICAgIH0sXHJcbiAgICBwYWdlZG93bl9DQigpIHtcclxuICAgICAgICB0aGlzLnBhZ2UrKztcclxuICAgICAgICBpZiAodGhpcy5wYWdlID4gTnVtYmVyKHRoaXMuTGFiX3RvdGFsUGFnZS5zdHJpbmcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IE51bWJlcih0aGlzLkxhYl90b3RhbFBhZ2Uuc3RyaW5nKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUmVxUGxheWVyRXh0ZW5zaW9uQ291bnRsZXNzUmVjb3JkKClcclxuICAgIH0sXHJcbiAgICBPbkRlc3Ryb3koKSB7XHJcbiAgICB9LFxyXG59KTtcclxuIl19