
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/modules/plaza/script/prefab/userInfo/userinfoBank.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '67751B8o/lO1J55xssZIXXI', 'userinfoBank');
// modules/plaza/script/prefab/userInfo/userinfoBank.js

"use strict";

glGame.baseclass.extend({
  properties: {
    lab_suncoin: cc.Label,
    lab_mycoin: cc.Label,
    lab_bankcoin: cc.Label,
    savegold: cc.EditBox,
    // 要提交的金币数额
    progress: cc.ProgressBar,
    lab_cutstate: cc.Label,
    pic_title: cc.Label,
    cutstate_node: [cc.Node],
    pic_confirm: [cc.Node],
    audio_safebox: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.curBankPattern = glGame.bank.DEPOSIT;
    this.curBankText = {
      0: '存入',
      1: '取出'
    };
    this.resetData();
    this.refreshUi();
    this.registerEvent();
    glGame.user.reqGetBankCoin();
  },
  start: function start() {},
  // 注册界面监听事件
  registerEvent: function registerEvent() {
    glGame.emitter.on("updateUserData", this.updateUserData, this);
    glGame.emitter.on("updateBankCoin", this.showPanelInfo, this);
    glGame.emitter.on("updateBankSuccess", this.updateBankSuccess, this);
  },
  // 销毁界面监听事件
  unRegisterEvent: function unRegisterEvent() {
    glGame.emitter.off("updateUserData", this);
    glGame.emitter.off("updateBankCoin", this);
    glGame.emitter.off("updateBankSuccess", this);
  },
  // 刷新界面数据、UI
  updateUserData: function updateUserData() {
    this.resetData();
    this.showPanelInfo();
    this.refreshUi();
  },
  // 初始化界面数据
  resetData: function resetData() {
    this.gold = glGame.user.get("coin");
    this.bankgold = glGame.user.get("bank_coin");
  },
  // 显示界面信息
  showPanelInfo: function showPanelInfo() {
    this.lab_mycoin.string = this.getFixNumber(this.gold);
    this.lab_bankcoin.string = this.getFixNumber(this.bankgold);
    this.lab_suncoin.string = glGame.user.cutFloat(this.gold + this.bankgold);
    this.savegold.string = "";
    this.progress.progress = 0.01;
    this.progress.node.getChildByName("slider").getComponent(cc.Slider).progress = 0.01;
  },
  refreshUi: function refreshUi() {
    this.pic_confirm[glGame.bank.DEPOSIT].active = false;
    this.pic_confirm[glGame.bank.WITHDRAW].active = false;
    this.cutstate_node[glGame.bank.WITHDRAW].active = false;
    this.cutstate_node[glGame.bank.DEPOSIT].active = false;

    if (this.isDeposit()) {
      this.lab_cutstate.string = this.curBankText[glGame.bank.WITHDRAW];
      this.pic_title.string = "".concat(this.curBankText[glGame.bank.DEPOSIT], "\u6BD4\u4F8B:");
      this.pic_confirm[glGame.bank.DEPOSIT].active = true;
      this.cutstate_node[glGame.bank.DEPOSIT].active = true;
    } else if (this.isWithdraw()) {
      this.lab_cutstate.string = this.curBankText[glGame.bank.DEPOSIT];
      this.pic_title.string = "".concat(this.curBankText[glGame.bank.WITHDRAW], "\u6BD4\u4F8B:");
      this.pic_confirm[glGame.bank.WITHDRAW].active = true;
      this.cutstate_node[glGame.bank.WITHDRAW].active = true;
    }
  },
  updateBankSuccess: function updateBankSuccess() {
    glGame.audio.playSoundEffect(this.audio_safebox, true);
    this.updateEditbox();
  },
  updateEditbox: function updateEditbox() {
    this.savegold.string = "";
    this.progress.progress = 0.01;
    this.progress.node.getChildByName("slider").getComponent(cc.Slider).progress = 0.01;
  },
  onClick: function onClick(name, node) {
    switch (name) {
      case "confirm":
        this.click_confirm();
        break;

      case "btn_xgbxgmm_grzx":
        this.click_modifypsw();
        break;

      case "btn_deposit":
        this.click_Deposit();
        break;

      case "btn_withdrawn":
        this.click_Withdraw();
        break;

      case "btn_coinmax":
        this.click_coinMax();
        break;

      default:
        break;
    }
  },
  // 存款模式
  isDeposit: function isDeposit() {
    return this.curBankPattern === glGame.bank.DEPOSIT;
  },
  // 取出模式
  isWithdraw: function isWithdraw() {
    return this.curBankPattern === glGame.bank.WITHDRAW;
  },
  click_Deposit: function click_Deposit() {
    this.savegold.string = "";
    this.savegold.placeholder = glGame.tips.BANK.SAVEPLACEHOLDER;
    this.progress.progress = 0.01;
    this.progress.node.getChildByName("slider").getComponent(cc.Slider).progress = 0.01;
    this.curBankPattern = glGame.bank.DEPOSIT;
    this.refreshUi();
  },
  click_Withdraw: function click_Withdraw() {
    this.savegold.string = "";
    this.savegold.placeholder = glGame.tips.BANK.TAKEPLACEHOLDER;
    this.progress.progress = 0.01;
    this.progress.node.getChildByName("slider").getComponent(cc.Slider).progress = 0.01;
    this.curBankPattern = glGame.bank.WITHDRAW;
    this.refreshUi();
  },
  click_coinMax: function click_coinMax() {
    this.savegold.string = this.getFixNumber(this.isDeposit() ? this.gold : this.bankgold);
    this.progress.progress = 1;
    this.progress.node.getChildByName("slider").getComponent(cc.Slider).progress = 1;
  },
  onSliderProcess: function onSliderProcess(node, process) {
    var name = node.name;

    switch (name) {
      case "slider":
        this.progress.getComponent(cc.ProgressBar).progress = process == 0 ? 0.01 : process;

        if (this.isDeposit()) {
          this.savegold.string = this.getFixNumber(process * this.gold);
        } else {
          this.savegold.string = this.getFixNumber(process * this.bankgold);
        }

        break;

      default:
        break;
    }
  },
  onEditBox: function onEditBox(node) {
    var numGold = this.isDeposit() ? this.gold : this.bankgold;
    console.log("这是当前两个参数的大小", Number(this.savegold.string), numGold);

    if (Number(this.savegold.string) > 0 && numGold > 0) {
      var process = Number(this.savegold.string) / (numGold / 100);

      if (Number(this.savegold.string) * 100 >= numGold) {
        //this.isDeposit() ? this.click_DepositMax() : this.click_WithdrawMax();
        this.click_coinMax();
        process = 1;
      } else {
        this.progress.progress = process;
        this.progress.node.getChildByName("slider").getComponent(cc.Slider).progress = process;
      }

      if (this.savegold.string.substr(0, 1) === '0') this.savegold.string = Number(this.savegold.string).toString();
    } else {
      this.progress.node.getChildByName("slider").getComponent(cc.Slider).progress = 0.01;
      this.progress.progress = 0.01;
      this.savegold.string = '';
    }
  },
  getFixNumber: function getFixNumber(value) {
    var value1 = Number(value).div(10);
    value = Number(value).div(100);
    if (isNaN(value)) return;

    if (~~value === value) {
      return value.toString();
    } else if (~~value1 === value1) {
      return value.toFixed(1);
    } else {
      return value.toFixed(2);
    }
  },
  click_modifypsw: function click_modifypsw() {
    glGame.panel.showPanelByName("bankmodifypsw");
  },
  // 提交银行操作到服务器
  click_confirm: function click_confirm() {
    if (this.savegold.string.length == 0) {
      return glGame.panel.showErrorTip(this.isDeposit() ? glGame.tips.BANK.SAVEZERO : glGame.tips.BANK.TAKEZERO);
    }

    if (!/^\d+(\.\d{0,2})?$/.test(this.savegold.string)) {
      return glGame.panel.showErrorTip(this.isDeposit() ? glGame.tips.BANK.SAVEERROR : glGame.tips.BANK.TAKEERROR);
    }

    var savegold = 0; // if (this.savegold.string.indexOf('.') != -1)
    //     savegold = Number(this.savegold.string.replace('.', ''));
    // else {
    //     savegold = Number(this.savegold.string).mul(100);
    // }

    savegold = Number(this.savegold.string).mul(100);
    if (savegold <= 0) return glGame.panel.showErrorTip(this.isDeposit() ? glGame.tips.BANK.SAVELITTLE : glGame.tips.BANK.TAKELITTLE);

    if (savegold > (this.isDeposit() ? this.gold : this.bankgold)) {
      return glGame.panel.showErrorTip(this.isDeposit() ? glGame.tips.BANK.SAVEMUCH : glGame.tips.BANK.TAKEMUCH);
    }

    if (this.isDeposit()) {
      glGame.user.reqBankSave(savegold);
    } else if (this.isWithdraw()) {
      glGame.panel.showPanelByName("bankpassword").then(function (panel) {
        var script = panel.getComponent(panel.name);
        script.setConfirmNext(function (password) {
          glGame.user.reqBankTakeOut(savegold, password);
        });
      });
    }
  },
  OnDestroy: function OnDestroy() {
    this.unRegisterEvent();
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbW9kdWxlc1xccGxhemFcXHNjcmlwdFxccHJlZmFiXFx1c2VySW5mb1xcdXNlcmluZm9CYW5rLmpzIl0sIm5hbWVzIjpbImdsR2FtZSIsImJhc2VjbGFzcyIsImV4dGVuZCIsInByb3BlcnRpZXMiLCJsYWJfc3VuY29pbiIsImNjIiwiTGFiZWwiLCJsYWJfbXljb2luIiwibGFiX2Jhbmtjb2luIiwic2F2ZWdvbGQiLCJFZGl0Qm94IiwicHJvZ3Jlc3MiLCJQcm9ncmVzc0JhciIsImxhYl9jdXRzdGF0ZSIsInBpY190aXRsZSIsImN1dHN0YXRlX25vZGUiLCJOb2RlIiwicGljX2NvbmZpcm0iLCJhdWRpb19zYWZlYm94IiwidHlwZSIsIkF1ZGlvQ2xpcCIsIm9uTG9hZCIsImN1ckJhbmtQYXR0ZXJuIiwiYmFuayIsIkRFUE9TSVQiLCJjdXJCYW5rVGV4dCIsInJlc2V0RGF0YSIsInJlZnJlc2hVaSIsInJlZ2lzdGVyRXZlbnQiLCJ1c2VyIiwicmVxR2V0QmFua0NvaW4iLCJzdGFydCIsImVtaXR0ZXIiLCJvbiIsInVwZGF0ZVVzZXJEYXRhIiwic2hvd1BhbmVsSW5mbyIsInVwZGF0ZUJhbmtTdWNjZXNzIiwidW5SZWdpc3RlckV2ZW50Iiwib2ZmIiwiZ29sZCIsImdldCIsImJhbmtnb2xkIiwic3RyaW5nIiwiZ2V0Rml4TnVtYmVyIiwiY3V0RmxvYXQiLCJub2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJnZXRDb21wb25lbnQiLCJTbGlkZXIiLCJhY3RpdmUiLCJXSVRIRFJBVyIsImlzRGVwb3NpdCIsImlzV2l0aGRyYXciLCJhdWRpbyIsInBsYXlTb3VuZEVmZmVjdCIsInVwZGF0ZUVkaXRib3giLCJvbkNsaWNrIiwibmFtZSIsImNsaWNrX2NvbmZpcm0iLCJjbGlja19tb2RpZnlwc3ciLCJjbGlja19EZXBvc2l0IiwiY2xpY2tfV2l0aGRyYXciLCJjbGlja19jb2luTWF4IiwicGxhY2Vob2xkZXIiLCJ0aXBzIiwiQkFOSyIsIlNBVkVQTEFDRUhPTERFUiIsIlRBS0VQTEFDRUhPTERFUiIsIm9uU2xpZGVyUHJvY2VzcyIsInByb2Nlc3MiLCJvbkVkaXRCb3giLCJudW1Hb2xkIiwiY29uc29sZSIsImxvZyIsIk51bWJlciIsInN1YnN0ciIsInRvU3RyaW5nIiwidmFsdWUiLCJ2YWx1ZTEiLCJkaXYiLCJpc05hTiIsInRvRml4ZWQiLCJwYW5lbCIsInNob3dQYW5lbEJ5TmFtZSIsImxlbmd0aCIsInNob3dFcnJvclRpcCIsIlNBVkVaRVJPIiwiVEFLRVpFUk8iLCJ0ZXN0IiwiU0FWRUVSUk9SIiwiVEFLRUVSUk9SIiwibXVsIiwiU0FWRUxJVFRMRSIsIlRBS0VMSVRUTEUiLCJTQVZFTVVDSCIsIlRBS0VNVUNIIiwicmVxQmFua1NhdmUiLCJ0aGVuIiwic2NyaXB0Iiwic2V0Q29uZmlybU5leHQiLCJwYXNzd29yZCIsInJlcUJhbmtUYWtlT3V0IiwiT25EZXN0cm95Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE1BQWpCLENBQXdCO0FBQ3BCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsV0FBVyxFQUFFQyxFQUFFLENBQUNDLEtBRFI7QUFHUkMsSUFBQUEsVUFBVSxFQUFFRixFQUFFLENBQUNDLEtBSFA7QUFJUkUsSUFBQUEsWUFBWSxFQUFFSCxFQUFFLENBQUNDLEtBSlQ7QUFNUkcsSUFBQUEsUUFBUSxFQUFFSixFQUFFLENBQUNLLE9BTkw7QUFNb0I7QUFDNUJDLElBQUFBLFFBQVEsRUFBRU4sRUFBRSxDQUFDTyxXQVBMO0FBU1JDLElBQUFBLFlBQVksRUFBRVIsRUFBRSxDQUFDQyxLQVRUO0FBVVJRLElBQUFBLFNBQVMsRUFBRVQsRUFBRSxDQUFDQyxLQVZOO0FBV1JTLElBQUFBLGFBQWEsRUFBRSxDQUFDVixFQUFFLENBQUNXLElBQUosQ0FYUDtBQVlSQyxJQUFBQSxXQUFXLEVBQUUsQ0FBQ1osRUFBRSxDQUFDVyxJQUFKLENBWkw7QUFjUkUsSUFBQUEsYUFBYSxFQUFFO0FBQ1hDLE1BQUFBLElBQUksRUFBRWQsRUFBRSxDQUFDZSxTQURFO0FBRVgsaUJBQVM7QUFGRTtBQWRQLEdBRFE7QUFxQnBCQyxFQUFBQSxNQXJCb0Isb0JBcUJYO0FBQ0wsU0FBS0MsY0FBTCxHQUFzQnRCLE1BQU0sQ0FBQ3VCLElBQVAsQ0FBWUMsT0FBbEM7QUFDQSxTQUFLQyxXQUFMLEdBQW1CO0FBQUMsU0FBRyxJQUFKO0FBQVUsU0FBRztBQUFiLEtBQW5CO0FBRUEsU0FBS0MsU0FBTDtBQUNBLFNBQUtDLFNBQUw7QUFDQSxTQUFLQyxhQUFMO0FBQ0E1QixJQUFBQSxNQUFNLENBQUM2QixJQUFQLENBQVlDLGNBQVo7QUFDSCxHQTdCbUI7QUErQnBCQyxFQUFBQSxLQS9Cb0IsbUJBK0JaLENBQ1AsQ0FoQ21CO0FBbUNwQjtBQUNBSCxFQUFBQSxhQXBDb0IsMkJBb0NKO0FBQ1o1QixJQUFBQSxNQUFNLENBQUNnQyxPQUFQLENBQWVDLEVBQWYsQ0FBa0IsZ0JBQWxCLEVBQW9DLEtBQUtDLGNBQXpDLEVBQXlELElBQXpEO0FBQ0FsQyxJQUFBQSxNQUFNLENBQUNnQyxPQUFQLENBQWVDLEVBQWYsQ0FBa0IsZ0JBQWxCLEVBQW9DLEtBQUtFLGFBQXpDLEVBQXdELElBQXhEO0FBQ0FuQyxJQUFBQSxNQUFNLENBQUNnQyxPQUFQLENBQWVDLEVBQWYsQ0FBa0IsbUJBQWxCLEVBQXVDLEtBQUtHLGlCQUE1QyxFQUErRCxJQUEvRDtBQUNILEdBeENtQjtBQXlDcEI7QUFDQUMsRUFBQUEsZUExQ29CLDZCQTBDRjtBQUNkckMsSUFBQUEsTUFBTSxDQUFDZ0MsT0FBUCxDQUFlTSxHQUFmLENBQW1CLGdCQUFuQixFQUFxQyxJQUFyQztBQUNBdEMsSUFBQUEsTUFBTSxDQUFDZ0MsT0FBUCxDQUFlTSxHQUFmLENBQW1CLGdCQUFuQixFQUFxQyxJQUFyQztBQUNBdEMsSUFBQUEsTUFBTSxDQUFDZ0MsT0FBUCxDQUFlTSxHQUFmLENBQW1CLG1CQUFuQixFQUF3QyxJQUF4QztBQUNILEdBOUNtQjtBQWdEcEI7QUFDQUosRUFBQUEsY0FqRG9CLDRCQWlESDtBQUNiLFNBQUtSLFNBQUw7QUFDQSxTQUFLUyxhQUFMO0FBQ0EsU0FBS1IsU0FBTDtBQUNILEdBckRtQjtBQXVEcEI7QUFDQUQsRUFBQUEsU0F4RG9CLHVCQXdEUjtBQUNSLFNBQUthLElBQUwsR0FBWXZDLE1BQU0sQ0FBQzZCLElBQVAsQ0FBWVcsR0FBWixDQUFnQixNQUFoQixDQUFaO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQnpDLE1BQU0sQ0FBQzZCLElBQVAsQ0FBWVcsR0FBWixDQUFnQixXQUFoQixDQUFoQjtBQUNILEdBM0RtQjtBQTZEcEI7QUFDQUwsRUFBQUEsYUE5RG9CLDJCQThESjtBQUNaLFNBQUs1QixVQUFMLENBQWdCbUMsTUFBaEIsR0FBeUIsS0FBS0MsWUFBTCxDQUFrQixLQUFLSixJQUF2QixDQUF6QjtBQUNBLFNBQUsvQixZQUFMLENBQWtCa0MsTUFBbEIsR0FBMkIsS0FBS0MsWUFBTCxDQUFrQixLQUFLRixRQUF2QixDQUEzQjtBQUNBLFNBQUtyQyxXQUFMLENBQWlCc0MsTUFBakIsR0FBMEIxQyxNQUFNLENBQUM2QixJQUFQLENBQVllLFFBQVosQ0FBcUIsS0FBS0wsSUFBTCxHQUFZLEtBQUtFLFFBQXRDLENBQTFCO0FBRUEsU0FBS2hDLFFBQUwsQ0FBY2lDLE1BQWQsR0FBdUIsRUFBdkI7QUFDQSxTQUFLL0IsUUFBTCxDQUFjQSxRQUFkLEdBQXlCLElBQXpCO0FBQ0EsU0FBS0EsUUFBTCxDQUFja0MsSUFBZCxDQUFtQkMsY0FBbkIsQ0FBa0MsUUFBbEMsRUFBNENDLFlBQTVDLENBQXlEMUMsRUFBRSxDQUFDMkMsTUFBNUQsRUFBb0VyQyxRQUFwRSxHQUErRSxJQUEvRTtBQUNILEdBdEVtQjtBQXdFcEJnQixFQUFBQSxTQXhFb0IsdUJBd0VSO0FBQ1IsU0FBS1YsV0FBTCxDQUFpQmpCLE1BQU0sQ0FBQ3VCLElBQVAsQ0FBWUMsT0FBN0IsRUFBc0N5QixNQUF0QyxHQUErQyxLQUEvQztBQUNBLFNBQUtoQyxXQUFMLENBQWlCakIsTUFBTSxDQUFDdUIsSUFBUCxDQUFZMkIsUUFBN0IsRUFBdUNELE1BQXZDLEdBQWdELEtBQWhEO0FBQ0EsU0FBS2xDLGFBQUwsQ0FBbUJmLE1BQU0sQ0FBQ3VCLElBQVAsQ0FBWTJCLFFBQS9CLEVBQXlDRCxNQUF6QyxHQUFrRCxLQUFsRDtBQUNBLFNBQUtsQyxhQUFMLENBQW1CZixNQUFNLENBQUN1QixJQUFQLENBQVlDLE9BQS9CLEVBQXdDeUIsTUFBeEMsR0FBaUQsS0FBakQ7O0FBQ0EsUUFBSSxLQUFLRSxTQUFMLEVBQUosRUFBc0I7QUFDbEIsV0FBS3RDLFlBQUwsQ0FBa0I2QixNQUFsQixHQUEyQixLQUFLakIsV0FBTCxDQUFpQnpCLE1BQU0sQ0FBQ3VCLElBQVAsQ0FBWTJCLFFBQTdCLENBQTNCO0FBQ0EsV0FBS3BDLFNBQUwsQ0FBZTRCLE1BQWYsYUFBMkIsS0FBS2pCLFdBQUwsQ0FBaUJ6QixNQUFNLENBQUN1QixJQUFQLENBQVlDLE9BQTdCLENBQTNCO0FBQ0EsV0FBS1AsV0FBTCxDQUFpQmpCLE1BQU0sQ0FBQ3VCLElBQVAsQ0FBWUMsT0FBN0IsRUFBc0N5QixNQUF0QyxHQUErQyxJQUEvQztBQUNBLFdBQUtsQyxhQUFMLENBQW1CZixNQUFNLENBQUN1QixJQUFQLENBQVlDLE9BQS9CLEVBQXdDeUIsTUFBeEMsR0FBaUQsSUFBakQ7QUFDSCxLQUxELE1BS08sSUFBSSxLQUFLRyxVQUFMLEVBQUosRUFBdUI7QUFDMUIsV0FBS3ZDLFlBQUwsQ0FBa0I2QixNQUFsQixHQUEyQixLQUFLakIsV0FBTCxDQUFpQnpCLE1BQU0sQ0FBQ3VCLElBQVAsQ0FBWUMsT0FBN0IsQ0FBM0I7QUFDQSxXQUFLVixTQUFMLENBQWU0QixNQUFmLGFBQTJCLEtBQUtqQixXQUFMLENBQWlCekIsTUFBTSxDQUFDdUIsSUFBUCxDQUFZMkIsUUFBN0IsQ0FBM0I7QUFDQSxXQUFLakMsV0FBTCxDQUFpQmpCLE1BQU0sQ0FBQ3VCLElBQVAsQ0FBWTJCLFFBQTdCLEVBQXVDRCxNQUF2QyxHQUFnRCxJQUFoRDtBQUNBLFdBQUtsQyxhQUFMLENBQW1CZixNQUFNLENBQUN1QixJQUFQLENBQVkyQixRQUEvQixFQUF5Q0QsTUFBekMsR0FBa0QsSUFBbEQ7QUFDSDtBQUNKLEdBeEZtQjtBQTBGcEJiLEVBQUFBLGlCQTFGb0IsK0JBMEZBO0FBQ2hCcEMsSUFBQUEsTUFBTSxDQUFDcUQsS0FBUCxDQUFhQyxlQUFiLENBQTZCLEtBQUtwQyxhQUFsQyxFQUFpRCxJQUFqRDtBQUNBLFNBQUtxQyxhQUFMO0FBQ0gsR0E3Rm1CO0FBK0ZwQkEsRUFBQUEsYUEvRm9CLDJCQStGSjtBQUNaLFNBQUs5QyxRQUFMLENBQWNpQyxNQUFkLEdBQXVCLEVBQXZCO0FBQ0EsU0FBSy9CLFFBQUwsQ0FBY0EsUUFBZCxHQUF5QixJQUF6QjtBQUNBLFNBQUtBLFFBQUwsQ0FBY2tDLElBQWQsQ0FBbUJDLGNBQW5CLENBQWtDLFFBQWxDLEVBQTRDQyxZQUE1QyxDQUF5RDFDLEVBQUUsQ0FBQzJDLE1BQTVELEVBQW9FckMsUUFBcEUsR0FBK0UsSUFBL0U7QUFDSCxHQW5HbUI7QUFxR3BCNkMsRUFBQUEsT0FyR29CLG1CQXFHWkMsSUFyR1ksRUFxR05aLElBckdNLEVBcUdBO0FBQ2hCLFlBQVFZLElBQVI7QUFDSSxXQUFLLFNBQUw7QUFBZ0IsYUFBS0MsYUFBTDtBQUFzQjs7QUFDdEMsV0FBSyxrQkFBTDtBQUF5QixhQUFLQyxlQUFMO0FBQXdCOztBQUNqRCxXQUFLLGFBQUw7QUFBb0IsYUFBS0MsYUFBTDtBQUFzQjs7QUFDMUMsV0FBSyxlQUFMO0FBQXNCLGFBQUtDLGNBQUw7QUFBdUI7O0FBQzdDLFdBQUssYUFBTDtBQUFvQixhQUFLQyxhQUFMO0FBQXNCOztBQUMxQztBQUFTO0FBTmI7QUFRSCxHQTlHbUI7QUFnSHBCO0FBQ0FYLEVBQUFBLFNBakhvQix1QkFpSFI7QUFDUixXQUFPLEtBQUs3QixjQUFMLEtBQXdCdEIsTUFBTSxDQUFDdUIsSUFBUCxDQUFZQyxPQUEzQztBQUNILEdBbkhtQjtBQW9IcEI7QUFDQTRCLEVBQUFBLFVBckhvQix3QkFxSFA7QUFDVCxXQUFPLEtBQUs5QixjQUFMLEtBQXdCdEIsTUFBTSxDQUFDdUIsSUFBUCxDQUFZMkIsUUFBM0M7QUFDSCxHQXZIbUI7QUF5SHBCVSxFQUFBQSxhQXpIb0IsMkJBeUhKO0FBQ1osU0FBS25ELFFBQUwsQ0FBY2lDLE1BQWQsR0FBdUIsRUFBdkI7QUFDQSxTQUFLakMsUUFBTCxDQUFjc0QsV0FBZCxHQUE0Qi9ELE1BQU0sQ0FBQ2dFLElBQVAsQ0FBWUMsSUFBWixDQUFpQkMsZUFBN0M7QUFDQSxTQUFLdkQsUUFBTCxDQUFjQSxRQUFkLEdBQXlCLElBQXpCO0FBQ0EsU0FBS0EsUUFBTCxDQUFja0MsSUFBZCxDQUFtQkMsY0FBbkIsQ0FBa0MsUUFBbEMsRUFBNENDLFlBQTVDLENBQXlEMUMsRUFBRSxDQUFDMkMsTUFBNUQsRUFBb0VyQyxRQUFwRSxHQUErRSxJQUEvRTtBQUNBLFNBQUtXLGNBQUwsR0FBc0J0QixNQUFNLENBQUN1QixJQUFQLENBQVlDLE9BQWxDO0FBQ0EsU0FBS0csU0FBTDtBQUNILEdBaEltQjtBQWtJcEJrQyxFQUFBQSxjQWxJb0IsNEJBa0lIO0FBQ2IsU0FBS3BELFFBQUwsQ0FBY2lDLE1BQWQsR0FBdUIsRUFBdkI7QUFDQSxTQUFLakMsUUFBTCxDQUFjc0QsV0FBZCxHQUE0Qi9ELE1BQU0sQ0FBQ2dFLElBQVAsQ0FBWUMsSUFBWixDQUFpQkUsZUFBN0M7QUFDQSxTQUFLeEQsUUFBTCxDQUFjQSxRQUFkLEdBQXlCLElBQXpCO0FBQ0EsU0FBS0EsUUFBTCxDQUFja0MsSUFBZCxDQUFtQkMsY0FBbkIsQ0FBa0MsUUFBbEMsRUFBNENDLFlBQTVDLENBQXlEMUMsRUFBRSxDQUFDMkMsTUFBNUQsRUFBb0VyQyxRQUFwRSxHQUErRSxJQUEvRTtBQUNBLFNBQUtXLGNBQUwsR0FBc0J0QixNQUFNLENBQUN1QixJQUFQLENBQVkyQixRQUFsQztBQUNBLFNBQUt2QixTQUFMO0FBQ0gsR0F6SW1CO0FBMklwQm1DLEVBQUFBLGFBM0lvQiwyQkEySUw7QUFDWCxTQUFLckQsUUFBTCxDQUFjaUMsTUFBZCxHQUF1QixLQUFLQyxZQUFMLENBQWtCLEtBQUtRLFNBQUwsS0FBbUIsS0FBS1osSUFBeEIsR0FBK0IsS0FBS0UsUUFBdEQsQ0FBdkI7QUFDQSxTQUFLOUIsUUFBTCxDQUFjQSxRQUFkLEdBQXlCLENBQXpCO0FBQ0EsU0FBS0EsUUFBTCxDQUFja0MsSUFBZCxDQUFtQkMsY0FBbkIsQ0FBa0MsUUFBbEMsRUFBNENDLFlBQTVDLENBQXlEMUMsRUFBRSxDQUFDMkMsTUFBNUQsRUFBb0VyQyxRQUFwRSxHQUErRSxDQUEvRTtBQUNILEdBL0ltQjtBQWlKcEJ5RCxFQUFBQSxlQWpKb0IsMkJBaUpKdkIsSUFqSkksRUFpSkV3QixPQWpKRixFQWlKVztBQUMzQixRQUFJWixJQUFJLEdBQUdaLElBQUksQ0FBQ1ksSUFBaEI7O0FBQ0EsWUFBUUEsSUFBUjtBQUNJLFdBQUssUUFBTDtBQUNJLGFBQUs5QyxRQUFMLENBQWNvQyxZQUFkLENBQTJCMUMsRUFBRSxDQUFDTyxXQUE5QixFQUEyQ0QsUUFBM0MsR0FBc0QwRCxPQUFPLElBQUksQ0FBWCxHQUFlLElBQWYsR0FBc0JBLE9BQTVFOztBQUNBLFlBQUksS0FBS2xCLFNBQUwsRUFBSixFQUFzQjtBQUNsQixlQUFLMUMsUUFBTCxDQUFjaUMsTUFBZCxHQUF1QixLQUFLQyxZQUFMLENBQWtCMEIsT0FBTyxHQUFHLEtBQUs5QixJQUFqQyxDQUF2QjtBQUNILFNBRkQsTUFFTztBQUNILGVBQUs5QixRQUFMLENBQWNpQyxNQUFkLEdBQXVCLEtBQUtDLFlBQUwsQ0FBa0IwQixPQUFPLEdBQUcsS0FBSzVCLFFBQWpDLENBQXZCO0FBQ0g7O0FBQ0Q7O0FBQ0o7QUFBUztBQVRiO0FBV0gsR0E5Sm1CO0FBZ0twQjZCLEVBQUFBLFNBaEtvQixxQkFnS1Z6QixJQWhLVSxFQWdLSjtBQUNaLFFBQUkwQixPQUFPLEdBQUcsS0FBS3BCLFNBQUwsS0FBbUIsS0FBS1osSUFBeEIsR0FBK0IsS0FBS0UsUUFBbEQ7QUFDQStCLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGFBQVosRUFBMEJDLE1BQU0sQ0FBQyxLQUFLakUsUUFBTCxDQUFjaUMsTUFBZixDQUFoQyxFQUF1RDZCLE9BQXZEOztBQUNBLFFBQUlHLE1BQU0sQ0FBQyxLQUFLakUsUUFBTCxDQUFjaUMsTUFBZixDQUFOLEdBQStCLENBQS9CLElBQW9DNkIsT0FBTyxHQUFHLENBQWxELEVBQXFEO0FBQ2pELFVBQUlGLE9BQU8sR0FBR0ssTUFBTSxDQUFDLEtBQUtqRSxRQUFMLENBQWNpQyxNQUFmLENBQU4sSUFBZ0M2QixPQUFPLEdBQUcsR0FBMUMsQ0FBZDs7QUFDQSxVQUFJRyxNQUFNLENBQUMsS0FBS2pFLFFBQUwsQ0FBY2lDLE1BQWYsQ0FBTixHQUErQixHQUEvQixJQUFzQzZCLE9BQTFDLEVBQW1EO0FBQy9DO0FBQ0EsYUFBS1QsYUFBTDtBQUNBTyxRQUFBQSxPQUFPLEdBQUcsQ0FBVjtBQUNILE9BSkQsTUFJTztBQUNILGFBQUsxRCxRQUFMLENBQWNBLFFBQWQsR0FBeUIwRCxPQUF6QjtBQUNBLGFBQUsxRCxRQUFMLENBQWNrQyxJQUFkLENBQW1CQyxjQUFuQixDQUFrQyxRQUFsQyxFQUE0Q0MsWUFBNUMsQ0FBeUQxQyxFQUFFLENBQUMyQyxNQUE1RCxFQUFvRXJDLFFBQXBFLEdBQStFMEQsT0FBL0U7QUFDSDs7QUFFRCxVQUFJLEtBQUs1RCxRQUFMLENBQWNpQyxNQUFkLENBQXFCaUMsTUFBckIsQ0FBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsTUFBc0MsR0FBMUMsRUFDSSxLQUFLbEUsUUFBTCxDQUFjaUMsTUFBZCxHQUF1QmdDLE1BQU0sQ0FBQyxLQUFLakUsUUFBTCxDQUFjaUMsTUFBZixDQUFOLENBQTZCa0MsUUFBN0IsRUFBdkI7QUFDUCxLQWJELE1BYU87QUFDSCxXQUFLakUsUUFBTCxDQUFja0MsSUFBZCxDQUFtQkMsY0FBbkIsQ0FBa0MsUUFBbEMsRUFBNENDLFlBQTVDLENBQXlEMUMsRUFBRSxDQUFDMkMsTUFBNUQsRUFBb0VyQyxRQUFwRSxHQUErRSxJQUEvRTtBQUNBLFdBQUtBLFFBQUwsQ0FBY0EsUUFBZCxHQUF5QixJQUF6QjtBQUNBLFdBQUtGLFFBQUwsQ0FBY2lDLE1BQWQsR0FBdUIsRUFBdkI7QUFDSDtBQUNKLEdBckxtQjtBQXVMcEJDLEVBQUFBLFlBdkxvQix3QkF1TFBrQyxLQXZMTyxFQXVMQTtBQUNoQixRQUFJQyxNQUFNLEdBQUdKLE1BQU0sQ0FBQ0csS0FBRCxDQUFOLENBQWNFLEdBQWQsQ0FBa0IsRUFBbEIsQ0FBYjtBQUNBRixJQUFBQSxLQUFLLEdBQUdILE1BQU0sQ0FBQ0csS0FBRCxDQUFOLENBQWNFLEdBQWQsQ0FBa0IsR0FBbEIsQ0FBUjtBQUNBLFFBQUlDLEtBQUssQ0FBQ0gsS0FBRCxDQUFULEVBQWtCOztBQUNsQixRQUFJLENBQUMsQ0FBQ0EsS0FBRixLQUFZQSxLQUFoQixFQUF1QjtBQUNuQixhQUFPQSxLQUFLLENBQUNELFFBQU4sRUFBUDtBQUNILEtBRkQsTUFFTyxJQUFJLENBQUMsQ0FBQ0UsTUFBRixLQUFhQSxNQUFqQixFQUF5QjtBQUM1QixhQUFPRCxLQUFLLENBQUNJLE9BQU4sQ0FBYyxDQUFkLENBQVA7QUFDSCxLQUZNLE1BRUE7QUFDSCxhQUFPSixLQUFLLENBQUNJLE9BQU4sQ0FBYyxDQUFkLENBQVA7QUFDSDtBQUNKLEdBbE1tQjtBQXNNcEJ0QixFQUFBQSxlQXRNb0IsNkJBc01GO0FBQ2QzRCxJQUFBQSxNQUFNLENBQUNrRixLQUFQLENBQWFDLGVBQWIsQ0FBNkIsZUFBN0I7QUFDSCxHQXhNbUI7QUEwTXBCO0FBQ0F6QixFQUFBQSxhQTNNb0IsMkJBMk1KO0FBQ1osUUFBRyxLQUFLakQsUUFBTCxDQUFjaUMsTUFBZCxDQUFxQjBDLE1BQXJCLElBQStCLENBQWxDLEVBQXFDO0FBQ2pDLGFBQU9wRixNQUFNLENBQUNrRixLQUFQLENBQWFHLFlBQWIsQ0FBMEIsS0FBS2xDLFNBQUwsS0FBa0JuRCxNQUFNLENBQUNnRSxJQUFQLENBQVlDLElBQVosQ0FBaUJxQixRQUFuQyxHQUE4Q3RGLE1BQU0sQ0FBQ2dFLElBQVAsQ0FBWUMsSUFBWixDQUFpQnNCLFFBQXpGLENBQVA7QUFDSDs7QUFFRCxRQUFJLENBQUMsb0JBQW9CQyxJQUFwQixDQUF5QixLQUFLL0UsUUFBTCxDQUFjaUMsTUFBdkMsQ0FBTCxFQUFxRDtBQUNqRCxhQUFPMUMsTUFBTSxDQUFDa0YsS0FBUCxDQUFhRyxZQUFiLENBQTBCLEtBQUtsQyxTQUFMLEtBQWtCbkQsTUFBTSxDQUFDZ0UsSUFBUCxDQUFZQyxJQUFaLENBQWlCd0IsU0FBbkMsR0FBK0N6RixNQUFNLENBQUNnRSxJQUFQLENBQVlDLElBQVosQ0FBaUJ5QixTQUExRixDQUFQO0FBQ0g7O0FBQ0QsUUFBSWpGLFFBQVEsR0FBRyxDQUFmLENBUlksQ0FTWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBQSxJQUFBQSxRQUFRLEdBQUdpRSxNQUFNLENBQUMsS0FBS2pFLFFBQUwsQ0FBY2lDLE1BQWYsQ0FBTixDQUE2QmlELEdBQTdCLENBQWlDLEdBQWpDLENBQVg7QUFDQSxRQUFJbEYsUUFBUSxJQUFJLENBQWhCLEVBQW1CLE9BQU9ULE1BQU0sQ0FBQ2tGLEtBQVAsQ0FBYUcsWUFBYixDQUEwQixLQUFLbEMsU0FBTCxLQUFtQm5ELE1BQU0sQ0FBQ2dFLElBQVAsQ0FBWUMsSUFBWixDQUFpQjJCLFVBQXBDLEdBQWlENUYsTUFBTSxDQUFDZ0UsSUFBUCxDQUFZQyxJQUFaLENBQWlCNEIsVUFBNUYsQ0FBUDs7QUFDbkIsUUFBSXBGLFFBQVEsSUFBSSxLQUFLMEMsU0FBTCxLQUFtQixLQUFLWixJQUF4QixHQUErQixLQUFLRSxRQUF4QyxDQUFaLEVBQStEO0FBQzNELGFBQU96QyxNQUFNLENBQUNrRixLQUFQLENBQWFHLFlBQWIsQ0FBMEIsS0FBS2xDLFNBQUwsS0FBbUJuRCxNQUFNLENBQUNnRSxJQUFQLENBQVlDLElBQVosQ0FBaUI2QixRQUFwQyxHQUErQzlGLE1BQU0sQ0FBQ2dFLElBQVAsQ0FBWUMsSUFBWixDQUFpQjhCLFFBQTFGLENBQVA7QUFDSDs7QUFDRCxRQUFJLEtBQUs1QyxTQUFMLEVBQUosRUFBc0I7QUFDbEJuRCxNQUFBQSxNQUFNLENBQUM2QixJQUFQLENBQVltRSxXQUFaLENBQXdCdkYsUUFBeEI7QUFDSCxLQUZELE1BRU8sSUFBSSxLQUFLMkMsVUFBTCxFQUFKLEVBQXVCO0FBQzFCcEQsTUFBQUEsTUFBTSxDQUFDa0YsS0FBUCxDQUFhQyxlQUFiLENBQTZCLGNBQTdCLEVBQTZDYyxJQUE3QyxDQUFrRCxVQUFBZixLQUFLLEVBQUk7QUFDdkQsWUFBSWdCLE1BQU0sR0FBR2hCLEtBQUssQ0FBQ25DLFlBQU4sQ0FBbUJtQyxLQUFLLENBQUN6QixJQUF6QixDQUFiO0FBQ0F5QyxRQUFBQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0IsVUFBQ0MsUUFBRCxFQUFjO0FBQ2hDcEcsVUFBQUEsTUFBTSxDQUFDNkIsSUFBUCxDQUFZd0UsY0FBWixDQUEyQjVGLFFBQTNCLEVBQXFDMkYsUUFBckM7QUFDSCxTQUZEO0FBR0gsT0FMRDtBQU1IO0FBQ0osR0F4T21CO0FBMk9wQkUsRUFBQUEsU0EzT29CLHVCQTJPUjtBQUNSLFNBQUtqRSxlQUFMO0FBQ0g7QUE3T21CLENBQXhCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJnbEdhbWUuYmFzZWNsYXNzLmV4dGVuZCh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbGFiX3N1bmNvaW46IGNjLkxhYmVsLFxyXG5cclxuICAgICAgICBsYWJfbXljb2luOiBjYy5MYWJlbCxcclxuICAgICAgICBsYWJfYmFua2NvaW46IGNjLkxhYmVsLFxyXG5cclxuICAgICAgICBzYXZlZ29sZDogY2MuRWRpdEJveCwgICAgICAgLy8g6KaB5o+Q5Lqk55qE6YeR5biB5pWw6aKdXHJcbiAgICAgICAgcHJvZ3Jlc3M6IGNjLlByb2dyZXNzQmFyLFxyXG5cclxuICAgICAgICBsYWJfY3V0c3RhdGU6IGNjLkxhYmVsLFxyXG4gICAgICAgIHBpY190aXRsZTogY2MuTGFiZWwsXHJcbiAgICAgICAgY3V0c3RhdGVfbm9kZTogW2NjLk5vZGVdLFxyXG4gICAgICAgIHBpY19jb25maXJtOiBbY2MuTm9kZV0sXHJcblxyXG4gICAgICAgIGF1ZGlvX3NhZmVib3g6IHtcclxuICAgICAgICAgICAgdHlwZTogY2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuY3VyQmFua1BhdHRlcm4gPSBnbEdhbWUuYmFuay5ERVBPU0lUO1xyXG4gICAgICAgIHRoaXMuY3VyQmFua1RleHQgPSB7MDogJ+WtmOWFpScsIDE6ICflj5blh7onfTtcclxuXHJcbiAgICAgICAgdGhpcy5yZXNldERhdGEoKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgICAgIGdsR2FtZS51c2VyLnJlcUdldEJhbmtDb2luKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLy8g5rOo5YaM55WM6Z2i55uR5ZCs5LqL5Lu2XHJcbiAgICByZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwidXBkYXRlVXNlckRhdGFcIiwgdGhpcy51cGRhdGVVc2VyRGF0YSwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub24oXCJ1cGRhdGVCYW5rQ29pblwiLCB0aGlzLnNob3dQYW5lbEluZm8sIHRoaXMpO1xyXG4gICAgICAgIGdsR2FtZS5lbWl0dGVyLm9uKFwidXBkYXRlQmFua1N1Y2Nlc3NcIiwgdGhpcy51cGRhdGVCYW5rU3VjY2VzcywgdGhpcyk7XHJcbiAgICB9LFxyXG4gICAgLy8g6ZSA5q+B55WM6Z2i55uR5ZCs5LqL5Lu2XHJcbiAgICB1blJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwidXBkYXRlVXNlckRhdGFcIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwidXBkYXRlQmFua0NvaW5cIiwgdGhpcyk7XHJcbiAgICAgICAgZ2xHYW1lLmVtaXR0ZXIub2ZmKFwidXBkYXRlQmFua1N1Y2Nlc3NcIiwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOWIt+aWsOeVjOmdouaVsOaNruOAgVVJXHJcbiAgICB1cGRhdGVVc2VyRGF0YSgpIHtcclxuICAgICAgICB0aGlzLnJlc2V0RGF0YSgpO1xyXG4gICAgICAgIHRoaXMuc2hvd1BhbmVsSW5mbygpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOWIneWni+WMlueVjOmdouaVsOaNrlxyXG4gICAgcmVzZXREYXRhKCkge1xyXG4gICAgICAgIHRoaXMuZ29sZCA9IGdsR2FtZS51c2VyLmdldChcImNvaW5cIik7XHJcbiAgICAgICAgdGhpcy5iYW5rZ29sZCA9IGdsR2FtZS51c2VyLmdldChcImJhbmtfY29pblwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8g5pi+56S655WM6Z2i5L+h5oGvXHJcbiAgICBzaG93UGFuZWxJbmZvKCkge1xyXG4gICAgICAgIHRoaXMubGFiX215Y29pbi5zdHJpbmcgPSB0aGlzLmdldEZpeE51bWJlcih0aGlzLmdvbGQpO1xyXG4gICAgICAgIHRoaXMubGFiX2Jhbmtjb2luLnN0cmluZyA9IHRoaXMuZ2V0Rml4TnVtYmVyKHRoaXMuYmFua2dvbGQpO1xyXG4gICAgICAgIHRoaXMubGFiX3N1bmNvaW4uc3RyaW5nID0gZ2xHYW1lLnVzZXIuY3V0RmxvYXQodGhpcy5nb2xkICsgdGhpcy5iYW5rZ29sZCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2F2ZWdvbGQuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB0aGlzLnByb2dyZXNzLnByb2dyZXNzID0gMC4wMTtcclxuICAgICAgICB0aGlzLnByb2dyZXNzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzbGlkZXJcIikuZ2V0Q29tcG9uZW50KGNjLlNsaWRlcikucHJvZ3Jlc3MgPSAwLjAxO1xyXG4gICAgfSxcclxuXHJcbiAgICByZWZyZXNoVWkoKSB7XHJcbiAgICAgICAgdGhpcy5waWNfY29uZmlybVtnbEdhbWUuYmFuay5ERVBPU0lUXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBpY19jb25maXJtW2dsR2FtZS5iYW5rLldJVEhEUkFXXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmN1dHN0YXRlX25vZGVbZ2xHYW1lLmJhbmsuV0lUSERSQVddLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY3V0c3RhdGVfbm9kZVtnbEdhbWUuYmFuay5ERVBPU0lUXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5pc0RlcG9zaXQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmxhYl9jdXRzdGF0ZS5zdHJpbmcgPSB0aGlzLmN1ckJhbmtUZXh0W2dsR2FtZS5iYW5rLldJVEhEUkFXXTtcclxuICAgICAgICAgICAgdGhpcy5waWNfdGl0bGUuc3RyaW5nID0gYCR7dGhpcy5jdXJCYW5rVGV4dFtnbEdhbWUuYmFuay5ERVBPU0lUXX3mr5Tkvos6YDtcclxuICAgICAgICAgICAgdGhpcy5waWNfY29uZmlybVtnbEdhbWUuYmFuay5ERVBPU0lUXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmN1dHN0YXRlX25vZGVbZ2xHYW1lLmJhbmsuREVQT1NJVF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNXaXRoZHJhdygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFiX2N1dHN0YXRlLnN0cmluZyA9IHRoaXMuY3VyQmFua1RleHRbZ2xHYW1lLmJhbmsuREVQT1NJVF07XHJcbiAgICAgICAgICAgIHRoaXMucGljX3RpdGxlLnN0cmluZyA9IGAke3RoaXMuY3VyQmFua1RleHRbZ2xHYW1lLmJhbmsuV0lUSERSQVddfeavlOS+izpgO1xyXG4gICAgICAgICAgICB0aGlzLnBpY19jb25maXJtW2dsR2FtZS5iYW5rLldJVEhEUkFXXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmN1dHN0YXRlX25vZGVbZ2xHYW1lLmJhbmsuV0lUSERSQVddLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVCYW5rU3VjY2VzcygpIHtcclxuICAgICAgICBnbEdhbWUuYXVkaW8ucGxheVNvdW5kRWZmZWN0KHRoaXMuYXVkaW9fc2FmZWJveCwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVFZGl0Ym94KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZUVkaXRib3goKSB7XHJcbiAgICAgICAgdGhpcy5zYXZlZ29sZC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSAwLjAxO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3Mubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNsaWRlclwiKS5nZXRDb21wb25lbnQoY2MuU2xpZGVyKS5wcm9ncmVzcyA9IDAuMDE7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiY29uZmlybVwiOiB0aGlzLmNsaWNrX2NvbmZpcm0oKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidG5feGdieGdtbV9ncnp4XCI6IHRoaXMuY2xpY2tfbW9kaWZ5cHN3KCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2RlcG9zaXRcIjogdGhpcy5jbGlja19EZXBvc2l0KCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX3dpdGhkcmF3blwiOiB0aGlzLmNsaWNrX1dpdGhkcmF3KCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnRuX2NvaW5tYXhcIjogdGhpcy5jbGlja19jb2luTWF4KCk7IGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOWtmOasvuaooeW8j1xyXG4gICAgaXNEZXBvc2l0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1ckJhbmtQYXR0ZXJuID09PSBnbEdhbWUuYmFuay5ERVBPU0lUO1xyXG4gICAgfSxcclxuICAgIC8vIOWPluWHuuaooeW8j1xyXG4gICAgaXNXaXRoZHJhdygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJCYW5rUGF0dGVybiA9PT0gZ2xHYW1lLmJhbmsuV0lUSERSQVc7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsaWNrX0RlcG9zaXQoKSB7XHJcbiAgICAgICAgdGhpcy5zYXZlZ29sZC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2F2ZWdvbGQucGxhY2Vob2xkZXIgPSBnbEdhbWUudGlwcy5CQU5LLlNBVkVQTEFDRUhPTERFUjtcclxuICAgICAgICB0aGlzLnByb2dyZXNzLnByb2dyZXNzID0gMC4wMTtcclxuICAgICAgICB0aGlzLnByb2dyZXNzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzbGlkZXJcIikuZ2V0Q29tcG9uZW50KGNjLlNsaWRlcikucHJvZ3Jlc3MgPSAwLjAxO1xyXG4gICAgICAgIHRoaXMuY3VyQmFua1BhdHRlcm4gPSBnbEdhbWUuYmFuay5ERVBPU0lUO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsaWNrX1dpdGhkcmF3KCkge1xyXG4gICAgICAgIHRoaXMuc2F2ZWdvbGQuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNhdmVnb2xkLnBsYWNlaG9sZGVyID0gZ2xHYW1lLnRpcHMuQkFOSy5UQUtFUExBQ0VIT0xERVI7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyA9IDAuMDE7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic2xpZGVyXCIpLmdldENvbXBvbmVudChjYy5TbGlkZXIpLnByb2dyZXNzID0gMC4wMTtcclxuICAgICAgICB0aGlzLmN1ckJhbmtQYXR0ZXJuID0gZ2xHYW1lLmJhbmsuV0lUSERSQVc7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xpY2tfY29pbk1heCgpe1xyXG4gICAgICAgIHRoaXMuc2F2ZWdvbGQuc3RyaW5nID0gdGhpcy5nZXRGaXhOdW1iZXIodGhpcy5pc0RlcG9zaXQoKSA/IHRoaXMuZ29sZCA6IHRoaXMuYmFua2dvbGQpO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSAxO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3Mubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNsaWRlclwiKS5nZXRDb21wb25lbnQoY2MuU2xpZGVyKS5wcm9ncmVzcyA9IDE7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uU2xpZGVyUHJvY2Vzcyhub2RlLCBwcm9jZXNzKSB7XHJcbiAgICAgICAgbGV0IG5hbWUgPSBub2RlLm5hbWU7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzbGlkZXJcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyA9IHByb2Nlc3MgPT0gMCA/IDAuMDEgOiBwcm9jZXNzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNEZXBvc2l0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVnb2xkLnN0cmluZyA9IHRoaXMuZ2V0Rml4TnVtYmVyKHByb2Nlc3MgKiB0aGlzLmdvbGQpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZWdvbGQuc3RyaW5nID0gdGhpcy5nZXRGaXhOdW1iZXIocHJvY2VzcyAqIHRoaXMuYmFua2dvbGQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkVkaXRCb3gobm9kZSkge1xyXG4gICAgICAgIGxldCBudW1Hb2xkID0gdGhpcy5pc0RlcG9zaXQoKSA/IHRoaXMuZ29sZCA6IHRoaXMuYmFua2dvbGQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLov5nmmK/lvZPliY3kuKTkuKrlj4LmlbDnmoTlpKflsI9cIixOdW1iZXIodGhpcy5zYXZlZ29sZC5zdHJpbmcpLG51bUdvbGQpXHJcbiAgICAgICAgaWYgKE51bWJlcih0aGlzLnNhdmVnb2xkLnN0cmluZykgPiAwICYmIG51bUdvbGQgPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBwcm9jZXNzID0gTnVtYmVyKHRoaXMuc2F2ZWdvbGQuc3RyaW5nKSAvIChudW1Hb2xkIC8gMTAwKTtcclxuICAgICAgICAgICAgaWYgKE51bWJlcih0aGlzLnNhdmVnb2xkLnN0cmluZykgKiAxMDAgPj0gbnVtR29sZCkge1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLmlzRGVwb3NpdCgpID8gdGhpcy5jbGlja19EZXBvc2l0TWF4KCkgOiB0aGlzLmNsaWNrX1dpdGhkcmF3TWF4KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrX2NvaW5NYXgoKTtcclxuICAgICAgICAgICAgICAgIHByb2Nlc3MgPSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyA9IHByb2Nlc3M7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzbGlkZXJcIikuZ2V0Q29tcG9uZW50KGNjLlNsaWRlcikucHJvZ3Jlc3MgPSBwcm9jZXNzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zYXZlZ29sZC5zdHJpbmcuc3Vic3RyKDAsIDEpID09PSAnMCcpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVnb2xkLnN0cmluZyA9IE51bWJlcih0aGlzLnNhdmVnb2xkLnN0cmluZykudG9TdHJpbmcoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzbGlkZXJcIikuZ2V0Q29tcG9uZW50KGNjLlNsaWRlcikucHJvZ3Jlc3MgPSAwLjAxO1xyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzLnByb2dyZXNzID0gMC4wMTtcclxuICAgICAgICAgICAgdGhpcy5zYXZlZ29sZC5zdHJpbmcgPSAnJztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGdldEZpeE51bWJlcih2YWx1ZSkge1xyXG4gICAgICAgIGxldCB2YWx1ZTEgPSBOdW1iZXIodmFsdWUpLmRpdigxMCk7XHJcbiAgICAgICAgdmFsdWUgPSBOdW1iZXIodmFsdWUpLmRpdigxMDApO1xyXG4gICAgICAgIGlmIChpc05hTih2YWx1ZSkpIHJldHVybjtcclxuICAgICAgICBpZiAofn52YWx1ZSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh+fnZhbHVlMSA9PT0gdmFsdWUxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b0ZpeGVkKDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b0ZpeGVkKDIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuXHJcbiAgICBjbGlja19tb2RpZnlwc3coKSB7XHJcbiAgICAgICAgZ2xHYW1lLnBhbmVsLnNob3dQYW5lbEJ5TmFtZShcImJhbmttb2RpZnlwc3dcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOaPkOS6pOmTtuihjOaTjeS9nOWIsOacjeWKoeWZqFxyXG4gICAgY2xpY2tfY29uZmlybSgpIHtcclxuICAgICAgICBpZih0aGlzLnNhdmVnb2xkLnN0cmluZy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcCh0aGlzLmlzRGVwb3NpdCgpPyBnbEdhbWUudGlwcy5CQU5LLlNBVkVaRVJPIDogZ2xHYW1lLnRpcHMuQkFOSy5UQUtFWkVSTyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIS9eXFxkKyhcXC5cXGR7MCwyfSk/JC8udGVzdCh0aGlzLnNhdmVnb2xkLnN0cmluZykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdsR2FtZS5wYW5lbC5zaG93RXJyb3JUaXAodGhpcy5pc0RlcG9zaXQoKT8gZ2xHYW1lLnRpcHMuQkFOSy5TQVZFRVJST1IgOiBnbEdhbWUudGlwcy5CQU5LLlRBS0VFUlJPUik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzYXZlZ29sZCA9IDA7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuc2F2ZWdvbGQuc3RyaW5nLmluZGV4T2YoJy4nKSAhPSAtMSlcclxuICAgICAgICAvLyAgICAgc2F2ZWdvbGQgPSBOdW1iZXIodGhpcy5zYXZlZ29sZC5zdHJpbmcucmVwbGFjZSgnLicsICcnKSk7XHJcbiAgICAgICAgLy8gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIHNhdmVnb2xkID0gTnVtYmVyKHRoaXMuc2F2ZWdvbGQuc3RyaW5nKS5tdWwoMTAwKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgc2F2ZWdvbGQgPSBOdW1iZXIodGhpcy5zYXZlZ29sZC5zdHJpbmcpLm11bCgxMDApO1xyXG4gICAgICAgIGlmIChzYXZlZ29sZCA8PSAwKSByZXR1cm4gZ2xHYW1lLnBhbmVsLnNob3dFcnJvclRpcCh0aGlzLmlzRGVwb3NpdCgpID8gZ2xHYW1lLnRpcHMuQkFOSy5TQVZFTElUVExFIDogZ2xHYW1lLnRpcHMuQkFOSy5UQUtFTElUVExFKTtcclxuICAgICAgICBpZiAoc2F2ZWdvbGQgPiAodGhpcy5pc0RlcG9zaXQoKSA/IHRoaXMuZ29sZCA6IHRoaXMuYmFua2dvbGQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnbEdhbWUucGFuZWwuc2hvd0Vycm9yVGlwKHRoaXMuaXNEZXBvc2l0KCkgPyBnbEdhbWUudGlwcy5CQU5LLlNBVkVNVUNIIDogZ2xHYW1lLnRpcHMuQkFOSy5UQUtFTVVDSCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzRGVwb3NpdCgpKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS51c2VyLnJlcUJhbmtTYXZlKHNhdmVnb2xkKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNXaXRoZHJhdygpKSB7XHJcbiAgICAgICAgICAgIGdsR2FtZS5wYW5lbC5zaG93UGFuZWxCeU5hbWUoXCJiYW5rcGFzc3dvcmRcIikudGhlbihwYW5lbCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NyaXB0ID0gcGFuZWwuZ2V0Q29tcG9uZW50KHBhbmVsLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgc2NyaXB0LnNldENvbmZpcm1OZXh0KChwYXNzd29yZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsR2FtZS51c2VyLnJlcUJhbmtUYWtlT3V0KHNhdmVnb2xkLCBwYXNzd29yZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5SZWdpc3RlckV2ZW50KCk7XHJcbiAgICB9LFxyXG59KSJdfQ==