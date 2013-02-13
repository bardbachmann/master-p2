
Ext.define('Dragndrop.view.ArticleList',{
    extend:'Ext.navigation.View',
    xtype:'CategoryList',
    requires:[
        'Ext.dataview.List',
        'Ext.data.proxy.JsonP',
        'Ext.data.Store'

    ],

    xtype:'articleList',
    layout: 'fit',
    fullscreen: true,
    onReady: function(){
        document.addEventListener("backbutton", backKeyDown, true);
        function backKeyDown() {
            Ext.Viewport.removeAll();
            var back = Ext.Viewport.add({
                xtype: 'main'
            });

            Ext.Viewport.setActiveItem(back);
            alert('go back!');
        }
    },
    requires:[

    ],
    config: {
        navigationBar : {
            id: 'categoryBar',
            docked : 'top',
            items : [
                {

                    id: 'backButton',
                    align: 'left',
                    // layout: 'fit',
                    // docked: 'bottom',
                    iconCls: 'arrow_left',
                    iconMask: true,
       //             text: 'Back',
                    ui: 'action',
                    action: 'onBackButtonTap'
                    //  width: '50%',
                    //  html: 'Lagre settings'
                    //Store instance here. And items are in array, not Object
                }
            ]
        },

        items: [{
            styleHtmlContent: true,
            xtype: 'list',
            action: 'newsList',

           // height: '100% !auto important',
            id: 'newsList',
            title: 'Nyheter',
            itemId: 'Meh',
            itemTpl: new Ext.XTemplate('<h3>{title}</h3><p>{contentSnippet}</p>'),
            listeners: {
                itemtap: function(record, index, item, e) {
                    setTimeout(function(){record.deselect(index);},500);
                }
            }/*,
            store: {

                    model:"Dragndrop.model.ArticleModel",
                    autoLoad:true,

                    proxy:{
                        type:'jsonp',
                        url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=http://serienytt.no/' + "" + '/feed/',
                        reader:{
                            type:'json',
                            rootProperty:'responseData.feed.entries'
                        }
                    }

            }*/,
            listeners: {/*

             element : 'element',
             delegate : 'table',
             tap : function(e) {
             e.stopEvent();

             console.log(e);
             }

             */
            }


        }
        ]
        //Store instance here. And items are in array, not Object

    }
});

