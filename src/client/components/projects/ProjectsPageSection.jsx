import React from 'react';
import { ArticleTitle } from '../common/article/ArticleTitle';
import { Category } from './Category';
import { Article } from '../common/article/Article';
import ProfileService from '../../services/profileService';

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

    async componentDidMount() {
        try {
            const projects = await ProfileService.getProjects();
            const projectsByCategory = projects.reduce((dic, project) => {
                dic[project.category] = [...(dic[project.category] || []), project];
                return dic;
            }, { });

            this.setState({
                projects,
                projectsByCategory: projectsByCategory
            });
        }
        catch (error) {
            console.log(error);

            this.setState({ error });
        }
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