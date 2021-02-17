import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorAction';
import CourseForm from './CourseForm';
import { newCourse } from '../../mockupData';
import Spinner from "../common/Spinner";
import { toast } from 'react-toastify';

function ManageCoursePage({
    courses,
    authors,
    loadAuthors,
    loadCourses,
    saveCourse,
    history,
    ...props }) {
    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (courses.length === 0) {
            loadCourses().catch(error => {
                alert("Loading courses failed " + error);
            });
        } else {
            setCourse({ ...props.course });
        }

        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert("Loading author failed " + error);
            });
        }
    }, [props.course]);

    function handleChange(event) {
        const { name, value } = event.target;
        setCourse(preCourse => ({
            ...preCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value
        }))
    }

    function handleSave(event) {
        event.preventDefault();
        setSaving(true);
        saveCourse(course).then(() => {
            toast.success("Course saved.");
            history.push("/courses");
        }).catch(error => {
            setSaving(false);
            setErrors({ onSave: error.message });
        });

    }
    return (
        authors.length === 0 || courses.length === 0
            ? <Spinner />
            : (<CourseForm
                course={course}
                authors={authors}
                errors={errors}
                onChange={handleChange}
                onSave={handleSave}
                saving={saving} />)

    );
}

function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug;
    const course = slug && state.courses.length > 0 ? getCourseBySlug(state.courses, slug) : newCourse;

    return {
        course,
        courses: state.courses,
        authors: state.authors
    };
}

const mapDispatchToProps = {
    loadCourses: loadCourses,
    loadAuthors: loadAuthors,
    saveCourse: saveCourse,
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);