import React from 'react';
import { connect } from 'react-redux';
import * as courseAction from '../../redux/actions/courseActions';
import * as authorAction from '../../redux/actions/authorAction';
import { bindActionCreators } from 'redux'
import CourseList from './CourseList';

class CoursesPage extends React.Component {
    componentDidMount() {
        const {courses, authors, actions} = this.props;
        if(courses.length === 0)
        {
            actions.loadCourses().catch(error => {
                alert("Loading courses failed " + error);
            });
        }

        if(authors.length === 0)
        {
            actions.loadAuthors().catch(error => {
                alert("Loading author failed " + error);
            });
        }
    }

    render() {
        return (
            <>
                <h2>Courses</h2>
                <CourseList courses={this.props.courses} />
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
        authors: state.authors
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