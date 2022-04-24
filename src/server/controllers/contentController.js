import express from 'express';
import { contentUrlList } from '../../static';
import { getBlogPostManager } from '../domain';
import fs from 'fs';

const getName = () => 'Content Controller';

/**
 * @param {express.Express} app 
 * @param {*} appContext 
 */
const register = (app, appContext) => {
    console.log(`Registering ${getName()}...`);
    
    console.log('Registering blog post attachments content...');
    app.get(contentUrlList.BLOG_POST, async (req, res) => {

        const blogPostSlug = req.params.slug;
        const attachmentName = req.params.name;

        if (blogPostSlug || attachmentName) {
            const blogPostManager = getBlogPostManager();

            const attachment = await blogPostManager.getAttachment(blogPostSlug, attachmentName);

            if (attachment) {
                fs.writeFileSync("C:/Users/lijoh/Downloads/test.jpg", attachment.data, 'binary');

                res.setHeader('content-type', attachment.contentType);
                res.write(attachment.data, 'binary');
            }
        }

        res.end(null, 'binary');
    });
    console.log(`Registered ${getName()}`);
};

export default {
    getName,
    register
};