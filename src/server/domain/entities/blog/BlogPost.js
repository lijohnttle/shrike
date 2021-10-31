class BlogPost {
    constructor({ id, title, description, content, createdOn, updatedOn, publishedOn }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.content = content;
        this.createdOn = createdOn;
        this.updatedOn = updatedOn;
        this.publishedOn = publishedOn;
    }
};


export {
    BlogPost
};
