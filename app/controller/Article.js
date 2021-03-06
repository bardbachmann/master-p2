Ext.define('Dragndrop.controller.Article', {
    extend: 'Ext.app.Controller',
    
    requires: [

    ],
    
    config: {
      /*  refs: {

        },

        control: {
            newsContent: {
                tap: 'articleStart'
            }
        }*/
    },

    init: function() {
        this.control({

            'container[action=articleStart]': {
                initialize: 'testing',
                tap: 'articleStart'
            }

        });
    },

    testing: function(){

    },

articleStart: function(a) {
   // console.log("Hurr");
        var table = a.getTarget("a");
        if (table) {

            var newsStore = Ext.getCmp('newsList').getStore();
            newsStore.each(function(record){
                if(table.children[1].innerText.indexOf(record.get('title')) != -1){

                    var ntpage2 = Ext.getCmp('newsContent');
                    console.log(record);
                    //The text for the articles is retrieved from the MainStore.
                    var articleText = record.get('content').toString();

                    //Temporary variables for parsing through the content strings.

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

                        var right = '<div class="articlecomments"><br><h3>Andre saker</h3>';
                        var theCount = 0;
                        newsStore.each(function (records){
                            if(theCount < 4 && records.get('url') != record.get('url')){
                                right += '<a href="#"><img src="'+ records.get('url') + '"/>' + '<p>' + records.get('title') +  ' </p></a>';
                                theCount++;
                            }

                        });
                        right += '</div>';
                        //HTML is created with the content gathered through JSON.
                        var articleHtml = '<div class="articlecomments"><h1>' + record.get('title') + '</h1>' + '<img src="' + record.get('url') + '"/>' +
                            '<p style="font-size: 0.75em;"><b>Skrevet av:</b> ' + record.get('author') +
                            '<br><strong>Dato:</strong> ' + dato + '</p>' + articleText + '</div>';

                        //Adds comments to the HTML.
                        articleHtml += '<div class="articlecomments"><h3>Kommentarer:</h3>';
                        var commentz = "";
                        //Parses through the commentStore to add each individual comment.
                        commentStore.each(function (recs) {
                            commentz += ('<div class="singlecomment">' + '<h4>' + recs.get('author') + '</h4>' + recs.get('content') + '</div>');
                        });
                        if(commentz == ""){commentz = "Ingen kommentarer."}
                        articleHtml += commentz;

                        articleHtml += '</div>';
                        var store = Ext.getStore('Designsettings');
                        if(store.getAt(0).get('zoom') == true){  articleHtml = articleHtml.replace('articlecomments', 'articlecommentslarger'); }
                        //  console.log(articleHtml);
                        //Sets the content for the ArticleView.
                        ntpage2.setHtml(articleHtml + right);
                        ntpage2.getScrollable().getScroller().scrollTo(0,0);

                        var designstore = Ext.getStore('Designsettings');
                        if(designstore.getAt(0).get('zoom') == true){ }
                        //   Ext.Viewport.removeAll();

                    });
                }
            });

        }
    }

});