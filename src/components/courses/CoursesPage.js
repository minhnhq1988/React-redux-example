import React from 'react';
import { connect } from 'react-redux';
import * as courseAction from '../../redux/actions/courseActions';
import * as authorAction from '../../redux/actions/authorAction';
import { bindActionCreators } from 'redux'
import CourseList from './CourseList';
import { Redirect } from 'react-router-dom';
import Spinner from '../common/Spinner';

class CoursesPage extends React.Component {
    state = {
        redirectToAddCoursePage: false
    }
    componentDidMount() {
        const { courses, authors, actions } = this.props;
        if (courses.length === 0) {
            actions.loadCourses().catch(error => {
                alert("Loading courses failed " + error);
            });
        }

        if (authors.length === 0) {
            actions.loadAuthors().catch(error => {
                alert("Loading author failed " + error);
            });
        }
    }

    render() {
        return (
            <>
                {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
                <h2>Courses</h2>
                {this.props.loading
                    ? <Spinner />
                    : (
                        <>
                            <button style={{ marginBottom: 20 }}
                                className="btn btn-primary"
                                onClick={() => this.setState({ redirectToAddCoursePage: true })}>
                                Add Course
                            </button>
                            <CourseList courses={this.props.courses} />
                        </>
                    )}
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        courses: state.authors.length === 0
            ? []
            : state.courses.map(course => {
                return {
                    ...course,
                    authorName: state.authors.find(a => a.id === course.authorId).name
                };
            }),
        authors: state.authors,
        loading: state.apiCallsInProgress > 0
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(courseAction.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorAction.loadAuthors, dispatch)
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);