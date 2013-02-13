var category1 = null;
var category2 = null;
var category3 = null;
var category4 = null;
var category5 = null;
var category6 = null;

Ext.define('Dragndrop.view.PositionNews', {
    extend: 'Ext.Panel',
    xtype: 'positions',


    requires: [
        'Ext.TitleBar',
        'Ext.Button'
    ],

    config: {


                id: 'positions',
                title: 'Welcome',
                iconCls: 'home',
                action: 'onPosNewsInit',
                styleHtmlContent: true,
                scrollable: 'vertical',

        layout: {
                    type: 'vbox',
                    align: 'stretch'
                },

                items: [

                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Plasser kategoriene',
                        items : [
                            {

                                id: 'backButton2',
                                align: 'left',
                                // layout: 'fit',
                                // docked: 'bottom',
                                iconCls: 'arrow_left',
                                iconMask: true,
                                ui: 'action',
                        //        text: 'Back',
                                action: 'onBackButton2Tap'
                                //  width: '50%',
                                //  html: 'Lagre settings'
                                //Store instance here. And items are in array, not Object
                            },
                            {

                                id: 'saveConfirm',
                                align: 'right',
                                ui: 'action',
                                // layout: 'fit',
                                // docked: 'bottom',
                                iconCls: 'action',
                                iconMask: true,
                      //          text: 'Lagre',
                                action: 'onSaveButtonTap'
                                //  width: '50%',
                                //  html: 'Lagre settings'
                                //Store instance here. And items are in array, not Object
                            }]
                    },
                    {
                        xtype:'container',
                        docked: 'top',
                        html: '<p style="padding: 5px; padding-left: 21px; font-size: .8em;">Velg kategorier:</p>'
                    } ,

                    {
                        id: 'draggsCnt',
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            align: 'center'
                        },

                        style: 'padding: 2px; border: 2px dashed #666; border-radius: 10px;',
                        docked: 'top',
                     //   action: 'onDraggsCntInit',

                        items: [
                            {
                                xtype: 'container',
                                cls: 'dmb',
                                id: 'drag1',
                                /* initialize: function() {

                                 }, */
                                listeners: {
                                    painted: function(){
                                        this.relayEvents(this.element, ['tap']);
                                    }
                                },
                                style: 'height: 5em; background-color: #999;border: 1px solid #000000;',
                                padding: 5,
                                html: 'clear',
                                action: 'dragContainer',
                                flex: 1

                            },
                            {
                                xtype: 'container',
                                cls: 'dmb',
                                id: 'drag2',
                                /* initialize: function() {

                                 }, */
                                listeners: {
                                    painted: function(){
                                        this.relayEvents(this.element, ['tap']);
                                    }
                                },
                                style: 'height: 5em; background-color: #999;border: 1px solid #000000;',
                                padding: 5,
                                html: 'clear',
                                action: 'dragContainer',
                                flex: 1
                            },

                            {
                                xtype: 'container',
                                cls: 'dmb',
                                id: 'drag3',
                                style: 'height: 5em; background-color: #999;border: 1px solid #000000;',
                                padding: 5,
                                html: 'clear',
                                /* initialize: function() {

                                 }, */
                                listeners: {
                                    painted: function(){
                                        this.relayEvents(this.element, ['tap']);
                                    }
                                },
                                action: 'dragContainer',
                                flex: 1
                            },
                            {
                                xtype: 'container',
                                cls: 'dmb',
                                id: 'drag4',
                                style: 'height: 5em; background-color: #999;border: 1px solid #000000;',
                                padding: 5,

                                html: 'clear',
                                /* initialize: function() {

                                 }, */
                                listeners: {
                                    painted: function(){
                                        this.relayEvents(this.element, ['tap']);
                                    }
                                },
                                action: 'dragContainer',
                                flex: 1
                            },
                            {
                                xtype: 'container',
                                cls: 'dmb',
                                id: 'drag5',
                                style: 'height: 5em; background-color: #999;border: 1px solid #000000;',
                                padding: 5,
                                /* initialize: function() {

                                 }, */
                                listeners: {
                                    painted: function(){
                                        this.relayEvents(this.element, ['tap']);
                                    }
                                },
                                html: 'clear',
                                action: 'dragContainer',
                                flex: 1
                            },
                            {
                                xtype: 'container',
                                /* initialize: function() {

                                 }, */
                                listeners: {
                                    painted: function(){
                                        this.relayEvents(this.element, ['tap']);
                                    }
                                },
                                cls: 'dmb',
                                id: 'drag6',
                                style: 'height: 5em; background-color: #999; border: 1px solid #000000;',
                                padding: 5,
                                html: 'clear',
                                action: 'dragContainer',
                                flex: 1
                            }
                        ]
                    },


                   {
                       xtype: 'container',


                   items: [
                       {
                           xtype: 'container',
                           html: 'Plasser kategoriene her'
                       },
                    {
                        xtype: 'container',
                        layout: {
                            type:'hbox'
                        },
                       defaults: {
                            cls: 'drop',
                           /* initialize: function() {

                            }, */
                           listeners: {
                               painted: function(){
                                   this.relayEvents(this.element, ['tap']);
                               }
                           }
                        },
                        items: [
                            {
                                id: 'dropCnt',
                                xtype: 'container',

                                style: 'background-color: #1E90FF; border-radius: 7px; color: white; text-align: center;',
                                margin: 5,
                                flex: 1,
                                action: 'dropContainer',
                                height: 100,
                                html: 'Kategori 1'
                            },{
                                id: 'dropCnt2',
                                xtype: 'container',


                                style: 'background-color: #901EFF; border-radius: 7px; color: white; text-align: center',

                                margin: 5,
                                flex: 1,
                                action: 'dropContainer',
                                height: 100,
                                html: 'Kategori 2'
                            }]
                    },
                    {   defaults: {
                        cls: 'drop'
                    },
                        xtype: 'container',
                        layout: {
                            type:'hbox'
                        },
                        items: [{
                            id: 'dropCnt3',
                            xtype: 'container',

                            margin: 5,
                            style: 'background-color: #FF901E; border-radius: 7px; color: white; text-align: center',
                            flex: 1,
                            /* initialize: function() {

                             }, */
                            listeners: {
                                painted: function(){
                                    this.relayEvents(this.element, ['tap']);
                                }
                            },
                            action: 'dropContainer',
                            height: 100,
                            html: 'Kategori 3'
                        },{
                            id: 'dropCnt4',
                            xtype: 'container',
                            margin: 5,
                            style: 'background-color: #90FF1E; border-radius: 7px; color: white; text-align: center',
                            flex: 1,
                            /* initialize: function() {

                             }, */
                            listeners: {
                                painted: function(){
                                    this.relayEvents(this.element, ['tap']);
                                }
                            },
                            action: 'dropContainer',
                            height: 100,
                            html: 'Kategori 4'
                        }]
                    },
                    {
                        defaults: {
                            cls: 'drop'
                        },
                        xtype: 'container',
                        layout: {
                            type:'hbox',
                            pack: 'center'
                        },
                        items: [{
                            id: 'dropCnt5',
                            xtype: 'container',
                            margin: 5,
                            style: 'background-color: #FF1E90; border-radius: 7px; color: white; text-align: center;',
                            flex: 1,
                            /* initialize: function() {

                             }, */
                            listeners: {
                                painted: function(){
                                    this.relayEvents(this.element, ['tap']);
                                }
                            },
                            action: 'dropContainer',
                            height: 100,
                            html: 'Kategori 5'

                        },{
                            id: 'dropCnt6',
                            xtype: 'container',
                            margin: 5,
                            style: 'background-color: #1EFF90; border-radius: 7px; color: white; text-align: center',
                            flex: 1,
                            /* initialize: function() {

                             }, */
                            listeners: {
                                painted: function(){
                                    this.relayEvents(this.element, ['tap']);
                                }
                            },
                            height: 100,
                            action: 'dropContainer',
                            html: 'Kategori 6'
                        }]
                    },
                    {
                        xtype: 'spacer',
                        height: 5
                    },
                    {

                        xtype: 'container',
                        layout: {
                            type:'hbox',
                            pack: 'right'
                        },
                        items: [

                            {
                            xtype: 'button',
                            id: 'saveConfirm2',
                            align: 'right',
                            layout: 'fit',
                                width: 100,
                                ui: 'action',
                            // docked: 'bottom',
                            iconCls: 'action',
                            iconMask: true,
                            text: 'Lagre',

                            action: 'onSaveButtonTap'
                            //  width: '50%',
                            //  html: 'Lagre settings'
                            //Store instance here. And items are in array, not Object
                    }]
                    }
                ]}


                ]
            }

});
