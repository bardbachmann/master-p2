Ext.define('Dragndrop.store.Designsettings', {
    extend: 'Ext.data.Store',

    config: {
        model: 'Dragndrop.model.Designsettings',
        autoLoad: true,

        proxy: {
            //use sessionstorage if need to save data for that
            //specific session only
            type: 'localstorage',
            id  : 'designSettingsKeyTestZ200'
        }//,

     //   data: [{ids: '1', imagetoggle: false, zoom: false}]
    }
});