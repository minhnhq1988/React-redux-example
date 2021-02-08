import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadCourses } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorAction';
import CourseForm from './CourseForm';
import { newCourse } from '../../mockupData';

function ManageCoursePage({
    courses,
    authors,
    loadAuthors,
    loadCourses,
    ...props }) {
    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (courses.length === 0) {
            loadCourses().catch(error => {
                alert("Loading courses failed " + error);
            });
        }

        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert("Loading author failed " + error);
            });
        }
    }, []);

    function handleChange(event){
        const {name, value} = event.target;
        setCourse(preCourse =>({
            ...preCourse,
            [name] : name === "authorId" ? parseInt(value, 10) : value
        }))
    }
    return (
        <CourseForm 
        course={course} 
        authors={authors} 
        errors={errors} 
        onChange={handleChange} />
    );
}

function mapStateToProps(state) {
    return {
        course: newCourse,
        courses: state.courses,
        authors: state.authors
    };
}

const mapDispatchToProps = {
    loadCourses: loadCourses,
    loadAuthors: loadAuthors
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);