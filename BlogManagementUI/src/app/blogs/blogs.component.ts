import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog.model';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-blogs',
	imports: [MatCardModule, RouterLink, DatePipe],
	templateUrl: './blogs.component.html',
	styleUrl: './blogs.component.css'
})
export class BlogsComponent {
	blogPosts: Blog[] = [];

	constructor(private blogService: BlogService) { 
        this.loadAllBlogs();
    }

	ngOnInit(): void {
		this.loadAllBlogs();
	}

    loadAllBlogs(){
        this.blogService.getBlogs().subscribe((data: Blog[]) => {
			this.blogPosts = data;
		});
    }

	deleteBlog(id: number) {
		this.blogService.deleteBlog(id).subscribe((data: Blog[]) => {
			console.log(data);
		});
	}

    // editBlog(id: number){
        
    // }
}
