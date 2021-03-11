class userNotFoundException extends Error { //tworze klase dziedziczaca po klasie error, rozszerzam klase error
    constructor(message) {
        super(message || "user not found");
        this.status=404
    }

}

module.exports = userNotFoundException;