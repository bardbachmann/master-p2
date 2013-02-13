Ext.define('Dragndrop.controller.CategoryList', {
    extend: 'Ext.app.Controller',
    
    requires: [

    ],
    
    config: {
        refs: {
            backButton: '#backButton',
            categoryButton: '#categoryButton',
            theList: '#TheList'
        },
        
        control: {
           /* backButton:{
                tap: 'onBackButtonTap'
            },

            categoryButton:{
                tap: 'onCategoryButtonTap'
            },*/

            /*theList: {
                select: function(view, record) {
                    view.deselect(record);
                    var storage = Ext.getStore('Settings');
                    //storage.add({ title: "Mijn Titel", toggle: "false"});

                    var count = 0;

                    storage.findBy(function(rec) {
                        if (rec.get('toggle') == true) {
                            count = count + 1;
                        }
                    });


                    var index = storage.find('title', record.get('title'));
                    var storeRecord = storage.getAt(index);

                    if(storeRecord.get("toggle") == true){storeRecord.set('toggle', false );}
                    else{
                        if(count < 6){storeRecord.set('toggle', true);}
                        else{
                            Ext.Msg.alert("Dessverre", "<p>Du kan ha maksimum 6 kategorier på en gang, av praktiske årsaker.</p><br/>" +
                                "<p>Vennligst skru av en annen kategori om du ønsker denne kategorien.</p>", Ext.emptyFn)
                        }
                    }
                    storeRecord.dirty = true;

                    storage.sync();
                    console.log(count);


                    Ext.getCmp('TheList').setMasked({
                        xtype: 'loadmask',
                        message: 'Lagrer kategorier'
                    });

                    setTimeout(function() {


                        // Unmask the formpanel
                        Ext.getCmp('TheList').unmask();
                    }, 500);
                }
            }*/

        }
    },


    init: function() {
        this.control({
            'button[action=onBackButtonTap2]': {
                tap: 'onBackButtonTap2'
            },
            'button[action=onCategoryButtonTap]': {
                tap: 'onCategoryButtonTap'
            },
            'list[action=selectListItem]':{
                initialize: 'initLists',
                select: 'selectListItem'
            }


        });
    },
    initLists: function(){
        var designstore = Ext.getStore('Designsettings');
        if(designstore.getAt(0).get('zoom') == true){  this.getTheList().setCls('larger') }
    },
    selectListItem: function(view, record) {
        view.deselect(record);
        Ext.getCmp('TheList').setMasked({
            xtype: 'loadmask',
            message: 'Lagrer kategorier'
        });

        var storage = Ext.getStore('Settings');
        //storage.add({ title: "Mijn Titel", toggle: "false"});

        var count = 0;

        storage.findBy(function(rec) {
            if (rec.get('toggle') == true) {
                count = count + 1;
            }
        });


        var index = storage.find('title', record.get('title'));
        var storeRecord = storage.getAt(index);

        if(storeRecord.get("toggle") == true){storeRecord.set('toggle', false );}
        else{
            if(count < 6){storeRecord.set('toggle', true);}
            else{
                Ext.Msg.alert("Dessverre", "<p>Du kan ha maksimum 6 kategorier på en gang, av praktiske årsaker.</p><br/>" +
                    "<p>Vennligst skru av en annen kategori om du ønsker denne kategorien.</p>", Ext.emptyFn)
            }
        }
        storeRecord.dirty = true;

        storage.sync();
        console.log(count);




        setTimeout(function() {


            // Unmask the formpanel
            Ext.getCmp('TheList').unmask();
        }, 500);
    },
    processResult: function(something){
        console.log(something);
    },
    onBackButtonTap2: function(){
        Ext.Msg.show({
            title   : 'Tilbake til forsiden',
            message     : "<p style='background-color: #ffffff; padding: 10px;'>Sikker på at du vil gå tilbake til forsiden uten å lagre kategoriene?</p>" +
                "<p style='background-color: #ffffff; padding: 10px;'>Ingen endringer vil bli lagret.</p>",
            buttons : [{
                itemId : 'ok',
                text   : 'Til forsiden',
                ui     : 'action'
            },{
                itemId : 'cancel',
                text   : 'Angre'
            }],
            fn      : function(text,btn) {
              if(text == 'ok'){
                  Ext.Viewport.removeAll();
                  var back = Ext.Viewport.add({
                      xtype: 'main'
                  });

                  Ext.Viewport.setActiveItem(back);

                  var overlay = new Ext.Panel({
                      overlay: true,
                      // centered: true,
                      width: 400,
                      height: 400,
                      modal: true,
                      hideOnMaskTap: true,
                      layout: 'vbox',
                      scrollable: 'vertical',

                      items: [
                          {
                              xtype: 'container',
                              html: '<h1>Hovedmeny</h1><br/>' +
                                  '<p>Kategorier:</p>',
                              styleHtmlContent: true,
                              cls: 'menuOverlay'
                          },

                          {
                              xtype: 'button',
                              text: 'Rediger kategorier',
                              height: 60,
                              //     action: 'EditCategory',
                              //           ui: 'action',
                              id: 'EditCategory',
                              cls: 'menuOverlay',
                              style: 'margin-left: 15px; margin-right: 15px',
                              listeners: {
                                  tap: function(){
                                      overlay.hide();
                                      Ext.Viewport.removeAll();
                                      var next = Ext.Viewport.add({
                                          xtype: 'CategoryList'});

                                      Ext.Viewport.setActiveItem(next)
                                  }
                              }
                          },
                          {
                              xtype: 'container',
                              html:
                                  '<p>Utseende:</p>',
                              styleHtmlContent: true,
                              cls: 'menuOverlay'
                          },
                          {
                              xtype: 'button',
                              html: 'Nyhetsbilder  <img class="rightImage" src="./resources/images/offtoggle.png">',
                              height: 60,
                              id: 'imageToggle',
                              cls: 'menuOverlay',
                              action: 'toggleImage',
                              style: 'margin-left: 15px; margin-right: 15px'

                          },
                          {
                              xtype: 'spacer',
                              height: 5
                          },
                          {
                              xtype: 'button',
                              height: 60,
                              id: 'zoomToggle',
                              cls: 'menuOverlay',
                              /*listeners: {
                               tap: function() {
                               console.log('hum');
                               var store = Ext.getStore('Designsettings');
                               if(store.getAt(0).get('zoom') == false){
                               Ext.getCmp('zoomToggle').setHtml('Større font  <img src="./resources/images/ontoggle.png">')
                               store.getAt(0).set('zoom', true);
                               store.sync();
                               }

                               else if(store.getAt(0).get('zoom') == true){
                               Ext.getCmp('zoomToggle').setHtml('Større font  <img src="./resources/images/offtoggle.png">')
                               store.getAt(0).set('zoom', false);
                               store.sync();
                               };

                               }
                               },*/
                              action: 'toggleZoom',
                              style: 'margin-left: 15px; margin-right: 15px'

                          },
                          {
                              xtype: 'spacer',
                              height: 5
                          },
                          {
                              xtype: 'button',
                              height: 60,
                              id: 'commentToggle',
                              cls: 'menuOverlay',
                              html: 'Kommentarer  <img class="rightImage" src="./resources/images/offtoggle.png">',
                              action: 'toggleComment',
                              style: 'margin-left: 15px; margin-right: 15px'

                          },
                          {
                              xtype: 'spacer',
                              height: 5
                          },
                          {
                              xtype: 'button',
                              height: 60,
                              id: 'otherToggle',
                              cls: 'menuOverlay',
                              html: 'Andre saker  <img class="rightImage" src="./resources/images/offtoggle.png">',
                              action: 'toggleOther',
                              style: 'margin-left: 15px; margin-right: 15px'

                          },
                          {
                              xtype: 'spacer',
                              height: 5
                          },
                          {
                              xtype: 'container',
                              html:
                                  '<p>Hjelp:</p>',
                              styleHtmlContent: true,
                              cls: 'menuOverlay'
                          },
                          {
                              xtype: 'button',
                              height: 60,
                              id: 'firstInstall',
                              cls: 'menuOverlay',
                              html: 'Hvordan bruke applikasjonen',
                              action: 'firstInstall',
                              style: 'margin-left: 15px; margin-right: 15px'

                          }
                      ]
                  });

                  // Ext.getCmp('zoomToggle').hide();
                  var viewPortHeight = Ext.Viewport.getWindowHeight();
                  var viewPortWidth = Ext.Viewport.getWindowWidth();

                  var toolbarHeight = Ext.getCmp('newsTitle').element.getHeight();

                  var windowWidth = viewPortWidth / 1.2;
                  var windowHeight = viewPortHeight - toolbarHeight;

                  overlay.setHeight(windowHeight);
                  overlay.setWidth(windowWidth);
                  console.log(toolbarHeight);
                  overlay.setLeft((0-10));
                  overlay.setTop((toolbarHeight-10));

                  Ext.Viewport.add(overlay);
              }
                else{

              }
               // do some stuff
             }
            });




    },


    onCategoryButtonTap: function(){

        Ext.Viewport.removeAll();

       /* Ext.Viewport.add({
            xtype: 'positions'
        });
       */
        Ext.Viewport.setActiveItem({
            xtype : 'positions'
        });

    }

});