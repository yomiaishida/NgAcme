import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from './product.service';
import { IProduct } from './products';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product Detail';
  product: IProduct[] | undefined
  sub!: Subscription;
  errorMessage: string = ''

  fill: IProduct[] = []
  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'))
    this.pageTitle +=  ` ${id}`
    this.sub = this.productService.getProducts().subscribe({
      next: products => {        
        this.product = products.filter((pro) => pro.productId === id);
        this.fill = this.product
        
      },
      error: err => this.errorMessage = err
    })
  }

  onBack(): void {
    this.router.navigate(['/products'])
  }

  ngOnDestroy(): void {
  this.sub.unsubscribe()
  }
}

