import { Switch } from "react-router-dom"
import { Route } from "react-router-dom"
import App from "./pages/App"
import Blog from "./pages/Blog"
import { Details } from "./pages/Details"
import NotFound from "./pages/NotFound"

export const MAIN_ROUTE = 'MAIN_ROUTE'
export const PEOPLE_DETAILS_ROUTE = 'PEOPLE_DETAILS_ROUTE'
export const BLOG_ROUTE = 'BLOG_ROUTE'
export const NOT_FOUND_ROUTE = 'NOT_FOUND_ROUTE'

const routes = [
    {
        id: MAIN_ROUTE,
        path: '/',
        exact: true,
        component: App
    },
    {
        id: PEOPLE_DETAILS_ROUTE,
        path: '/people/:id',
        exact: true,
        component: Details
    },
    {
        id: BLOG_ROUTE,
        path: '/blog',
        exact: true,
        component: Blog
    },
    {
        id: NOT_FOUND_ROUTE,
        path: '*',
        exact: false,
        component: NotFound
    },
]

export const getRouteConfig = id => {
    const route = routes.find(route => route.id === id)
    
    if (route) {
        const { component, ...rest } = route
        
        return rest
    }
}

export const Routes = () => {
    return (
        <Switch>
            {routes.map(route => {
                const { id, ...props } = route
                  return < Route key = { id } { ...props} />
            })}

        </Switch>
    )
}