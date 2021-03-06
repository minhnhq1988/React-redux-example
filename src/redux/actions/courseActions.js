import * as types from './actionType';
import * as courseApi from '../../api/courseApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadCourseSuccess(courses) {
    return { type: types.LOAD_COURSE_SUCCESS, courses };
}

export function createCourseSuccess(course) {
    return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
    return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function deleteCourseSuccess(course) {
    return { type: types.DELETE_COURSE_SUCCESS, course };
}

export function deleteCourseOptimisticSuccess(course) {
    return { type: types.DELETE_COURSE_OPTIMISTIC, course };
}

export function loadCourses() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return courseApi.getCourses().then(courses => {
            dispatch(loadCourseSuccess(courses));
        }).catch(error => {
            dispatch(apiCallError());
            throw error;
        })
    }
}

export function saveCourse(course) {
    return function (dispatch, getState) {
        dispatch(beginApiCall());
        return courseApi.saveCourse(course)
            .then(savedCourse => {
                course.id
                    ? dispatch(updateCourseSuccess(savedCourse))
                    : dispatch(createCourseSuccess(savedCourse));
            })
            .catch(error => {
                dispatch(apiCallError());
                throw error;
            });
    };
}

export function deleteCourse(course) {
    return function (dispatch) {
        dispatch(beginApiCall());
        return courseApi.deleteCourse(course.id)
            .then(() => {
                dispatch(deleteCourseSuccess(course));
            })
            .catch(error => {
                dispatch(apiCallError());
                throw error;
            })
    }
}

export function deleteCourseOptimistic(course){
    return function (dispatch) {
        dispatch(deleteCourseOptimisticSuccess(course));
        return courseApi.deleteCourse(course.id)
            .catch(error => {
                throw error;
            })
    }
}