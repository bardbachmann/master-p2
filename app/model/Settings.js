Ext.define('Dragndrop.model.Settings',{
    extend: 'Ext.data.Model',
        config: {
            fields: [
                {name: 'ids', type: 'auto'},
                {name: 'title', type: 'auto'},
                {name: 'toggle', type: 'boolean'},
                {name: 'src', type: 'auto'},
                {name: 'class1', type: 'auto'},
                {name: 'placement', type: 'auto'}

            ]

    }
});

