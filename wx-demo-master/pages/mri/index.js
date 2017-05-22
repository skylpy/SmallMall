// pages/mri/index.js
Page({
  data: {
    queValue: '',
    checkList: [],
    hideQueModal: true,
    diseaseIndex: 0,
    defaultAvatar: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/dpp/pic/item/3812b31bb051f8194d290e06d2b44aed2e73e76a.jpg',
    dialogList: [{
      "title":"点击右下角告诉我哪里不舒服",
      "content":"评价小医",
      "logo":"https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/dpp/pic/item/3812b31bb051f8194d290e06d2b44aed2e73e76a.jpg",
      "tailText":"以上结果基于互联网大数据分析得出，仅供参考，如遇不适请及时到正规医院就医。",
      "suggestionTitle" : "健康建议", // 新增From V2.9.5
      "rmdDoctorTitle" : "优质医生", // 新增From V2.9.5
      "option":{
      "感冒":"感冒displayName","感冒1":"感冒1displayName",//不确定选项的key为：notSure
      },
      "optionOrder":["感冒","感冒1"],
      "result":[
          {
              "diseaseName":"川崎病",
              "num":"122",//相关咨询数量
              "percent": 0.6,//概率
              "text":"美研疾病描述",
              "url":"yi.baidu.com/wise/disease/index?diseaseName=糖尿病",
              "recommendDoctor": [], // 格式参考 /patapp/doctor/recommend 正常返回信息的data节点
              "diseaseSuggestion": "asdfasdfasd" // 可能为空
          },
          {
              "diseaseName":"高血压",
              "num":"122",
              "percent": 0.4,
              "text":"美研疾病描述",
              "url":"yi.baidu.com/wise/disease/index?diseaseName=糖尿病",
              // 新增From V2.9.5
              "recommendDoctor": [], // 格式参考 /patapp/doctor/recommend 正常返回信息的data节点
              "diseaseSuggestion": "zxcvlkahsdf" // 可能为空
          },
          {
              "diseaseName":"偏头痛",
              "num":"122",
              "percent": 0.4,
              "text":"美研疾病描述",
              "url":"yi.baidu.com/wise/disease/index?diseaseName=糖尿病",
              // 新增From V2.9.5
              "recommendDoctor": [], // 格式参考 /patapp/doctor/recommend 正常返回信息的data节点
              "diseaseSuggestion": "对应疾病建议" // 可能为空
          }
      ],
      "type": '1001',
    }],
    userInfo: {},
    sessionId: '',
    sessionExt: '',
    scrollTop: 1000,
    disabledList: {},
    showDiaDetail: {},
    dialogFoldList: {}
  },
  onShareAppMessage: function () {
    return {
      title: '智能小e，你身边的私人健康助理',
      desc: '疾病自诊，健康问答，小e为你贴心服务',
      path: '/pages/mri/index'
    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    let self = this;

    wx.getUserInfo({
      success: function(res) {
        self.setData({
          userInfo: res.userInfo
        });
      }
    });
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  newQuestion: function(e) {
    this.setData({
      hideQueModal: false
    });
  },
  bindQueInput: function(e) {
    this.setData({
      queValue: e.detail.value
    });
  },
  queModalConfirm: function(e) {
    let self = this;
    let query = this.data.queValue;

    if (query === '') {
      wx.showToast({
        title: '请输入问题',
        duration: 2000
      });
      return;
    }
    let newQue = {
      title: query,
      content: query,
      type: '0',
      logo: this.data.userInfo.avatarUrl
    };

    self.data.dialogList.push(newQue);

    wx.request({
      url: 'https://docapi.baidu.com/patapp/mri/dialogforwx',
      data: {
        query: query
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.status === 0) {
          let resData = res.data.data;
          let cbDlgList = resData.dialogList;
          self.setData({
            hideQueModal: true,
            dialogList: self.data.dialogList.concat(cbDlgList),
            sessionId: resData.searchSessionId,
            sessionExt: resData.searchSessionExt,
            queValue: ''
          });
        } else {
          wx.showToast({
            title: '网络不给力，请稍候重试',
            icon: 'success',
            duration: 1000
          });
        }
      }
    });
  },
  queModalCancel: function(e) {
    this.setData({
      hideQueModal: true
    });
  },
  radioChange: function(e) {
    let dialogType = e.target.dataset.dialogType;
    let dialogIndex = e.target.dataset.dialogIndex;
    let optionObj = e.target.dataset.optionObj;
    let answer = {};
    let answerValue = e.detail.value;
    answer[answerValue] = optionObj[answerValue];
    this.data.disabledList[dialogIndex] = true;
    this.setData({
      disabledList: this.data.disabledList
    });
    this.submitAnswer(dialogType, optionObj[answerValue], answer);
  },
  checkboxChange: function(e) {
    this.setData({
      checkList: e.detail.value
    });
  },
  bindCheckboxOK: function(e) {
    let dialogType = e.target.dataset.dialogType;
    let dialogIndex = e.target.dataset.dialogIndex;
    let optionObj = e.target.dataset.optionObj;
    let checkList = this.data.checkList;
    let answer = {};
    let answerValue = '';
    let tmp = '';

    for(let i = 0; i < checkList.length; i++) {
      tmp = checkList[i];
      answerValue += (i === 0 ? '' : '，') + optionObj[tmp];
      answer[tmp] = optionObj[tmp];
    }

    this.data.disabledList[dialogIndex] = true;
    this.setData({
      checkList: [],
      disabledList: this.data.disabledList
    });
    this.submitAnswer(dialogType, answerValue, answer);
  },
  bindInfoOK: function(e) {
    let dialogType = e.target.dataset.dialogType;
    let dialogIndex = e.target.dataset.dialogIndex;
    let answer = {};
    let answerValue = '确认';
    answer.confirm = true;
    this.data.disabledList[dialogIndex] = true;
    this.setData({
      disabledList: this.data.disabledList
    });
    this.submitAnswer(dialogType, answerValue, answer);
  },
  submitAnswer: function(dialogType, answerValue, answer) {
    let self = this;
    let newQue = {
      title: answerValue,
      content: answerValue,
      type: '0',
      logo: this.data.userInfo.avatarUrl
    };
  
    self.data.dialogList.push(newQue);
    wx.request({
      url: 'https://docapi.baidu.com/patapp/mri/dialogsubmitforwx',
      data: {
        searchSessionId: self.data.sessionId,
        searchSessionExt: self.data.sessionExt,
        type: dialogType,
        answer: JSON.stringify(answer),
        provId: 1,
        cityId: 1
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.status === 0) {
          let resData = res.data.data;
          let cbDlgList = resData.dialogList;
          self.setData({
            hideQueModal: true,
            sessionExt: resData.searchSessionExt,
            dialogList: self.data.dialogList.concat(cbDlgList)
          });
          self.scrollToEnd();
        } else {
          wx.showToast({
            title: '网络不给力，请稍候重试',
            icon: 'success',
            duration: 1000
          });
        }
      }
    });
  },
  bindDiseaseClick: function(e) {
    let self = this;
    let diseaseName = e.currentTarget.dataset.diseaseName;
    this.setData({
      diseaseIndex: e.currentTarget.dataset.diseaseKey
    });

    wx.request({
      url: 'https://docapi.baidu.com/patapp/search/wxminisearchdisease?',
      data: {
        query: diseaseName
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.status === 0) {
          let newQue = {
            title: diseaseName + '相关',
            content: '',
            type: '2000',
            logo: self.data.defaultAvatar,
            diseaseInfo: res.data.data
          };
          self.data.dialogList.push(newQue);
          self.setData({
            dialogList: self.data.dialogList
          });
          self.scrollToEnd();
        } else {
          wx.showToast({
            title: '网络不给力，请稍候重试',
            icon: 'success',
            duration: 1000
          });
        }
      }
    });
  },
  bindInfoClick: function(e) {
    let self = this;
    let dialogIndex = e.currentTarget.dataset.dialogIndex;
    let infoKey = e.currentTarget.dataset.infoKey;
    self.data.showDiaDetail[dialogIndex] = {};
    self.data.showDiaDetail[dialogIndex][infoKey] = true;
    self.setData({
      showDiaDetail: self.data.showDiaDetail
    });
  },
  scrollToEnd: function() {
    this.setData({
      scrollTop: this.data.scrollTop + 500
    });
  },
  bindSymptomClick: function(e) {
    let self = this;
    let symptom = e.currentTarget.dataset.symptom;
    let symptomKey = e.currentTarget.dataset.symptomKey;
    let newQue = {
      title: symptomKey,
      content: '',
      type: '2001',
      logo: self.data.defaultAvatar,
      symptom: symptom
    };
    self.data.dialogList.push(newQue);
    self.setData({
      dialogList: self.data.dialogList
    });
    self.scrollToEnd();
  },
  bindExamineClick: function(e) {
    let self = this;
    let examine = e.currentTarget.dataset.examine;
    let examineKey = e.currentTarget.dataset.examineKey;
    let newQue = {
      title: examineKey,
      content: '',
      type: '2002',
      logo: self.data.defaultAvatar,
      examine: examine
    };
    self.data.dialogList.push(newQue);
    self.setData({
      dialogList: self.data.dialogList
    });
    self.scrollToEnd();
  }
})