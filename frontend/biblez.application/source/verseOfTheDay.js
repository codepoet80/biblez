enyo.kind({
    name: "Helpers.VerseOfTheDay",
    kind: "Control",
    published: {
        verse: "",
        reference: ""
    },
    events: {
        onGotVotd: ""
    },
    components: [{
            name: "votdWS",
            kind: "WebService",
            url: "https://www.biblegateway.com/usage/votd/rss/votd.rdf?31",
            onSuccess: "votdSuccess",
            onFailure: "votdFail"
        },
        {name: "votdPopup", kind: "Popup", layoutKind: "VFlexLayout", style: "width: 80%;min-height:288px", lazy: false, components: [
			{ content: "Verse of the Day", style: "font-weight:bold;" },
			{ kind: "BasicScroller", flex: 1, components: [
				{ name: "votdText", kind: "HtmlContent", flex: 1, pack: "center", align: "left", style: "text-align: left;padding-top:10px;padding-bottom: 10px" }
			]},
			{ layoutKind: "HFlexLayout", pack: "center", components: [
				{ kind: "Button", caption: "Thanks!", onclick: "votdDismiss" }
			]}
        ]},
    ],

    create: function() {
        this.inherited(arguments);
        enyo.log("Verse of the Day Helper created.");
    },

    getVotd: function() {
        this.$.votdWS.call();
    },

    votdSuccess: function(inSender, inResponse) {
        enyo.log("Got verse of the day!");
        try {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(inResponse, "text/xml");
            var verse = xmlDoc.getElementsByTagName("encoded")[0].textContent;
            verse = verse.trim();
            verse = verse.replace(/&rdquo;/g, "");
            verse = verse.replace(/&ldquo;/g, "");
            verse = verse.split("<br/>");
            this.verse = verse[0];
            this.ref = xmlDoc.getElementsByTagName("title")[1].textContent;
            this.doGotVotd();
        } catch (e) {
            enyo.error("Couldn't parse verse of the day: " + e);
        }
    },

    votdFail: function(inSender, inResponse) {
        enyo.error("Failed to get verse of the day");
    },

    showPopup: function() {
        this.$.votdText.setContent(this.verse + " <br>-" + this.ref);
        this.$.votdPopup.openAtCenter();
    },

    votdDismiss: function() {
        this.$.votdPopup.close();
    }

});