import express from 'express';
import { ControllerContext } from './ControllerContext';
import { ControllerBase } from './ControllerBase';
import { contentUrlList } from '../../static';
import { getBlogManager } from '../domain';

export class ContentController extends ControllerBase {
    constructor() {
        super('Content Controller');
    }

    /**
     * Registers the controller.
     * @param {express.Express} app 
     * @param {ControllerContext} context 
     */
    register(app, context) {
        super.register(app, context);
        super.beginRegister();

        console.log('Registering blog post attachments content...');
        
        app.get(contentUrlList.BLOG_POST, async (req, res) => {

            const blogPostSlug = req.params.slug;
            const attachmentName = req.params.name;

            if (blogPostSlug || attachmentName) {
                const blogPostManager = getBlogManager();

                const attachment = await blogPostManager.getAttachment(blogPostSlug, attachmentName);

                if (attachment) {
                    res.setHeader('content-type', attachment.contentType);
                    res.write(attachment.data, 'binary');
                }
            }

            res.end(null, 'binary');
        });

        super.endRegister();
    }
}
