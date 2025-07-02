import { Component, Input, ViewChild } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CustomControls } from "../../app.config";
import { baseEditComponent } from "../../shared/base-class/baseEditComponent";


@Component({
  selector: 'app-pdf-print',
  templateUrl: './process-pdf.component.html',
  styleUrls: ['./process-pdf.component.css'],
  standalone: true,
  imports: [...CustomControls, PdfViewerModule]
})
export class ProcessPdfComponent extends baseEditComponent {
  fileData: any;
  pdfFileStream: string;
  pdfFileName: string;
  excelFileStream: string;
  excelFileName: string;
  pdfSrc: string | undefined;
  pdfBlob: Blob | undefined;
  pdfResponse: HttpResponse<Blob> | undefined;

  zoomLevel = 1.0;
  isFitToWidth = false;

  get computedZoom(): number {
    return this.isFitToWidth ? 1 : this.zoomLevel;
  }


  constructor(private http: HttpClient) {
    super();
    this.showModel = false;
    this.buildForm();
  }

  buildForm() { }

  ngOnInit(): void {
    this.init();
    this.loadFileData();
    this.loadPdf(this.pdfFileStream);
  }

  loadFileData() {
    const state = history.state;
    if (state?.fileData && Array.isArray(state.fileData)) {
      this.fileData = state.fileData;
      const pdfData = this.fileData.find((f: any) => f.filetype?.toLowerCase() === 'pdf');
      const excelData = this.fileData.find((f: any) => f.filetype?.toLowerCase() === 'excel');

      this.pdfFileStream = pdfData?.filepath || '';
      this.pdfFileName = pdfData?.filename || 'file.pdf';

      this.excelFileStream = excelData?.filepath || '';
      this.excelFileName = excelData?.filename || 'file.xlsx';
    }
  }

  loadPdf(rec: string) {
    const param = { 'file_path': rec };
    this.http.post(this.gs.getUrl('/api/common/GetDownloadFileAsync'), param, {
      responseType: 'blob',
      observe: 'response'
    }).subscribe({
      next: (response: HttpResponse<Blob>) => {
        this.pdfBlob = response.body!;
        this.pdfSrc = URL.createObjectURL(this.pdfBlob);
        this.pdfResponse = response;
      },
      error: (e) => this.gs.showError(e)
    });
  }

  downloadPdf() {
    if (this.pdfResponse) {
      this.gs.downloadFile(this.pdfResponse, this.pdfFileName);
    } else {
      this.gs.showError("PDF not loaded yet.");
    }
  }

  downloadExcel() {
    this.gs.downloadProcess(this.excelFileStream, this.excelFileName);
  }

  printPdf() {
    if (!this.pdfBlob) {
      this.gs.showError("PDF not loaded yet.");
      return;
    }
    const blobUrl = URL.createObjectURL(this.pdfBlob);
    const printWindow = window.open(blobUrl, '_blank');
    if (!printWindow) {
      this.gs.showError('Unable to open print window');
      return;
    }
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      }, 500);
    };
  }


  zoomIn() {
    this.isFitToWidth = false;
    this.zoomLevel = Math.min(this.zoomLevel + 0.1, 3);
  }

  zoomOut() {
    this.isFitToWidth = false;
    this.zoomLevel = Math.max(this.zoomLevel - 0.1, 0.25);
  }

  resetZoom() {
    this.isFitToWidth = false;
    this.zoomLevel = 1.0;
  }

  toggleFitMode() {
    this.isFitToWidth = !this.isFitToWidth;

    if (!this.isFitToWidth) {
      this.resetZoom();
    }
  }

  disableRightClick(event: MouseEvent) {
    event.preventDefault();
  }

}
