import { Property } from './../../model/property';
import { HousingService } from 'src/app/services/housing.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})
export class PropertyDetailComponent implements OnInit
{
  public propertyId: number;
  property = new Property();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private housingService: HousingService
  ) { }

  ngOnInit(): void
  {
    this.propertyId = Number(this.route.snapshot.params['id']);
    this.route.data.subscribe(data =>
    {
      this.property = data['prp'];
    })


    // this.route.params.subscribe(
    //   (params) =>
    //   {
    //     this.propertyId = +params['id'];
    //     this.housingService.getProperty(this.propertyId).subscribe(
    //       (data: Property) =>
    //       {
    //         this.property = data;
    //       }, error => this.router.navigate(['/'])
    //     );
    //   }
    // );

    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
    ];

    this.galleryImages = [
      {
        small: 'assets/images/9.jpg',
        medium: 'assets/images/9.jpg',
        big: 'assets/images/9.jpg'
      },
      {
        small: 'assets/images/8.jpg',
        medium: 'assets/images/8.jpg',
        big: 'assets/images/8.jpg'
      },
      {
        small: 'assets/images/7.png',
        medium: 'assets/images/7.png',
        big: 'assets/images/7.png'
      },
      {
        small: 'assets/images/6.jpg',
        medium: 'assets/images/6.jpg',
        big: 'assets/images/6.jpg'
      },
      {
        small: 'assets/images/5.png',
        medium: 'assets/images/5.png',
        big: 'assets/images/5.png'
      }
    ];
  }
}

