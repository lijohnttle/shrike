import React from 'react';
import { ArticleTitle } from '../common/article/ArticleTitle';
import { Category } from './Category';
import { Article } from '../common/article/Article';

const data = {
    projects: [
        {
            id: 1,
            title: 'Software Project 1',
            category: 'Software',
            shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut lectus efficitur, dapibus enim ac, viverra justo.',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut lectus efficitur, dapibus enim ac, viverra justo. Cras posuere, arcu in euismod pellentesque, leo dolor ullamcorper velit, a auctor diam quam eget massa. Mauris luctus porttitor urna et commodo. Integer aliquam lacinia orci vitae vehicula. Ut pharetra eros eget orci dignissim, ut mattis dolor ullamcorper. Suspendisse vestibulum ex id nibh efficitur lobortis. Suspendisse orci sem, venenatis in velit eu, molestie rutrum metus. In odio felis, lobortis a congue sed, efficitur viverra ex. Nam sagittis id eros ut pellentesque. Sed in enim justo. Sed leo lacus, lacinia quis enim ut, vehicula suscipit nibh. Mauris vel quam a nisi aliquet imperdiet. Quisque commodo pharetra purus, at egestas diam finibus eu. Curabitur rhoncus dolor sit amet tincidunt dapibus. Sed condimentum aliquam purus eu semper. Nunc id augue neque. Phasellus sed pulvinar leo, ut convallis velit. Morbi et lacus sed nibh varius luctus. Mauris sit amet orci non sapien ullamcorper tincidunt sit amet sit amet leo. Morbi convallis ligula nulla, vel euismod diam ultricies at. Nullam id sem at nunc bibendum consectetur. Nulla placerat leo non ligula varius, quis porta sem viverra. Praesent hendrerit nisi leo. Curabitur eget ante pharetra, posuere ligula a, porttitor ipsum. Nullam sit amet lacus dui.'
        },
        {
            id: 2,
            title: 'Software Project 2',
            category: 'Software',
            shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut lectus efficitur, dapibus enim ac, viverra justo.',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut lectus efficitur, dapibus enim ac, viverra justo. Cras posuere, arcu in euismod pellentesque, leo dolor ullamcorper velit, a auctor diam quam eget massa. Mauris luctus porttitor urna et commodo. Integer aliquam lacinia orci vitae vehicula. Ut pharetra eros eget orci dignissim, ut mattis dolor ullamcorper. Suspendisse vestibulum ex id nibh efficitur lobortis. Suspendisse orci sem, venenatis in velit eu, molestie rutrum metus. In odio felis, lobortis a congue sed, efficitur viverra ex. Nam sagittis id eros ut pellentesque. Sed in enim justo. Sed leo lacus, lacinia quis enim ut, vehicula suscipit nibh. Mauris vel quam a nisi aliquet imperdiet. Quisque commodo pharetra purus, at egestas diam finibus eu. Curabitur rhoncus dolor sit amet tincidunt dapibus. Sed condimentum aliquam purus eu semper. Nunc id augue neque. Phasellus sed pulvinar leo, ut convallis velit. Morbi et lacus sed nibh varius luctus. Mauris sit amet orci non sapien ullamcorper tincidunt sit amet sit amet leo. Morbi convallis ligula nulla, vel euismod diam ultricies at. Nullam id sem at nunc bibendum consectetur. Nulla placerat leo non ligula varius, quis porta sem viverra. Praesent hendrerit nisi leo. Curabitur eget ante pharetra, posuere ligula a, porttitor ipsum. Nullam sit amet lacus dui.'
        },
        {
            id: 3,
            title: 'Software Project 3',
            category: 'Software',
            shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut lectus efficitur, dapibus enim ac, viverra justo.',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut lectus efficitur, dapibus enim ac, viverra justo. Cras posuere, arcu in euismod pellentesque, leo dolor ullamcorper velit, a auctor diam quam eget massa. Mauris luctus porttitor urna et commodo. Integer aliquam lacinia orci vitae vehicula. Ut pharetra eros eget orci dignissim, ut mattis dolor ullamcorper. Suspendisse vestibulum ex id nibh efficitur lobortis. Suspendisse orci sem, venenatis in velit eu, molestie rutrum metus. In odio felis, lobortis a congue sed, efficitur viverra ex. Nam sagittis id eros ut pellentesque. Sed in enim justo. Sed leo lacus, lacinia quis enim ut, vehicula suscipit nibh. Mauris vel quam a nisi aliquet imperdiet. Quisque commodo pharetra purus, at egestas diam finibus eu. Curabitur rhoncus dolor sit amet tincidunt dapibus. Sed condimentum aliquam purus eu semper. Nunc id augue neque. Phasellus sed pulvinar leo, ut convallis velit. Morbi et lacus sed nibh varius luctus. Mauris sit amet orci non sapien ullamcorper tincidunt sit amet sit amet leo. Morbi convallis ligula nulla, vel euismod diam ultricies at. Nullam id sem at nunc bibendum consectetur. Nulla placerat leo non ligula varius, quis porta sem viverra. Praesent hendrerit nisi leo. Curabitur eget ante pharetra, posuere ligula a, porttitor ipsum. Nullam sit amet lacus dui.'
        },
        {
            id: 4,
            title: 'Software Project 4',
            category: 'Software',
            shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut lectus efficitur, dapibus enim ac, viverra justo.',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut lectus efficitur, dapibus enim ac, viverra justo. Cras posuere, arcu in euismod pellentesque, leo dolor ullamcorper velit, a auctor diam quam eget massa. Mauris luctus porttitor urna et commodo. Integer aliquam lacinia orci vitae vehicula. Ut pharetra eros eget orci dignissim, ut mattis dolor ullamcorper. Suspendisse vestibulum ex id nibh efficitur lobortis. Suspendisse orci sem, venenatis in velit eu, molestie rutrum metus. In odio felis, lobortis a congue sed, efficitur viverra ex. Nam sagittis id eros ut pellentesque. Sed in enim justo. Sed leo lacus, lacinia quis enim ut, vehicula suscipit nibh. Mauris vel quam a nisi aliquet imperdiet. Quisque commodo pharetra purus, at egestas diam finibus eu. Curabitur rhoncus dolor sit amet tincidunt dapibus. Sed condimentum aliquam purus eu semper. Nunc id augue neque. Phasellus sed pulvinar leo, ut convallis velit. Morbi et lacus sed nibh varius luctus. Mauris sit amet orci non sapien ullamcorper tincidunt sit amet sit amet leo. Morbi convallis ligula nulla, vel euismod diam ultricies at. Nullam id sem at nunc bibendum consectetur. Nulla placerat leo non ligula varius, quis porta sem viverra. Praesent hendrerit nisi leo. Curabitur eget ante pharetra, posuere ligula a, porttitor ipsum. Nullam sit amet lacus dui.'
        }
    ]
};

class ProjectsPageSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: null,
            projectsByCategory: null,
            selectedProject: null,
            error: null
        };

        this.handleSelectProject = this.handleSelectProject.bind(this);
        this.handleResetSelection = this.handleResetSelection.bind(this);
    }

    handleSelectProject(project) {
        this.setState({
            selectedProject: project
        });
    }

    handleResetSelection() {
        this.setState({
            selectedProject: null
        });
    }

    componentDidMount() {
        const projects = data.projects;
        const projectsByCategory = projects.reduce((dic, project) => {
            dic[project.category] = [...(dic[project.category] || []), project];
            return dic;
        }, { });

        this.setState({
            projects: data.projects,
            projectsByCategory: projectsByCategory
        });
    }

    render() {
        return (
            <Article background="#313131" color="white">
                <ArticleTitle title="Projects" to="/projects" />

                {this.renderCategories()}
            </Article>
        );
    }

    renderCategories() {
        if (!this.state.projectsByCategory) {
            return null;
        }

        const { projectsByCategory } = this.state;

        return (
            <React.Fragment>
                {Object.getOwnPropertyNames(projectsByCategory).map((category) => (
                    <Category
                        key={category}
                        category={category}
                        projects={projectsByCategory[category]}
                        selectedProject={this.state.selectedProject}
                        onSelect={this.handleSelectProject}
                        onResetSelection={this.handleResetSelection} />
                ))}
            </React.Fragment>
        );
    }
}

export { ProjectsPageSection };