import { Component, HostListener, Input, OnInit, TemplateRef } from '@angular/core'
import { DropDownAnimation } from 'src/app/_animations/menuItem'

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  animations: [DropDownAnimation],
})
export class DropdownComponent implements OnInit {
  isOpen: boolean = false
  noDataText = 'Nothing found'
  triggerText = 'Click me'

  /**
   * Get the required values to display
   */
  @Input() public dropdowndata: any = []

  /**
   * Custom template for the end user for dropdown trigger
   */
  @Input() dropdownTriggerTemplate!: TemplateRef<any>

  /**
   * Custom template for the end user for dropdown
   */
  @Input() dropdownTemplate!: TemplateRef<any>

  /**
   * Custom template for no data found
   */
  @Input() notDataTemplate!: TemplateRef<any>

  constructor() {}
  ngOnInit(): void {
    console.log(this.dropdowndata)
  }

  onMenuSelect = (data: any, index: any) => {}

  /**
   * The event upon clicking outside the dropdown  will hide the dropdown ..
   */
  @HostListener('document:click', ['$event']) onDocumentClick($event: any): void {
    this.isOpen = false
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen
  }
}
