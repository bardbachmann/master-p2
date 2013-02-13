Ext.Loader.setConfig({
    enabled: true
});


Ext.application({
    name: 'Dragndrop',

    requires: [
        'Ext.MessageBox',
        'Ext.data.proxy.JsonP',
        'Ext.data.proxy.LocalStorage',
        'Dragndrop.store.Settings'
    ],

    views: ['Main', 'PositionNews', 'NewsOverview', 'CategoryList', 'Article', 'ArticleList'],
    models: ['Settings', 'ImportSettingsModel', 'ArticleModel', 'CommentModel', 'Designsettings'],
    stores: ['Settings', 'ImportSettingsModel', 'Designsettings'],

    controllers: ['Main', 'PositionNews', 'CategoryList', 'ArticleList', 'Article'],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();




        var settingsStore = Ext.create(Ext.data.Store, {
            model: "Dragndrop.model.ImportSettingsModel",
            autoLoad: true,

            proxy: {
                type: 'jsonp',
                //Generates JSON from a remote RSS-feed
                url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&q=https://dl.dropbox.com/u/19161853/sn_settingstest2.rss',

                //How is the feed read?
                reader: {
                    type: 'json',
                    //GoogleAPIs generate JSON with the entries at responseData -> feed -> entries.
                    rootProperty: 'responseData.feed.entries'
                }//endreader
            }//endproxy

        });//endstore

        var settingsStorage = Ext.getStore('Settings');
        //Temporary Array for storage of the category-data.
        var storeArray = [];

        var designStore = Ext.getStore('Designsettings');
        if(designStore.getAt(0) == null){
            var ids = 1;
            var imagetoggle = false;
            var zoom = false;
            var comment = true;
            var other = true;
            designStore.add({ids: ids, imagetoggle: imagetoggle, zoom: zoom,  comment: comment, other: other});
            designStore.sync();

        }
        console.log(designStore.getAt(0));
        //When the online settings store is loaded, it is parsed through it to add into the local storage.
        settingsStore.on('load', function() {
                //This is done through a for each-loop of all the entries in the online storage.
                settingsStore.each(function (recs){
                    //GoogleAPIS requires specific tags to get the content through, so these are here converted to more logical names.
                    var ids = recs.get('content');          //Specific ID for the entry
                    var title = recs.get('title');          //The title of the category
                    var toggle = recs.get('contentSnippet');//Is the category toggled on or off?
                    var src = recs.get('link');             //The URI required to find the specific RSS-stream.
                    var classField = recs.get('author');    //Class-system to easily sort the categories.

                    //All of these values are added to the temporary array.
                    storeArray.push({ids: ids, title: title, toggle: toggle, src: src, class1: classField })
                });//endEachParsing

                //The temporary array is then parsed through to synchronize with the local storage.
                storeArray.forEach(function (record){
                    //Parse through the IDs to check for existing entries.
                    var test = settingsStorage.findBy(function (storeRec){
                        //If the  ID already exists, return true
                        if(record.ids == storeRec.get('ids')){
                            return true;
                        }//endIfCheck

                        //Else false
                        else{
                            return false;
                        }//endElseCheck


                    });//EndFindBy

                    //Checks if the test value exists, if not it will add the record to the store.
                    if(test == -1){
                        settingsStorage.add(record);
                    }//End testCheck
                    console.log(settingsStorage.data);

                });//End TemporaryArray ForEach

                //Synchronize the localstorage
                settingsStorage.sync();
            console.log(settingsStorage);


            Ext.Viewport.add(Ext.create('Dragndrop.view.Main'));
        });
            },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
