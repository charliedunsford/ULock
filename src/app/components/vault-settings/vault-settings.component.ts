import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vault-settings',
  standalone: true,
  imports: [],
  templateUrl: './vault-settings.component.html',
  styleUrl: './vault-settings.component.css'
})
export class VaultSettingsComponent implements OnInit {
  isDarkMode : boolean = false;
  
  ngOnInit(): void {
    this.isDarkMode = document.body.classList.contains('dark-mode');
  }
  
  toggleDarkMode(event: Event): void {
    this.isDarkMode = (event.target as HTMLInputElement).checked;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }
}
