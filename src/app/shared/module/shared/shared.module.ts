import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { ImagePipe } from '../../Pipes/image.pipe';
import { RemoveAfterAtSymbolPipe } from '../../Pipes/remove-after-at-symbol.pipe';

@NgModule({
  declarations: [HeaderComponent, ImagePipe, RemoveAfterAtSymbolPipe],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent, ImagePipe, RemoveAfterAtSymbolPipe]
})
export class SharedModule { }
