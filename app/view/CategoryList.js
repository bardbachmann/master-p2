Ext.define('Dragndrop.view.CategoryList',{
    extend:'Ext.navigation.View',
    xtype:'CategoryList',
    requires:[
        'Ext.dataview.List',
        'Ext.data.proxy.JsonP',
        'Ext.data.Store',
        'Dragndrop.store.Settings'
    ],
    config: {
        title:'CategoryList',
        iconCls:'star',

        navigationBar : {
            docked : 'top',
            items : [
                {

                    id: 'backButton',
                    align: 'left',
                    ui: 'action',
                    // layout: 'fit',
                    // docked: 'bottom',
                    iconCls: 'arrow_left',
                    iconMask: true,
             //       text: 'Back',
                    action: 'onBackButtonTap2'
                    //  width: '50%',
                    //  html: 'Lagre settings'
                    //Store instance here. And items are in array, not Object
                },
                {

                    id: 'categoryButton',
                    align: 'right',
                    ui: 'action',
                    // layout: 'fit',
                    // docked: 'bottom',
                    iconCls: 'arrow_right',
                    iconMask: true,
               //     text: 'Next',
                    action: 'onCategoryButtonTap'
                    //  width: '50%',
                    //  html: 'Lagre settings'
                    //Store instance here. And items are in array, not Object
                }
            ]
        },
        items:[{
            xtype:'list',
            itemTpl: new Ext.XTemplate(
                '<div class="listcontainer">',
                '<tpl for=".">',

                '{title}',
                '<tpl if="toggle == true">',
                '<img src="./resources/images/ontoggle.png">',
                '</tpl>',
                '<tpl if="toggle == false || toggle == null">',
                '<img src="./resources/images/offtoggle.png"">',
                '</tpl></tpl></div>'

            ),
            id: 'TheList',
            title:'Velg kategorier',
            store: 'Settings',
            grouped: true,
            action: 'selectListItem',
            listeners: {
                itemtap: function(record, index, item, e) {
                    setTimeout(function(){record.deselect(index);},500);
                }
            },
            items: {
                xtype: 'container',
                layout: 'hbox',
                style: 'background-color: #ccc',
                docked: 'bottom',
                items:[{xtype: 'spacer'},{
                xtype: 'button',
                text: 'Videre',


                align: 'right',
                ui: 'action',
                // layout: 'fit',
                // docked: 'bottom',
                iconCls: 'arrow_right',
                iconMask: true,
                //     text: 'Next',
                action: 'onCategoryButtonTap'
            }   ]  }
        }
            ]
    }
});