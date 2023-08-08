import { Component, Input, OnInit, AfterViewInit, OnChanges} from '@angular/core';
import { ApiAppService } from '../../Service/api-app.service';
import { map } from 'rxjs/operators';


interface Lot{
	_id?: any;
	nom?: string;
	description?: string;
	ref_participation?: number;
	reception?: string;
	idUser ?: any;
	idTicket ?: any;
}

const LOTS : Lot[] = []


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {

  lotss = LOTS;
  totalDetails = 0;
  _id : string;
  @Input() 
  set lots (lot: string[]) {
    this.retrieveLots(lot);
  }

  constructor(public apiApp: ApiAppService) { }

  retrieveLots(ids: string[]= []): void {
    console.log('ids',ids);
    console.log('retrieveLots');
    this.apiApp.getLotByIdUser(ids.join(',')).subscribe({
      next: (data) => {
        console.log('retrieveLots data', data);
        this.lotss = data;
      },
      error: (e) => console.error(e)
    });
  }

}
