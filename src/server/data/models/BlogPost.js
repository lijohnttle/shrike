class BlogPost {
    constructor(id, {
        title,
        description,
        content,
        publishedOn,
        isVisible,
        urlSlug
    }) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.description = description;
        this.publishedOn = publishedOn;
        this.isVisible = isVisible;
        this.urlSlug = urlSlug;
    }
}

export { BlogPost };