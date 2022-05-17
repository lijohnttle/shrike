import { BlogPostDto } from '../../../../contracts';
import { AuthorizationError } from '../../../../contracts/errors';
import { UserContext } from '../../entities/authentication/UserContext';
import { BlogManager } from './BlogManager';


beforeAll(async () => await connectDb());
afterEach(async () => await clearDb());
afterAll(async () => await disconnectDb());


const adminUserContext = new UserContext({
    username: 'admin',
    roles: ['admin'],
});
const guestUserContext = new UserContext({
    username: 'guest',
    roles: [],
});
const blogManager = new BlogManager();


describe('Create blog post', () => {
    describe('when unauthorized user tries to create a blog post', () => {
        it('then an exception thrown', async () => {
            const blogPostDto = createDefaultBlogPostDto();

            await expect(async () => await blogManager.createBlogPost(blogPostDto, guestUserContext))
                .rejects
                .toThrow(AuthorizationError);
        });
    });

    // describe('when user creates a blog post', async () => {
    //     it('then a new blog post created', async () => {
    //         const blogPostDto = new BlogPostDto({

    //         });

    //         blogManager.createBlogPost(blogPostDto, adminUserContext)
    //     });
    // });
});

function createDefaultBlogPostDto() {
    return new BlogPostDto({
        title: 'New Blog Post',
        description: 'Blog post description',
        content: 'Blog post content',
        slug: 'new_blog_post',
    });
}
