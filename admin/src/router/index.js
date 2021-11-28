import { createRouter, createWebHistory } from '@ionic/vue-router';
import {routerBefore,routes as getRoutes} from "zelony-vue3-ionic-firebase-auth";
import store from "@/store";

const routes = [
  {
    path: '/main',
    component: () => import('@/views/Home/main/Tabs'),
    children: [
      {
        path: '',
        redirect: {name:'home-dashboard'}
      },
      {
        path: 'dashboard',
        name:"home-dashboard",
        meta:{
          title:"Main Dashboard"
        },
        component: () => import('@/views/Home/dashboard/views/index')
      },
      {
        path: 'staff',
        name:"home-staff",
        meta:{
          title:"All Staff"
        },
        component: () => import('@/views/Home/staff/views/index')
      },
      {
        path: 'projects',
        name:"home-projects",
        meta:{
          title:"All Projects"
        },
        component: () => import('@/views/Home/projects/views/index')
      },
      {
        path: 'tasks',
        name:"home-tasks",
        meta:{
          title:"Tasks"
        },
        component: () => import('@/views/Home/tasks/views/index')
      },
      {
        path: 'task/:id',
        name:"home-certainTask",
        meta:{
          title:"Task"
        },
        component: () => import('@/views/Home/tasks/views/task')
      },
    ]
  },
  {
    path: '/project/:id',
    name:"projects",
    component: () => import('@/views/Projects/main/Tabs'),
    children: [
      {
        path: '',
        redirect: 'dashboard'
      },
      {
        path: 'dashboard',
        name:"project-dashboard",
        meta:{
          title:"Dashboard"
        },
        component: () => import('@/views/Projects/dashboard/views/index')
      },
      {
        path: 'profile',
        name:"project-profile",
        meta:{
          title:"Project Profile"
        },
        component: () => import('@/views/Projects/profile/views/index')
      },
      {
        path: 'calendar',
        name:"project-calendar",
        meta:{
          title:"Project Calendar"
        },
        component: () => import('@/views/Projects/calendar/views/index')
      },
      {
        path: 'feedback',
        name:"project-feedback",
        meta:{
          title:"Project Feedback"
        },
        component: () => import('@/views/Projects/feedback/views/index')
      }
    ]
  },
  {
    path: '/user/:id',
    name:"user",
    component: () => import('@/views/Projects/main/Tabs'),
    children: [
      {
        path: '',
        redirect: 'dashboard'
      },
      {
        path: 'dashboard',
        name:"project-dashboard",
        meta:{
          title:"Dashboard"
        },
        component: () => import('@/views/Projects/dashboard/views/index')
      },
      {
        path: 'profile',
        name:"project-profile",
        meta:{
          title:"Project Profile"
        },
        component: () => import('@/views/Projects/profile/views/index')
      },
      {
        path: 'tasks',
        name:"project-tasks",
        meta:{
          title:"Tasks"
        },
        component: () => import('@/views/Home/tasks/views/index')
      },
      {
        path: 'calendar',
        name:"project-calendar",
        meta:{
          title:"Project Calendar"
        },
        component: () => import('@/views/Projects/calendar/views/index')
      },
      {
        path: 'feedback',
        name:"project-feedback",
        meta:{
          title:"Project Feedback"
        },
        component: () => import('@/views/Projects/feedback/views/index')
      }
    ]
  },
  ...getRoutes(() => import("@/views/login/views/index")),
  { path: "/:catchAll(.*)", redirect:"/main" }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next)=> {
  routerBefore(to, next, store);
  console.log(to,from)
})
export default router
