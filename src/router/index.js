import { createRouter, createWebHistory } from 'vue-router'
import StudentMain from "@/views/Student/StudentMain";
import HomeView from "@/views/HomeView";
import StudentLiveCourse from "@/views/Student/StudentLiveCourse";
import TeacherMain from "@/views/Teacher/TeacherMain";
import AdminMain from "@/views/Admin/AdminMain";
import AdminCourseCenter from "@/views/Admin/AdminCourseCenter";
import AdminUserCenter from "@/views/Admin/AdminUserCenter";
import AdminNotificationCenter from "@/views/Admin/AdminNotificationCenter";
import TeacherCourseCenter from "@/views/Teacher/TeacherCourseCenter";
import TeacherDetailCourse from "@/views/Teacher/TeacherDetailCourse";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },

    // Student
    {
        path: '/StudentMain',
        name: 'StudentMain',
        component: StudentMain
    },
    {
        path: '/StudentLiveCourse',
        name: 'StudentLiveCourse',
        component: StudentLiveCourse
    },

    // Administrator
    {
        path: '/AdminMain',
        name: 'AdminMain',
        component: AdminMain
    },
    {
        path: '/AdminCourseCenter',
        name: 'AdminCourseCenter',
        component: AdminCourseCenter
    },
    {
        path: '/AdminUserCenter',
        name: 'AdminUserCenter',
        component: AdminUserCenter
    },
    {
        path: '/AdminNotificationCenter',
        name: 'AdminNotificationCenter',
        component: AdminNotificationCenter
    },

    // Teacher
    {
        path: '/TeacherMain',
        name: 'TeacherMain',
        component: TeacherMain
    },
    {
        path: '/TeacherCourseCenter',
        name: 'TeacherCourseCenter',
        component: TeacherCourseCenter
    },
    {
        path: '/TeacherDetailCourse/:course_id',
        name: 'TeacherDetailCourse',
        component: TeacherDetailCourse
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router