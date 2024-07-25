import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { SearchKeyword } from '../../types/searchKeyword.type';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { UserService } from '../../services/users/user-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  subscriptions: Subscription = new Subscription();

  @Output()

  searchClicked: EventEmitter<SearchKeyword> = new EventEmitter<SearchKeyword>();

  displaySearch: boolean = true;
  isUserAuthenticated: boolean = false;
  userName: string = '';


  constructor(
    public categoryStore: CategoriesStoreItem,
    private router: Router,
    public cartStore: CartStoreItem,
    public userService: UserService
  ) {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      this.displaySearch = (event as NavigationEnd).url === '/home/products' ? true : false;
    });

    this.subscriptions.add(this.userService.isUserAuthenticated$.subscribe((result) => {
      this.isUserAuthenticated = result;
    }));

    this.subscriptions.add(this.userService.loggedInUser$.subscribe((result) => {
      this.userName = result.username;
    }))
  }

  onClickSearch(keyword: string, categoryId: string): void {
    this.searchClicked.emit({
      categoryId: parseInt(categoryId),
      keyword: keyword,
    });
  }

  navigateToCart(): void {
    this.router.navigate(['home/cart']);
  }

  logout(): void {
    this.userService.logout();
    console.log('User logged out.')
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
