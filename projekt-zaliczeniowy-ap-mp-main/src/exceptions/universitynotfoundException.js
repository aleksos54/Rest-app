class UniversitynotfoundException extends Error { //tworze klase dziedziczaca po klasie error, rozszerzam klase error
    constructor(message) {
        super(message || "University not found");
        this.status=404
    }

}

module.exports = UniversitynotfoundException;