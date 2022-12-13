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
import Student_mycourse from "@/views/UserPage/Student_mycourse";
import Student_upload from "@/views/UserPage/Student_upload";
import Student_info from "@/views/UserPage/Student_info";
import Teacher from "@/views/UserPage/Teacher";
import StudentDetailCourse from "@/views/Student/StudentDetailCourse";
import StudentDetailAssignment from "@/views/Student/StudentDetailAssignment";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },

    // Welcome Page
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
            {
                path: 'student',
                component: Student,
                children: [
                    {
                        path: 'history',
                        component: Student_history
                    },
                    {
                        path: 'mycourse',
                        component: Student_mycourse
                    },
                    {
                        path: 'upload',
                        component: Student_upload
                    },
                    {
                        path: 'information',
                        component: Student_info
                    }
                ]
            },
            {
                path: 'teacher',
                component: Teacher,
                children: [
                    {
                        path: 'history',
                    },
                    {
                        path: 'upload'
                    },
                    {
                        path: 'information'
                    }
                ]
            }
        ]
    },

    // Student
    {
        path: '/StudentMain',
        name: 'StudentMain',
        component: StudentMain
    },
    {
        path: '/StudentDetailCourse/:course_id',
        name: 'StudentDetailCourse',
        component: StudentDetailCourse
    },
    {
        path: '/StudentCourseCenter',
        name: 'StudentCourseCenter',
        component: StudentCourseCenter
    },
    {
        path: '/StudentNotificationCenter',
        name: 'StudentNotificationCenter',
        component: StudentNotificationCenter
    },
    {
        path: '/StudentAssignmentCenter',
        name: 'StudentAssignmentCenter',
        component: StudentAssignmentCenter
    },
    {
        path: '/StudentDetailAssignment/:assignment_id',
        name: 'StudentDetailAssignment',
        component: StudentDetailAssignment
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
    {
        path: '/TeacherNotificationCenter',
        name: 'TeacherNotificationCenter',
        component: TeacherNotificationCenter
    },
    {
        path: '/TeacherAssignmentCenter',
        name: 'TeacherAssignmentCenter',
        component: TeacherAssignmentCenter
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router