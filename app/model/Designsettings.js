Ext.define('Dragndrop.model.Designsettings',{
    extend: 'Ext.data.Model',
        config: {
            fields: [
                {name: 'ids', type: 'auto'},
                {name: 'imagetoggle', type: 'boolean'},
                {name: 'zoom', type: 'boolean'},
                {name: 'comment', type: 'boolean'},
                {name: 'other', type: 'boolean'}

            ]

    }
});

