import { createRouter, createWebHistory } from 'vue-router'
import StudentMain from "@/views/Student/StudentMain";
import HomeView from "@/views/HomeView";
import TeacherMain from "@/views/Teacher/TeacherMain";
import AdminMain from "@/views/Admin/AdminMain";
import AdminCourseCenter from "@/views/Admin/AdminCourseCenter";
import AdminUserCenter from "@/views/Admin/AdminUserCenter";
import AdminNotificationCenter from "@/views/Admin/AdminNotificationCenter";
import TeacherCourseCenter from "@/views/Teacher/TeacherCourseCenter";
import TeacherDetailCourse from "@/views/Teacher/TeacherDetailCourse";
import TeacherNotificationCenter from "@/views/Teacher/TeacherNotificationCenter";
import TeacherAssignmentCenter from "@/views/Teacher/TeacherAssignmentCenter";
import StudentCourseCenter from "@/views/Student/StudentCourseCenter";
import StudentNotificationCenter from "@/views/Student/StudentNotificationCenter";
import StudentAssignmentCenter from "@/views/Student/StudentAssignmentCenter";
import Register from "@/views/Welcome/Register";
import Login from "@/views/Welcome/Login";
import Welcome from "@/views/Welcome/WelcomePage";
import Student_history from "@/views/UserPage/Student_history";
import Student from "@/views/UserPage/Student";
import Userpage from "@/views/UserPage/Userpage";
import Student_info from "@/views/UserPage/Student_info";
import Teacher from "@/views/UserPage/Teacher";
import StudentDetailCourse from "@/views/Student/StudentDetailCourse";
import StudentDetailAssignment from "@/views/Student/StudentDetailAssignment";
import TeacherDetailAssignment from "@/views/Teacher/TeacherDetailAssignment";
import Student_vip from "@/views/UserPage/Student_vip";
import Student_setting from "@/views/UserPage/Student_setting";
import Teacher_info from "@/views/UserPage/Teacher_info.vue"
import Teacher_setting from "@/views/UserPage/Teacher_setting.vue"
import Teacher_vip from "@/views/UserPage/Teacher_vip.vue"

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },

    // Welcome
    {
        path: '/welcome',
        component: Welcome,
        children: [
            {
                path: 'register',
                component: Register
            },
            {
                path: 'login',
                component: Login
            }
        ]
    },


    // User Page
    {
        path: '/userPage',
        component: Userpage,
        children: [
            // Student
            {
                path: 'StudentMain',
                component: StudentMain,
            },
            {
                path: 'StudentCourseCenter',
                component: StudentCourseCenter,
                children: [
                    {
                        path: 'StudentDetailCourse/:course_id',
                        name: 'StudentDetailCourse',
                        component: StudentDetailCourse
                    },
                ]
            },
            {
                path: 'StudentNotificationCenter',
                name: 'StudentNotificationCenter',
                component: StudentNotificationCenter,
            },
            {
                path: 'StudentAssignmentCenter',
                name: 'StudentAssignmentCenter',
                component: StudentAssignmentCenter,
                children: [
                    {
                        path: 'StudentDetailAssignment/:assignment_id',
                        name: 'StudentDetailAssignment',
                        component: StudentDetailAssignment
                    },
                ]
            },
            {
                path: 'StudentSelfCenter',
                name: 'StudentSelfCenter',
                component: Student,
                children: [
                    {
                        path: 'information',
                        component: Student_info,
                    },
                    {
                        path: 'setting',
                        component: Student_setting,
                    },
                    {
                        path: 'history',
                        component: Student_history,
                    },
                    {
                        path: 'vip',
                        component: Student_vip,
                    }
                ]
            },
            //Teacher
            {
                path: 'TeacherMain',
                name: 'TeacherMain',
                component: TeacherMain
            },
            {
                path: 'TeacherCourseCenter',
                name: 'TeacherCourseCenter',
                component: TeacherCourseCenter,
                children: [
                    {
                        path: 'TeacherDetailCourse/:course_id',
                        name: 'TeacherDetailCourse',
                        component: TeacherDetailCourse
                    },
                ]
            },
            {
                path: 'TeacherNotificationCenter',
                name: 'TeacherNotificationCenter',
                component: TeacherNotificationCenter,
            },
            {
                path: 'TeacherAssignmentCenter',
                name: 'TeacherAssignmentCenter',
                component: TeacherAssignmentCenter,
                children: [
                    {
                        path: 'TeacherDetailAssignment/:assignment_id',
                        name: 'TeacherDetailAssignment',
                        component: TeacherDetailAssignment
                    }
                ]
            },
            {
                path: 'TeacherSelfCenter',
                name: 'TeacherSelfCenter',
                component: Teacher,
                children: [
                    {
                        path: 'information',
                        component: Teacher_info,
                    },
                    {
                        path: 'setting',
                        component: Teacher_setting,
                    },
                    {
                        path: 'vip',
                        component: Teacher_vip,
                    }
                ]
            },
            //Administrator
            {
                path: 'AdminMain',
                name: 'AdminMain',
                component: AdminMain
            },
            {
                path: 'AdminCourseCenter',
                name: 'AdminCourseCenter',
                component: AdminCourseCenter
            },
            {
                path: 'AdminUserCenter',
                name: 'AdminUserCenter',
                component: AdminUserCenter
            },
            {
                path: 'AdminNotificationCenter',
                name: 'AdminNotificationCenter',
                component: AdminNotificationCenter
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router