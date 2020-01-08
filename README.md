# JS-Magenizer
JS port of Magenizer. https://github.com/profe-ajedrez/Magenizer

Implements Iterator interface over a String for extract data with an array of tokens. The name comes from Mage and tokenizer :)

Given an array of tokens, lets iterate over a String, returning every time the corresponding data between the corresponding tokens.

 Ex.:

 ```javascript
 var raw = 
 "STRANGE Document With Weird LAYOUT" +
 "THIS document is ELECTRONIC" +
 "ANDRES REYES" +
 "N°3" +
 "WORK AT: HEROICAL SERVICES FOR FREE," +
 "ADDRESS  :  666, Where The Braves Dies Street, Santiago, Chile." +
 "...Some more of weird strings..."
 options = {
     tokens : {
       name       : {from : "ELECTRONIC",   to : "N\s*\°"},
       doc-number : {from : "N\s*\°",       to : "WORK"},
       job        : {from : "K AT\:",       to : ",\nADDRESS"},
       address    : {from : "ADDRESS\s*\:", to : "\...Some"}
   }
 };

 var mage = Magenizer(raw, options);
 while (mage.valid()) {
     console.log(mage.current());
     mage.next();
 }

 //OUTPUT:
 //------
 //ANDRES REYES
 //3
 // HEROICAL SERVICES FOR FREE
 // 666, Where The Braves Dies Street, Santiago, Chile.
 ```

As you could see in the example, regexr are supported, but without the delimiting _/_ because they are added internally.
