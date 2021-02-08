import * as types from './actionType';
import * as courseApi from '../../api/courseApi';

export function createCourse(course) {
    return { type: types.CREATE_COURSE, course };
}

export function loadCourseSuccess(courses) {
    return { type: types.LOAD_COURSE_SUCCESS, courses };
}

export function loadCourses() {
    return function (dispatch) {
        return courseApi.getCourses().then(courses => {
            dispatch(loadCourseSuccess(courses));
        }).catch(error => {
            throw error;
        })
    }
}