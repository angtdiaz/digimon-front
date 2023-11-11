import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { DigimonDataService } from '../services/digimon-data.service';
import { Subject, takeUntil } from 'rxjs';
import { IDigimon } from 'src/app/shared/models/digimon.model';
import { MatDialog } from '@angular/material/dialog';
import { DigimonDialogComponent } from '../components/digimon-dialog/digimon-dialog.component';

@Component({
  selector: 'app-digimon-panel',
  templateUrl: './digimon-panel.component.html',
  styleUrls: ['./digimon-panel.component.scss'],
})
export class DigimonPanelComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  searchControl = new FormControl();
  digimons: IDigimon[] = [];
  currentPage: number = 0;
  isLoading: boolean = false;

  @ViewChild('stickyInput') stickyInput: ElementRef;
  inputSticky: boolean = false;

  constructor(
    public _authService: AuthService,
    private _router: Router,
    private _digimonDataService: DigimonDataService,
    private _dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  ngOnInit(): void {
    this.getAllDigimons('', 0);
    this.searchControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.getAllDigimons(value, 0);
      });
  }
  /**
   * Increases the current page number and fetches the next page of digimons.
   * Also logs a message to the console indicating that the user has scrolled.
   */
  onScroll() {
    this.currentPage++;
    this.getAllDigimons(this.searchControl.value ?? '', this.currentPage, true);
    console.log('scroll');
  }

  /**
   * Opens a dialog with the details of a given digimon.
   * @param digimon The digimon to display details for.
   */
  openDigimonDetails(digimon: IDigimon) {
    this._dialog.open(DigimonDialogComponent, {
      data: digimon,
      width: '700px',
    });
  }

  /**
   * Signs out the current user.
   * @returns A promise that resolves when the user is signed out.
   */
  public async signOut() {
    await this._authService.signOut();
    this._router.navigate(['auth']);
  }

  /**
   * Retrieves a list of Digimons from the DigimonDataService based on the provided name and page number.
   * @param name The name of the Digimon to search for.
   * @param page The page number of the results to retrieve.
   * @param add Whether to add the retrieved results to the existing list of Digimons or replace it.
   */
  private getAllDigimons(name: string, page: number, add: boolean = false) {
    this.isLoading = true;
    this._digimonDataService
      .getAll(name, page)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (add) {
          this.digimons = [...this.digimons, ...(res.results as IDigimon[])];
        } else {
          this.digimons = res.results as IDigimon[];
        }
        this.isLoading = false;
      });
  }
}
