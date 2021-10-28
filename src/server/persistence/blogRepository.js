import { ObjectId } from 'bson';
import { connectToDb } from '../services/mongoUtil.js';
import BlogPost from '../api/models/BlogPost.js';


const convertDocumentToBlogPost = (document) => {
    return new BlogPost({
        id = document['_id'].toHexString(),
        title = document['title'],
        description = document['description'],
        content = document['content'],
        createdOn = document['createdOn'],
        updatedOn = document['updatedOn'],
        publishedOn = document['publishedOn']
    })
};


export const createBlogPost = (blogPost) => {
    console.log(`Connecting to the DB to create a blog post...`);

    const db = await connectToDb();

    console.log(`Creating the blog post...`);

    const result = await db.collection('blogPosts').insertOne(blogPost);

    if (result) {
        const id = result.insertedId.toHexString();
        
        console.log(`Created the blog post (_id=${id})`);

        return id;
    }
    else {
        console.log(`Could not create the blog post`);

        return null;
    }
};

export const getBlogPost = (id) => {
    console.log(`Connecting to the DB to get a blog post (_id=${id})...`);

    const db = await connectToDb();

    console.log(`Getting the blog post (_id=${id})...`);

    const result = await db.collection('blogPosts').findOne({ _id: new ObjectId(id) });

    if (result) {
        console.log(`Found the blog post (_id=${id})`);

        return convertDocumentToBlogPost(result);
    }
    else {
        console.log(`Could not find the blog post (_id=${id})`);

        return null;
    }
};

export const getBlogPostList = () => {
    console.log(`Connecting to the DB to get a blog post list...`);

    const db = await connectToDb();

    console.log(`Getting the blog post list...`);

    const result = await db.collection('blogPosts').find().toArray();

    if (result && result.length > 0) {
        console.log(`Found the blog list`);

        return result.map(document => convertDocumentToBlogPost(document));
    }
    else {
        console.log(`Could not find the blog post list`);

        return null;
    }
};

export const updateBlogPost = (blogPost) => {
    if (!blogPost.id) {
        throw new Error('Blog post validation failed. Id is not specified.');
    }

    console.log(`Connecting to the DB to update a blog post...`);

    const db = await connectToDb();

    console.log(`Updating the blog post...`);

    const updateProperties = { ...blogPost };
    delete updateProperties['id'];

    const result = await db.collection('blogPosts').updateOne(
        { _id: new ObjectId(blogPost.id) },
        { $set: updateProperties });

    if (result.modifiedCount > 0) {
        console.log(`Updated the blog post (_id=${blogPost.id})`);

        return true;
    }
    else {
        console.log(`Could not find to update the blog post (${blogPost.id})`);

        return false;
    }
};

export const deleteBlogPost = async (id) => {
    console.log(`Connecting to the DB to delete a blog post (_id=${id})...`);

    const db = await connectToDb();

    console.log(`Deleting the blog post (_id=${id})...`);

    const result = await db.collection('blogPosts').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount == 1) {
        console.log(`Deleted the blog post (_id=${id})`);

        return true;
    }
    else {
        console.log(`Could not find to delete the blog post (_id=${id})`);

        return false;
    }
};