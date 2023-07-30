import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoFormDialogComponentComponent } from './producto-form-dialog-component.component';

describe('ProductoFormDialogComponentComponent', () => {
  let component: ProductoFormDialogComponentComponent;
  let fixture: ComponentFixture<ProductoFormDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoFormDialogComponentComponent]
    });
    fixture = TestBed.createComponent(ProductoFormDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
