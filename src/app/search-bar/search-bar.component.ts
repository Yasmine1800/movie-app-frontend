import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  
  @Output() searchFieldChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  handleChange(event: Event) {
    this.searchFieldChange.emit((event.target as HTMLInputElement).value);
  }

}
