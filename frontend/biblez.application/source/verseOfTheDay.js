enyo.kind({
    name: "Helpers.VerseOfTheDay",
    kind: "Control",
    sender: null,
    published: {
    },

    components: [{
            name: "votdWS",
            kind: "WebService",
            url: "",
            onSuccess: "votdSuccess",
            onFailure: "votdFail"
        },
        {
            kind: "Popup",
            name: "votdPopup",
            lazy: false,
            layoutKind: "VFlexLayout",
            style: "width: 80%;min-height:288px",
            components: [
                { content: "Verse of the Day" },
                {
                    kind: "BasicScroller",
                    flex: 1,
                    components: [
                        { name: "votdText", kind: "HtmlContent", flex: 1, pack: "center", align: "left", style: "text-align: left;padding-top:10px;padding-bottom: 10px" }
                    ]
                },
                {
                    layoutKind: "HFlexLayout",
                    pack: "center",
                    components: [
                        { kind: "Button", caption: "Thanks!", onclick: "votdDismiss" },
                        { kind: "Button", caption: "Later", onclick: "updateCancelClick" }
                    ]
                }
            ]
        },
    ],

    create: function() {
        this.inherited(arguments);
        enyo.log("Verse of the Day Helper created.");
    },

    updateCancelClick: function() {
        this.$.votdPopup.close();
    },
});