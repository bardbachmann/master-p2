Ext.define('Dragndrop.controller.PositionNews', {
    extend: 'Ext.app.Controller',

    requires: [

    ],

    config: {


        refs: {
            backButton2: '#backButton2',
            posNews: '#positions',
            drag1: '#drag1',
            drag2: '#drag2',
            drag3: '#drag3',
            drag4: '#drag4',
            drag5: '#drag5',
            drag6: '#drag6',
            draggsCnt: '#draggsCnt',
            dropCnt: '#dropCnt',
            dropCnt2: '#dropCnt2',
            dropCnt3: '#dropCnt3',
            dropCnt4: '#dropCnt4',
            dropCnt5: '#dropCnt5',
            dropCnt6: '#dropCnt6',
            saveConfirm: '#saveConfirm'
        },

        control: {
      /*      backbutton: {
                tap: 'onBackButtonTap'
            },
            posNews: {
              initialize: 'onPosNewsInit'
            },
            draggsCnt: {
                initialize: 'onDraggsCntInit'
            },

            dropCnt: {
                initialize: 'onDropCntInit'
            },
            dropCnt2: {
                initialize: 'onDropCntInit2'
            },
            dropCnt3: {
                initialize: 'onDropCntInit3'
            },
            dropCnt4: {
                initialize: 'onDropCntInit4'
            },
            dropCnt5: {
                initialize: 'onDropCntInit5'
            },
            dropCnt6: {
                initialize: 'onDropCntInit6'
            },
      */     /* saveConfirm:{
                tap: 'onButtonTap'
            }*/

        }
    },

    init: function() {
        this.myInternalVar = "Ingen valgt";
        this.selectedCont = "";

        this.control({
            'button[action=onBackButton2Tap]': {
                tap: 'onBackButton2Tap'
            },
            'button[action=onSaveButtonTap]': {
                tap: 'onButtonTap'
            },

            'container[action=dragContainer]': {

                'tap': 'onTap'
            },
            'container[action=dropContainer]': {
                'tap': 'onDrop'
            },

            'positions[action=onPosNewsInit]' : {
                initialize: 'onPosNewsInit'
            }
            /*'container[action=onDraggsCntInit]' : {
                initialize: 'onDraggsCntInit'
            },
            'container[action=onDropCntInit]': {
            initialize: 'onDropCntInit'
            },
            'container[action=onDropCntInit2]': {
                initialize: 'onDropCntInit2'
            },
            'container[action=onDropCntInit3]': {
                initialize: 'onDropCntInit3'
            },
            'container[action=onDropCntInit4]': {
                initialize: 'onDropCntInit4'
            },
            'container[action=onDropCntInit5]': {
                initialize: 'onDropCntInit5'
            },
            'container[action=onDropCntInit6]': {
                initialize: 'onDropCntInit6'
            }
*/
        });
    },




    onTap: function(cnt){
        if(this.selectedCont != ""){
            if(this.selectedCont.getCls() != 'finishedCont'){
            this.selectedCont.setCls('dmb');
            }

        }

        var me = this;
        cmpId = cnt.getTarget().id;
        this.selectedCont = Ext.getCmp(cmpId);
        this.selectedCont.setCls('selectedCont');

        this.myInternalVar = cnt.getTarget().innerText;
    //    console.log(this.myInternalVar);
    },

    onDrop: function(cnt){
        var container = cnt.getTarget().id;
        var contId = Ext.getCmp(container).id;
        var containe = Ext.getCmp(container);



        if(containe.getHtml().indexOf('Kategori') == -1){
            var prevHtml = containe.getHtml();
            if(prevHtml.indexOf(this.getDrag1().getHtml()) != -1){
                  console.log('derz');
                this.getDrag1().setCls('dmb');
                this.getDrag1().setStyle('background-color: #ccc;');}
            else if(prevHtml.indexOf(this.getDrag2().getHtml()) != -1){
                console.log('derz2');
                this.getDrag2().setCls('dmb');
                this.getDrag2().setStyle('background-color: #ccc;');}
            else if(prevHtml.indexOf(this.getDrag3().getHtml()) != -1){
                console.log('derz3');
                this.getDrag3().setCls('dmb');
                this.getDrag3().setStyle('background-color: #ccc;');}
            else if(prevHtml.indexOf(this.getDrag4().getHtml()) != -1){
                console.log('derz4');
                this.getDrag4().setCls('dmb');
                this.getDrag4().setStyle('background-color: #ccc;');}
            else if(prevHtml.indexOf(this.getDrag5().getHtml()) != -1){
                console.log('derz5');
                this.getDrag5().setCls('dmb');
                this.getDrag5().setStyle('background-color: #ccc;');}
            else if(prevHtml.indexOf(this.getDrag6().getHtml()) != -1){
                console.log('derz6');
                this.getDrag6().setCls('dmb');
                this.getDrag6().setStyle('background-color: #ccc;');}


            containe.setHtml('Kategori');
        }



        if(this.selectedCont != ""){


            if(contId == 'dropCnt'){
                this.selectedCont.setStyle('background-color: #1E90FF;');
            }
            else if(contId == 'dropCnt2'){
                this.selectedCont.setStyle('background-color: #901EFF;');
            }
            else if(contId == 'dropCnt3'){
                this.selectedCont.setStyle('background-color: #FF901E;');
            }
            else if(contId == 'dropCnt4'){
                this.selectedCont.setStyle('background-color: #90FF1E;');
            }
            else if(contId == 'dropCnt5'){
                this.selectedCont.setStyle('background-color: #FF1E90;');
            }
            else if(contId == 'dropCnt6'){
                this.selectedCont.setStyle('background-color: #1EFF90;');
            }

        Ext.getCmp(container).setHtml(this.myInternalVar);
            this.selectedCont.setCls('dmb');
            this.selectedCont = "";
     //   console.log(this.myInternalVar);
        }
    },

    onPosNewsInit: function(cnt){
        var designstore = Ext.getStore('Designsettings');
        if(designstore.getAt(0).get('zoom') == true){  this.getPosNews().setCls('larger') }

        var settings = Ext.getStore('Settings');

        var dragCnt = this.getDrag1();
        var dragCnt2 = this.getDrag2();
        var dragCnt3 = this.getDrag3();
        var dragCnt4 = this.getDrag4();
        var dragCnt5 = this.getDrag5();
        var dragCnt6 = this.getDrag6();

        console.log(dragCnt.getHtml());

        settings.each(function(record) {
            var check = true;
            if(record.get("toggle") == true){

                if(dragCnt.getHtml() == 'clear' && check == true){dragCnt.setHtml(record.get('title'));

                check = false;}

                if(dragCnt2.getHtml() == 'clear' && check == true){dragCnt2.setHtml(record.get('title'));

                    check = false;}

                if(dragCnt3.getHtml() == 'clear' && check == true){dragCnt3.setHtml(record.get('title'));

                    check = false;}

                if(dragCnt4.getHtml() == 'clear' && check == true){dragCnt4.setHtml(record.get('title'));

                    check = false;}

                if(dragCnt5.getHtml() == 'clear' && check == true){dragCnt5.setHtml(record.get('title'));

                    check = false;}

                if(dragCnt6.getHtml() == 'clear' && check == true){dragCnt6.setHtml(record.get('title'));

                    check = false;}
            }
        });

        if(dragCnt.getHtml() == 'clear'){
            dragCnt.destroy();
            this.getDropCnt().setHtml('Ingen kategorier valgt.');
        }

        if(dragCnt2.getHtml() == 'clear'){
            dragCnt2.destroy();
         //   this.getDropCnt2().destroy();
        }

        if(dragCnt3.getHtml() == 'clear'){
            dragCnt3.destroy();
         //   this.getDropCnt3().destroy();
        }

       if(dragCnt4.getHtml() == 'clear'){
           dragCnt4.destroy();
        //   this.getDropCnt4().destroy();
       }

        if(dragCnt5.getHtml() == 'clear'){
            dragCnt5.destroy();
          //  this.getDropCnt5().destroy();
        }

        if(dragCnt6.getHtml() == 'clear'){
            dragCnt6.destroy();
          //  this.getDropCnt6().destroy();
        }

    },

    onButtonTap: function(button){
        var settings = Ext.getStore('Settings');


        var dropCnt = this.getDropCnt();
        var string1 = dropCnt.getHtml();
        console.log(dropCnt.getHtml());
       if(this.getDropCnt2() != null){
           var dropCnt2 = this.getDropCnt2();
           var string2 = dropCnt2.getHtml();

       }
        else{var string2 = ""; }


        if(this.getDropCnt3() != null){
            var dropCnt3 = this.getDropCnt3();
            var string3 = dropCnt3.getHtml();

        }
        else{var string3 = ""; }

        if(this.getDropCnt4() != null){
            var dropCnt4 = this.getDropCnt4();
            var string4 = dropCnt4.getHtml();

        }
        else{var string4 = ""; }

        if(this.getDropCnt5() != null){
            var dropCnt5 = this.getDropCnt5();
            var string5 = dropCnt5.getHtml();

        }
        else{var string5 = ""; }

        if(this.getDropCnt6() != null){
            var dropCnt6 = this.getDropCnt6();
            var string6 = dropCnt6.getHtml();

        }
        else{var string6 = ""; }

        console.log(string1 + string2 + string3 + string4 + string5 + string6);

        if(string1.indexOf("Kategori") != -1 && string2.indexOf("Kategori") != -1 && string3.indexOf("Kategori") != -1 && string4.indexOf("Kategori") != -1 && string5.indexOf("Kategori") != -1 && string6.indexOf("Kategori") != -1){
            Ext.Msg.show({
                title   : 'Tilbake til forsiden',
                message     : "<p style='background-color: #ffffff; padding: 10px;'>Sikker på at du vil gå tilbake til forsiden uten å lagre kategoriene?</p>" +
                    "<p style='background-color: #ffffff; padding: 10px;'>Du vil få et standardoppsett.</p>",
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
                        Ext.Viewport.add({
                            xtype: 'main'
                        });

                        Ext.Viewport.setActiveItem(0);

                    }
                    else{

                    }
                    // do some stuff
                }
            });
        }

        else{
            settings.each(function (rec){
            rec.set('placement', null);

        });


                settings.each(function (rec){
                if (string1.indexOf(rec.get('title')) != -1) {
                    rec.set('placement', 1);
                    console.log(rec.get('placement') + ': ' + rec.get('title'));
                }
                if (string2.indexOf(rec.get('title')) != -1) {
                 rec.set('placement', 2);
                    console.log(rec.get('placement') + ': ' + rec.get('title'));
              }

                if (string3.indexOf(rec.get('title')) != -1) {
                    rec.set('placement', 3);
                    console.log(rec.get('placement') + ': ' + rec.get('title'));
                }

                if (string4.indexOf(rec.get('title')) != -1) {
                    rec.set('placement', 4);
                    console.log(rec.get('placement') + ': ' + rec.get('title'));
                }

                if (string5.indexOf(rec.get('title')) != -1) {
                    rec.set('placement', 5);
                    console.log(rec.get('placement') + ': ' + rec.get('title'));
                }

                if (string6.indexOf(rec.get('title')) != -1) {
                    rec.set('placement', 6);
                    console.log(rec.get('placement') + ': ' + rec.get('title'));
                }


            }


        );

        settings.sync();






            Ext.Viewport.removeAll();
            Ext.Viewport.add({
                xtype: 'main'
            });

            Ext.Viewport.setActiveItem(0);


            }

    },

    editString: function(string){
        var textString = string;
        var i = textString.indexOf("innerhtml");
        var j = textString.indexOf('">', i)+2;
        var k = textString.indexOf('</div>');
        textString = textString.substring(j,k);

        return textString;
    },


    onBackButton2Tap: function(button){
        Ext.Msg.show({
            title   : 'Tilbake til kategorivalg?',
            message     : "<p style='background-color: #ffffff; padding: 10px;'>Sikker på at du vil gå tilbake til valg av kategorier?</p>" +
                "<p style='background-color: #ffffff; padding: 10px;'>Ingen endringer vil bli gjort på forsiden før du trykker lagre.</p>",
            buttons : [{
                itemId : 'ok',
                text   : 'Til valg av kategorier',
                ui     : 'action'
            },{
                itemId : 'cancel',
                text   : 'Angre'
            }],
            fn      : function(text,btn) {
                if(text == 'ok'){
                    Ext.Viewport.removeAll();
                    Ext.Viewport.add({
                        xtype: 'CategoryList'
                    });

                    Ext.Viewport.setActiveItem(0);
                }
                else{

                }
                // do some stuff
            }
        });

    }
});