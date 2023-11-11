import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api.response';
import { HttpService } from 'src/app/core/services/http.service';
import { IDigimon } from 'src/app/shared/models/digimon.model';

@Injectable({
  providedIn: 'root',
})
export class DigimonDataService {
  private baseUrl = 'digimons';

  constructor(private http: HttpService) {}

  /**
   * Retrieves a list of all Digimon.
   * @param name - The name of the Digimon to filter by.
   * @param page - The page number to retrieve.
   * @returns An Observable of ApiResponse<IDigimon[]>.
   */
  getAll(name = '', page = 0): Observable<ApiResponse<IDigimon[]>> {
    return this.http.get<ApiResponse<IDigimon[]>>(this.baseUrl, {
      params: { name, page },
    });
  }

  /**
   * Retrieves a Digimon by its ID.
   * @param id The ID of the Digimon to retrieve.
   * @returns An Observable that emits the Digimon data.
   */
  getById(id: number): Observable<ApiResponse<IDigimon>> {
    return this.http.get<IDigimon>(`${this.baseUrl}/${id}`);
  }
}
