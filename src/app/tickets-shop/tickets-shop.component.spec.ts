import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsShopComponent } from './tickets-shop.component';

describe('TicketsShopComponent', () => {
  let component: TicketsShopComponent;
  let fixture: ComponentFixture<TicketsShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
