import { Routes } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';


export const routeConfig: Routes = [
	{
		path: '',
		component: BlogsComponent,
		title: 'Blogs Management',
	},
	{
		path: 'blogs',
		component: BlogsComponent,
		title: 'Blogs Management',
	},
	{
		path: 'Blog/Create',
		component: BlogDetailComponent,
		title: 'Create New Blog',
	},
	{
		path: 'Blog/Edit/:id',
		component: BlogDetailComponent,
		title: 'Edit Blog Details',
	}
];
export default routeConfig;