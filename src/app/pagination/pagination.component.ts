import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent{
  page : number = 1;
  @Output() pageChange = new EventEmitter<number>();

  getPreviousPage() {
    if (this.page > 1) {
      this.page--;
      this.pageChange.emit(this.page);
    }
  }

  getNextPage() {
    this.page++;
    this.pageChange.emit(this.page);
  }

}



