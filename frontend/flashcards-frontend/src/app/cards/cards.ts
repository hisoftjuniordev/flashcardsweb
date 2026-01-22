import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.html',
  styleUrl: './cards.css'
})
export class CardsComponent implements OnInit {
  cards: any[] = [];
  currentIndex = 0;
  isFlipped = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Zamenjaj localhost z naslovom, ki ga vidiš na Renderju
this.http.get<any[]>('https://flashcardsweb.onrender.com/api/cards').subscribe(data => {
  this.cards = data;
});
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  nextCard(event: Event) {
    event.stopPropagation(); // Prepreči, da bi se kartica ob kliku na gumb obrnila
    this.isFlipped = false;
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.cards.length;
    }, 150);
  }
}