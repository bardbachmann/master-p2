

Ext.define('Dragndrop.controller.Main', {
    extend: 'Ext.app.Controller',
    
    requires: [

    ],
    
    config: {
        refs: {
            nextButton: '#nextButton',
            newsCnt: '#newsCnt'
        }

        /*,

        control: {
            newsCnt: {
                tap: 'onMyPanelTap'
            }
        }*/
    },

    init: function() {
        this.control({
            'button[action=onButtonTap]': {
                tap: 'onButtonTap'
            },
            'button[action=firstInstall]': {
                tap: 'firstInstall'
            },

            'button[action=toggleZoom]':{
                initialize: 'initZoom',
                tap: 'toggleZoom'
            },
            'button[action=toggleComment]':{
                initialize: 'initComment',
                tap: 'toggleComment'
            },
            'button[action=toggleOther]':{
                initialize: 'initOther',
                tap: 'toggleOther'
            },
            'button[action=toggleImage]':{
                initialize: 'initImage',
                tap: 'toggleImage'
            },
            /*'button[action=editCategories]': {
                tap: 'toEditCategories'
            },*/
            'container[action=updateNews]': {
                initialize: 'updateNews',
                tap: 'onMyPanelTap'
            }

        });
    },
    firstInstall: function(){
        var text = "<p style='background-color: #ffffff; padding: 10px; font-size: 0.9em;'>Dette er en prototype av en nyhetsapplikasjon for Serienytt.no.</p>" +
                "<p style='background-color: #ffffff; padding: 10px;font-size: 0.9em;'>På forsiden ser du nyhetene i flere forskjellige kategorier. Om du trykker på overskriften til en kategori, så får du en lengre liste over nyheter i kategorien. Du kan også trykke direkte på nyheter, så vil du kunne lese de.</p>" +
                "<p style='background-color: #ffffff; padding: 10px;font-size: 0.9em;'>Du kan også endre på hvilke kategorier som velges under Rediger Kategorier. Først velger du kategoriene du ønsker å ha, deretter kan du plassere dem i en tabell ved å trykke på kategoriene øverst på skjermen, så plassere dem i boksene nedenfor.</p>";

        var alertz = Ext.Msg.alert("Hjelp", text);
        alertz.setStyle('background-color: #fff;');

        var viewPortHeight = Ext.Viewport.getWindowHeight();
        var viewPortWidth = Ext.Viewport.getWindowWidth();

        var toolbarHeight = Ext.getCmp('newsTitle').element.getHeight();

        var windowWidth = viewPortWidth / 1.2;
        var windowHeight = viewPortHeight - toolbarHeight;

        alertz.setHeight(windowHeight);
        alertz.setWidth(windowWidth);
        console.log(toolbarHeight);

        alertz.setScrollable(true);

    },
    initImage:  function(){

        var store = Ext.getStore('Designsettings');
        var boolean1 = store.getAt(0).get('imagetoggle');
        console.log(boolean1);
        if(boolean1 === false){
            console.log('TIS FALSE');
            Ext.getCmp('imageToggle').setHtml('Nyhetsbilder  <img src="./resources/images/offtoggle.png">'); }
        else{
            console.log('TIS TRUE');
            Ext.getCmp('imageToggle').setHtml('Nyhetsbilder <img src="./resources/images/ontoggle.png">'); }
    },
    initZoom:  function(){

    var store = Ext.getStore('Designsettings');
    var boolean1 = store.getAt(0).get('zoom');
    console.log(boolean1);
    if(boolean1 === false){
        console.log('TIS FALSE');
        Ext.getCmp('zoomToggle').setHtml('Større font  <img src="./resources/images/offtoggle.png">'); }
    else{
        console.log('TIS TRUE');
        Ext.getCmp('zoomToggle').setHtml('Større font  <img src="./resources/images/ontoggle.png">'); }
},

    initComment:  function(){

        var store = Ext.getStore('Designsettings');
        var boolean1 = store.getAt(0).get('comment');
        console.log(boolean1);
        if(boolean1 === false){
            console.log('Comment - TIS FALSE');
            Ext.getCmp('commentToggle').setHtml('Kommentarer  <img src="./resources/images/offtoggle.png">'); }
        else{
            console.log('Comment - TIS TRUE');
            Ext.getCmp('commentToggle').setHtml('Kommentarer  <img src="./resources/images/ontoggle.png">'); }
    },

    initOther:  function(){

        var store = Ext.getStore('Designsettings');
        var boolean1 = store.getAt(0).get('other');
        console.log("Testing" + boolean1);
        if(boolean1 === false){
            console.log('Other - TIS FALSE');
            Ext.getCmp('otherToggle').setHtml('Andre saker  <img src="./resources/images/offtoggle.png">'); }
        else{
            console.log('Other - TIS TRUE');
            Ext.getCmp('otherToggle').setHtml('Andre saker  <img src="./resources/images/ontoggle.png">'); }
    },

onMyPanelTap: function(a) {
        var newsStorage = Ext.getStore('Settings');
        var table = a.getTarget("table").children[0].children[0].innerText;
        var td = a.getTarget("td").children[0].innerText;
        td = td.replace("...", "");
        var test = "";
    console.log(td);



    Ext.Viewport.mask({ xtype: 'loadmask' });




        // Unmask the formpanel



        if (table) {

             newsStorage.each(function(rec){
             //    console.log(rec.get('title'));
                 if(table.indexOf(rec.get('title')) != -1){

                   //  Ext.Viewport.removeAll();
                 /*    var next = Ext.Viewport.add({
                         xtype: 'articleList'
                     });  */
                   //  console.log(test);
                     var googleUrl = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=http://serienytt.no/' + rec.get('src') + '/feed/';
                     var newsStore = Ext.create('Ext.data.Store', {
                         model:"Dragndrop.model.ArticleModel",
                         autoLoad:true,

                         proxy:{
                             type:'jsonp',
                             url:googleUrl,
                             reader:{
                                 type:'json',
                                 rootProperty:'responseData.feed.entries'
                             }
                         }
                     });

                     newsStore.on('load', function () {  newsStore.each(function(record){


                         console.log();
                       if(td.indexOf(record.get('title')) != -1 || record.get('title').indexOf(td) != -1){

                           var next = Ext.Viewport.add({
                               xtype: 'article'
                           });
                           var ntpage2 = Ext.getCmp('newsContent');

                           //The text for the articles is retrieved from the MainStore.
                           var articleText = record.get('content').toString();

                           var i = 1;
                           var check = true;
                           var x = 1;
                           var y = 1;
                           var z = 1;

                           while (check == true) {
                               x = articleText.indexOf("Les ogs", i);

                               z = articleText.indexOf('</a>', x);

                               if (x != -1) {
                                   var removeText = articleText.substring(x, z + 4);

                                   articleText = articleText.replace(removeText, "");


                               }

                               if (z == -1) {
                                   check = false;
                               }

                               if (x == -1) {
                                   check = false;
                               }

                           }

                           x = 1;
                           z = 1;
                           check = true;

                           //Checks for links and removes them.
                           while (check == true) {
                               x = articleText.indexOf("<a href", i);
                               var x2 = articleText.indexOf("<a title", i);
                               if (x2 > x) {
                                   x = x2;
                               }
                               z = articleText.indexOf('">', x);

                               if (x != -1) {
                                   var removeText = articleText.substring(x, z + 2);
                                   var testText = articleText.substring(x-20, z+2);

                                   articleText = articleText.replace(removeText, "");
                                   articleText = articleText.replace("</a>", "");

                               }

                               if (z == -1) {
                                   check = false;
                               }

                               if (x == -1) {
                                   check = false;
                               }

                           }//End of linkRemovalLoop

                           //Resetting the tempVariables
                           x = 1;
                           z = 1;
                           check = true;

                           //Removal of Divs with specific div styles.
                           while (check == true) {
                               x = articleText.indexOf("div style=", i);
                               y = articleText.indexOf('width:', x + 7);
                               z = articleText.indexOf('"', y);

                               if (x != -1) {
                                   removeText = articleText.substring(x + 3, z + 1);
                                   articleText = articleText.replace(removeText, "");
                               }
                               if (z == -1) {
                                   check = false;
                               }
                               if (x == -1) {
                                   check = false;
                               }
                           }//End of DivRemovalLoop

                           //Resetting the tempVariables
                           x = 1;
                           y = 1;
                           z = 1;
                           check = true;

                           //Checks for Iframes with Youtube links.
                           while (check == true) {
                               x = articleText.indexOf("<iframe", i);
                               var h = articleText.indexOf("src", x);
                               y = articleText.indexOf('</iframe>', x);
                               z = articleText.indexOf('"', h + 5);
                               if (x != -1) {
                                   removeText = articleText.substring(h + 5, z);
                                   var keepSrc = articleText.substring(x, y + 9);
                                   articleText = articleText.replace(keepSrc, 'Watch from YouTube: <a href="' + removeText + '">Link </a>');
                                   console.log(removeText);
                               }
                               if (z == -1) {
                                   check = false;
                               }
                               if (x == -1) {
                                   check = false;
                               }
                           } //End of IframeRemoval


                           var checks = 0;
                           //Replaces a string generated by the RSS with a more relevant string.
                           while (checks != 10) {
                               articleText = articleText.replace('Klikk her for at se den integrerte videoen', 'Videoer er ikke tilgjengelig i appen - se <a href="' + record.get('link') + '">' + record.get('link') + '</a>');
                               checks++;
                           }



                           //The date when the article was published.
                           var dato = record.get('publishedDate').toString();

                           //Dager til norsk
                           dato = dato.replace('Mon', 'Mandag');
                           dato = dato.replace('Tue', 'Tirsdag');
                           dato = dato.replace('Wed', 'Onsdag');
                           dato = dato.replace('Thu', 'Torsdag');
                           dato = dato.replace('Fri', 'Fredag');
                           dato = dato.replace('Sat', 'Lørdag');
                           dato = dato.replace('Sun', 'Søndag');

                           //Måned til norsk
                           dato = dato.replace('Jan', "Januar");
                           dato = dato.replace('Feb', 'Februar');
                           dato = dato.replace('Mar', 'Mars');
                           dato = dato.replace('Apr', 'April');
                           dato = dato.replace('May', 'Mai');
                           dato = dato.replace('Jun', 'Juni');
                           dato = dato.replace('Jul', 'Juli');
                           dato = dato.replace('Aug', 'August');
                           dato = dato.replace('Sep', 'September');
                           dato = dato.replace('Oct', 'Oktober');
                           dato = dato.replace('Nov', 'November');
                           dato = dato.replace('Dec', 'Desember');

                           //Remove time and timezone.
                           dato = dato.substring(0, dato.length - 14);

                           var store = Ext.getStore('Designsettings');


                           //The url for comment RSSes. It is also parsed through the GoogleAPIs to become JSON.
                           var googleUrl = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=' + record.get('link') + 'feed/';

                           //Creates a store with the comments written for each article.
                           var commentStore = Ext.create('Ext.data.Store', {
                               model:"Dragndrop.model.CommentModel",
                               autoLoad:true,

                               proxy:{
                                   type:'jsonp',
                                   url:googleUrl,
                                   reader:{
                                       type:'json',
                                       rootProperty:'responseData.feed.entries'
                                   }
                               }
                           });

                           commentStore.on('load', function () {
                               if(store.getAt(0).get('other') == true){
                               var right = '<div class="articlecomments"><br><h3>Andre saker</h3>';
                               var theCount = 0;
                               newsStore.each(function (records){
                                   if(theCount < 4 && records.get('url') != record.get('url')){
                                       right += '<a href="#"><img src="'+ records.get('url') + '"/>' + '<p>' + records.get('title') +  ' </p></a>';
                                       theCount++;
                                   }

                               });
                               right += '</div>';     }
                               //HTML is created with the content gathered through JSON.
                               var articleHtml = '<div class="articlecomments"><h1>' + record.get('title') + '</h1>' + '<img src="' + record.get('url') + '"/>' +
                                    '<p style="font-size: 0.75em;"><b>Skrevet av:</b> ' + record.get('author') +
                                   '<br><strong>Dato:</strong> ' + dato + '</p>' + articleText + '</div>';

                               //Adds comments to the HTML.
                               if(store.getAt(0).get('comment') == true){

                               articleHtml += '<div class="articlecomments"><h3>Kommentarer:</h3>';

                               var commentz = "";
                               //Parses through the commentStore to add each individual comment.
                               commentStore.each(function (recs) {
                                   commentz += ('<div class="singlecomment">' + '<h4>' + recs.get('author') + '</h4>' + recs.get('content') + '</div>');
                               });
                               if(commentz == ""){commentz = "Ingen kommentarer."}
                               articleHtml += commentz;

                               articleHtml += '</div>';  }

                               if(store.getAt(0).get('zoom') == true){  articleHtml = articleHtml.replace('articlecomments', 'articlecommentslarger'); }
                             //  console.log(articleHtml);
                               //Sets the content for the ArticleView.
                               if(store.getAt(0).get('other') == true){
                               ntpage2.setHtml(articleHtml + right);
                               }
                               else {
                                   ntpage2.setHtml(articleHtml);
                               }
                               var next3 = Ext.Viewport.add({
                                   xtype: 'articleList'
                               });
                               var news = Ext.getCmp('newsList');
                               news.setStore(newsStore);
                               Ext.Viewport.unmask();

                               //   Ext.Viewport.removeAll();
                               Ext.Viewport.setActiveItem(next);

                           });

                       }

                       else if(rec.get('title').indexOf(td) != -1){

                           Ext.Viewport.removeAll();
                           var next = Ext.Viewport.add({
                               xtype: 'articleList'
                           });

                           var news = Ext.getCmp('newsList');
                           var navBar = Ext.getCmp('categoryBar');
                           navBar.setTitle(rec.get('title'));
                           news.setStore(newsStore);
                        //   console.log(newsStore.getCount());
                        //   console.log(rec.get('title'));

                           Ext.Viewport.unmask();
                           Ext.Viewport.setActiveItem(next);

                       }


                     });


                     });

                 //    console.log(rec.get('title'));
                     //  Ext.Viewport.removeAll();
                     /*    var next = Ext.Viewport.add({
                      xtype: 'articleList'
                      });  */
                     //  console.log(test);


                     //  console.log(newsStore.getAt(table.indexOf(rec.get('title'))));
                   /*  newsStore.on('load', function () {
                     var news = Ext.getCmp('newsList');
                     var navBar = Ext.getCmp('categoryBar');
                         navBar.setTitle(rec.get('title'));
                     news.setStore(newsStore);
                     console.log(newsStore.getCount());
                     console.log(rec.get('title'));

                         Ext.Viewport.setActiveItem(next);
                     });*/
                 }
             });





        }
    },

    toggleZoom: function() {
        console.log('hum');
        var store = Ext.getStore('Designsettings');
        if(store.getAt(0).get('zoom') == false){
            Ext.getCmp('zoomToggle').setHtml('Større font  <img src="./resources/images/ontoggle.png">')
            store.getAt(0).set('zoom', true);
            store.sync();

            this.getNewsCnt().setCls('larger');
        }

        else if(store.getAt(0).get('zoom') == true){
            Ext.getCmp('zoomToggle').setHtml('Større font  <img src="./resources/images/offtoggle.png">')
            store.getAt(0).set('zoom', false);
            this.getNewsCnt().setCls('normal');
            store.sync();
        };


    },

    toggleComment: function() {
        var store = Ext.getStore('Designsettings');

        console.log(store.getAt(0).get('comment'));
        if(store.getAt(0).get('comment') == false){
            Ext.getCmp('commentToggle').setHtml('Kommentarer  <img src="./resources/images/ontoggle.png">')
            store.getAt(0).set('comment', true);
            store.sync();

        }

        else if(store.getAt(0).get('comment') == true){
            Ext.getCmp('commentToggle').setHtml('Kommentarer  <img src="./resources/images/offtoggle.png">')
            store.getAt(0).set('comment', false);
            store.sync();
        };


    },

    toggleOther: function() {
        var store = Ext.getStore('Designsettings');

        console.log(store.getAt(0).get('other'));
        if(store.getAt(0).get('other') == false){
            Ext.getCmp('otherToggle').setHtml('Andre saker  <img src="./resources/images/ontoggle.png">')
            store.getAt(0).set('other', true);
            store.sync();

        }

        else if(store.getAt(0).get('other') == true){
            Ext.getCmp('otherToggle').setHtml('Andre saker  <img src="./resources/images/offtoggle.png">')
            store.getAt(0).set('other', false);
            store.sync();
        };


    },

    toggleImage: function() {
        var store = Ext.getStore('Designsettings');
        if(store.getAt(0).get('imagetoggle') == false){
            Ext.getCmp('imageToggle').setHtml('Nyhetsbilder <img src="./resources/images/ontoggle.png">');
            store.getAt(0).set('imagetoggle', true);
            store.sync();
        }

        else if(store.getAt(0).get('imagetoggle') == true){
            Ext.getCmp('imageToggle').setHtml('Nyhetsbilder<img src="./resources/images/offtoggle.png">');
            store.getAt(0).set('imagetoggle', false);
            store.sync();
        }

        Ext.Viewport.removeAll();
        var next = Ext.Viewport.add({
            xtype: 'main'
        });


        Ext.Viewport.setActiveItem(next);

    },

    updateNews: function(){
        var newsStorage = Ext.getStore('Settings');
      var html = "" ;
      var position = false;
      var textArray = [];
        var checking = 1;
        var placement = -1;
        while(checking < 7 && placement == -1){placement =   newsStorage.find("placement", checking);
            checking++;
        }
        console.log(placement);
        checking = 0;
        if(placement == -1){
            newsStorage.findRecord('title', "Alle nyheter").set('placement', 1);
            newsStorage.findRecord('title', "Heads Up").set('placement', 3);
            newsStorage.findRecord('title', "Trailere").set('placement', 5);
            newsStorage.findRecord('title', "Fornying og Kansellering").set('placement', 6);
        }

        /*var has1 = newsStorage.findRecord('placement', 1);
        var has2 = newsStorage.findRecord('placement', 2);
        var has3 = newsStorage.findRecord('placement', 3);
        var has4 = newsStorage.findRecord('placement', 4);
        var has5 = newsStorage.findRecord('placement', 5);
        var has6 = newsStorage.findRecord('placement', 6);
*/
        var designstore = Ext.getStore('Designsettings');
        if(designstore.getAt(0).get('zoom') == true){
            console.log('DERPFACEING');
            this.getNewsCnt().setCls('larger') }

        newsStorage.each(function (rec){
           if(rec.get('placement') != null){


               var newsStore = Ext.create(Ext.data.Store, {
                   model:"Dragndrop.model.ArticleModel",
                       autoLoad:true,
                       proxy:{
                       type:'jsonp',

                           //GoogleAPIs is used to convert RSS to JSON. All Serienytt-categories has it's own feed, which means
                           //we can just insert the correct path to retrive the RSS-data.
                           url:'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=5&q=http://serienytt.no/' + rec.get('src') + '/feed/',
                           reader:{
                           type:'json',
                               rootProperty:'responseData.feed.entries'
                       },
                           listeners:{
                               exception: function(){
                                   Ext.Msg.alert("Vi beklager", "<p>Noe har gått galt i tilkoblingen til nyhetsdatabasen.</p>" +
                                       "<p>Er du tilkoblet internett?</p>", Ext.emptyFn);
                               }
                           }
                           //End Ready
                   }//End Proxy
               });

               var count = 0;
               var text = "";


               newsStore.on('load', function () {
                  /* if(checking == 0) {text += '<div class="columnWrapper">';}*/

                      if(rec.get('placement') == 1 || rec.get('placement') == 2){
                         if(!newsStorage.findRecord('placement', 1) || !newsStorage.findRecord('placement', 2)){
                        //     console.log('derpface');
                             text += '<div class="columnDouble">'; }
                          else {
                             if(rec.get('placement') == 1){
                               text += '<div class="columnWrap"><div class="column">'
                             }
                             else {
                             text += '<div class="column">';
                             }
                         }
                      }

                   else if(rec.get('placement') == 3 || rec.get('placement') == 4){
                       if(!newsStorage.findRecord('placement', 3) || !newsStorage.findRecord('placement', 4)){
                      //     console.log('derpface');
                           text += '<div class="columnDouble">'; }
                       else {
                           if(rec.get('placement') == 3){
                               text += '<div class="columnWrap"><div class="column">'
                           }
                           else {
                               text += '<div class="column">';
                           }
                       }
                   }

                   else if(rec.get('placement') == 5 || rec.get('placement') == 6){
                       if(!newsStorage.findRecord('placement', 6) || !newsStorage.findRecord('placement', 5)){
                           console.log('derpface');
                           text += '<div class="columnDouble">'; }
                       else {
                           if(rec.get('placement') == 5){
                               text += '<div class="columnWrap"><div class="column">'
                           }
                           else {
                               text += '<div class="column">';
                           }
                       }
                   }

                   else {
                          text += '<div class="column">';
                      }

                     if(designstore.getAt(0).get('zoom') == true){ text += '<table><tr class="tableheader"><td><h2 style="color: white; font-size: 1.2em;">' + rec.get('title') + '</td></tr></h2>';     }

                   else{ text += '<table><tr class="tableheader"><td><h2 style="color: white; font-size: 1.0em;">' + rec.get('title') + '</td></tr></h2>';     }
                       var newsCount = 0
                       newsStore.each(function (record){

                       if(count < 6){

                           if(designstore.getAt(0).get('imagetoggle') == true){text += '<tr class="tablerow"><td align="center"><a href='+'#>' + '<img src="' + record.get('url') + '"/><br/><h4>' + record.get('title') + "</h4></a></td></tr>"; }

                           else{
                               if(record.get('title').length < 50){var title = record.get('title');}
                               else{var title = record.get('title').toString().substr(0, 50)+ '...';}
                               text += '<tr class="tablerow"><td><a href='+'#>' + title + "</a></td></tr>";
                           }

                            newsCount++;
                       }
                       });
                      text += '</table></div>';

                   if(rec.get('placement') == 2 || rec.get('placement') == 4 || rec.get('placement') == 6){
                       text+= '</div>';
                   }
/*

                   if(checking == 1){
                      text +=  '</div>'
                   }

                   checking++;
*/


                   textArray[rec.get('placement')] = text;

                  // html += textArray[rec.get('placement')];

                       /*if(rec.get('placement') == 1){
                           text1 += '<h2>' + rec.get('title') + '</h2>';

                           newsStore.each(function (record){

                               text1 += record.get('title') + "</br>";

                           });
                       }

                       if(rec.get('placement') == 2){
                           text2 += '<h2>' + rec.get('title') + '</h2>';

                           newsStore.each(function (record){

                               text2 += record.get('title') + "</br>";

                           });
                       }

                       if(rec.get('placement') == 3){
                           text3 += '<h2>' + rec.get('title') + '</h2>';

                           newsStore.each(function (record){

                               text3 += record.get('title') + "</br>";

                           });
                       }

                       if(rec.get('placement') == 4){
                           text4 += '<h2>' + rec.get('title') + '</h2>';

                           newsStore.each(function (record){

                               text4 += record.get('title') + "</br>";

                           });
                       }

                       if(rec.get('placement') == 5){
                           text5 += '<h2>' + rec.get('title') + '</h2>';

                           newsStore.each(function (record){

                               text5 += record.get('title') + "</br>";

                           });
                       }

                       if(rec.get('placement') == 6){
                           text6 += '<h2>' + rec.get('title') + '</h2>';

                           newsStore.each(function (record){

                               text6 += record.get('title') + "</br>";

                           });
                       }
                       */
                   html = "";

                   textArray.forEach(function(rec){

                        if(count < 6){  html += rec;  count++;}
                   })
                   // html = textArray[1] + textArray[2] + textArray[3] +textArray[4] +textArray[5] + textArray[6];


                       Ext.getCmp('newsCnt').setHtml(html);



           });
           }

        });

     // this.getNewsCnt().setHtml('Dette funker sikkert');
    },


    onButtonTap: function(button){

        if(Ext.getCmp('EditCategory')){
            Ext.getCmp('EditCategory').destroy();
            Ext.getCmp('imageToggle').destroy();
            Ext.getCmp('zoomToggle').destroy();
            Ext.getCmp('otherToggle').destroy();
            Ext.getCmp('commentToggle').destroy();

            Ext.getCmp('firstInstall').destroy();
        }

        var overlay = new Ext.Panel({
            overlay: true,
  // centered: true,
            width: 400,
            height: 400,
            modal: true,
            top: 0,
        left: 0,
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
                    html: 'Hjelp',
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
});