
Ext.define('Dragndrop.view.Main',{
    extend:'Ext.Panel',
    xtype:'main',
    layout: 'card',
    fullscreen: true,
    requires:[

    ],
    config: {
            scrollable: 'vertical',


        items: [{
            xtype: 'titlebar',
            title: 'Serienytt.no',
            docked: 'top',
            id: 'newsTitle',
            items: [{
                iconCls: 'settings',
                iconMask: true,
                align: 'left',
                ui: 'action',
                id: 'nextButton',
                action: 'onButtonTap'

            }]
        },{
            styleHtmlContent: true,
            xtype: 'container',
            layout: 'hbox',
            action: 'updateNews',
            id: 'newsCnt',
           /* initialize: function() {

            }, */
            listeners: {
                painted: function(){
                    this.relayEvents(this.element, ['tap']);
                }
            }


        }
        ]
                //Store instance here. And items are in array, not Object

    }
});

