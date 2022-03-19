// pages/data/data.js

import * as inittools from "./chartinit";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        canvas_1: {
            onInit: inittools.canvas_1
        },
        canvas_2: {
            onInit: inittools.canvas_2
        },
        canvas_3: {
            onInit: inittools.canvas_3
        },

        jsc: null,
        czc: null,
        wqc: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var app = getApp();
        this.setData({
            jsc: app.globalData.jsc,
            czc: app.globalData.czc,
            wqc: app.globalData.wqc
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})