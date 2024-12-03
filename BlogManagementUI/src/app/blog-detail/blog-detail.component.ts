import { Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-blog-detail',
	imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
	templateUrl: './blog-detail.component.html',
	styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent {
    formBuilder = inject(FormBuilder);
    blogService = inject(BlogService);
    router = inject(Router);
    route = inject(ActivatedRoute);
    isEdit = false;

    blogForm = this.formBuilder.group({
        id: [0],
        username: ['', [Validators.required]],
        text: ['', [Validators.required]],
        createdDate: ['']
    });

    ngOnInit(){
        let blogId = this.route.snapshot.params['id'];

        if(blogId){
            this.isEdit = true;

            this.blogService.getBlogById(blogId).subscribe({
                next: data => {
                    this.blogForm.patchValue(data as any);
                },
                error: error => {
                    console.error('There was an error!', error);
                }
            })
        }
    }

    saveBlog(){
        let model:any = this.blogForm.value;
        model.createdDate = new Date();
        if(this.isEdit){
            this.blogService.updateBlog(model.id, model).subscribe({
                next: data => {
                    console.log(data);
                },
                error: error => {
                    console.error('There was an error!', error);
                }
            });
        }else{
            this.blogService.createBlog(model).subscribe({
                next: data => {
                    console.log(data);
                },
                error: error => {
                    console.error('There was an error!', error);
                }
            });
        }
        
        this.router.navigateByUrl('/').then(() => {
            window.location.reload();
        });
    }
}
