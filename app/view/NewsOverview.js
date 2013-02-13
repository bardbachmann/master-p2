
Ext.define('Dragndrop.view.NewsOverview',{
    extend:'Ext.Panel',
    xtype:'newsOverview',
    requires:[
        'Ext.dataview.List',
        'Ext.data.proxy.JsonP',
        'Ext.data.Store',
        'Dragndrop.store.Settings'
    ],
    config: {
        title:'main',
        iconCls:'star',
        html: 'Testing'
    }
});