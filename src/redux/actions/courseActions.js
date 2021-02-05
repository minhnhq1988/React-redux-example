import * as types from './actionType';

export function createCourse(course) {
    return { type: types.CREATE_COURSE, course };
}