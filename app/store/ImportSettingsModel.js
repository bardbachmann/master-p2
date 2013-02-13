Ext.define('Dragndrop.store.ImportSettingsModel', {
    extend: 'Ext.data.Store',

    config: {
    model: "Dragndrop.model.ImportSettingsModel",
    autoLoad: true,
    id: 'ImportSettings',

    proxy: {
        type: 'jsonp',
        //Generates JSON from a remote RSS-feed
        url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&q=https://dl.dropbox.com/u/19161853/sn_settingstest2.rss',

        //How is the feed read?
        reader: {
            type: 'json',
            //GoogleAPIs generate JSON with the entries at responseData -> feed -> entries.
            rootProperty: 'responseData.feed.entries'
        },
        listeners:{
            exception: function(){
                Ext.Msg.alert("Vi beklager", "<p>Noe har gått feil i nedlastingen av kategorier</p>" +
                    "<p>Er du tilkoblet internett?</p>", Ext.emptyFn);
            }
        }//endreader
    }//endproxy
    }
});//endstore