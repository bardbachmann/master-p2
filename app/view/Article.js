Ext.define("Dragndrop.view.Article", {
    extend: 'Ext.Panel',
    requires: [

    ],
    layout: 'fit',
    xtype: 'article',
    fullscreen: true,
    /* initialize: function() {

     }, */
    listeners: {
        painted: function(){
            this.relayEvents(this.element, ['tap']);
        }
    },



    config: {
        title: 'Test',
        iconCls: 'tree',
        cls: 'article',
        styleHtmlContent: true,
        scrollable: 'vertical',
        id: 'newsContent',

        xtype: 'container',
        action: 'articleStart',


        html: '<b>Testing</b>',

        items: [
            {
            xtype: 'titlebar',
            docked: 'top',
            title: 'Navigation',


            items: [

                {

                    iconCls: 'arrow_left',
                    iconMask: true,
                    ui: 'action',

                    align: 'left',
                    handler: function() {
                        console.log("Button works!");

                      Ext.Viewport.removeAll();
                        var back = Ext.Viewport.add({
                            xtype: 'main'
                        });

                        Ext.Viewport.setActiveItem(back);


                    }
                }
            ]
        }]


    }



});



