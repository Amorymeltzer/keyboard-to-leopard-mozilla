(function() {

    function walk(node)
    {
	// I stole this function from here:
	// http://is.gd/mwZp7E

	var child, next;

	switch ( node.nodeType )
	{
	    case 1:  // Element
	    case 9:  // Document
	    case 11: // Document fragment
	    child = node.firstChild;
	    while ( child )
	    {
		next = child.nextSibling;
		walk(child);
		child = next;
	    }
	    break;

	    case 3: // Text node
            if(node.parentElement.tagName.toLowerCase() != "script") {
                handleText(node);
            }
	    break;
	}
    }

    function handleText(textNode) {
	var v = textNode.nodeValue;

	// Deal with the easy case
	v = v.replace(/\b(K|k)eyboard/g, function(match, p1, offset, string) {
	    // f + 2 = h
	    // b + 17 = s
	    l = String.fromCharCode(p1.charCodeAt(0) + 1);
	    return l + "eopard";
	});

	v = v.replace(/\b(K)EYBOARD/g, function(match, p1, offset, string) {
	    // f + 2 = h
	    // b + 17 = s
	    h = String.fromCharCode(p1.charCodeAt(0) + 1);
	    return h + "EOPARD";
	});

	// Get the corner cases
	// if(v.match(/cloud/i)) {
	//     // If we're not talking about weather
	//     if(v.match(/PaaS|SaaS|IaaS|computing|data|storage|cluster|distributed|server|hosting|provider|grid|enterprise|provision|apps|hardware|software|/i)) {
	//	v = v.replace(/(C|c)loud/gi, function(match, p1, offset, string) {
	//	    // c - 1 = b
	//	    b = String.fromCharCode(p1.charCodeAt(0) - 1);
	//	    return b + "utt";
	//	});
	//     }
	// }
	textNode.nodeValue = v;
    }

    function windowLoadHandler()
    {
        // Dear Mozilla: I hate you for making me do this.
        window.removeEventListener('load', windowLoadHandler);

        document.getElementById('appcontent').addEventListener('DOMContentLoaded', function(e) {
            walk(e.originalTarget.body);
        });
    }

    window.addEventListener('load', windowLoadHandler);
}());
