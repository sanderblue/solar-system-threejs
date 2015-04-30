define(function() {

    var DocumentWriter = {
        /**
         * Writes the passed data to the document.
         */
        write: function(data) {
            document.write(data);
        },

        /**
         * Writes the passed data to the provided element. This method wipes out any previous content,
         * which also removes any event listeners bound to the elements.
         */
        writeTo: function(element, data) {
            element.innerHTML = data;
        },

        /**
         * Writes the passed data to the provided element. If a string is passed, create a text node before appending.
         */
        appendTo: function(element, data) {
            var div = document.createElement('div');
            var content = document.createTextNode(data);

            div.appendChild(content);

            element.appendChild(div);
        }
    };

    return DocumentWriter;
});
